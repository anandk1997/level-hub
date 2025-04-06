import { Avatar, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { useAddActivityMutation, useFetchActivitiesQuery } from 'src/slices/apis/app.api';
import { Iconify } from '../iconify';

import { initialFormState, useActivityAtom } from 'src/store/jotai/activities';
import dayjs from 'dayjs';
import { LineProgress } from '../lineProgress';
import { ActivitiesList, IActivity } from './ActivitiesList';
import { ActivityDialog } from './Dialog';
import { BorderLinearProgress, SmallAvatar } from './Styled';
import { useAppSelector } from 'src/store/redux';
import { Badge } from '@mui/material';
import { cn } from 'src/utils';

export const Activities = () => {
  const [isActivity, setIsActivity] = useState(false);

  const { formState, setFormState, setErrorState, validate } = useActivityAtom();
  const { fullName } = useAppSelector((state) => state.auth);

  const [addActivity, { isLoading: isAdding }] = useAddActivityMutation();
  const [updateActivity, { isLoading: isUpdating }] = useAddActivityMutation();
  const { data, isFetching } = useFetchActivitiesQuery({});

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (validate()) {
        const formatStartDate = formState.startDate!?.toDate().toISOString().split('T')[0];
        const formatEndDate = formState.endDate!?.toDate().toISOString().split('T')[0];

        const filteredFormState: any = Object.fromEntries(
          Object.entries({
            ...formState,
            startDate: formatStartDate,
            endDate: formatEndDate,
          }).filter(([_, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            return value !== undefined && value !== null && value !== '';
          })
        );

        if (formState.activityId) {
          const { data, error } = await updateActivity(filteredFormState);

          if (error) return toast.error(getErrorMessage(error));

          toast.success(data.message);
          setIsActivity(false);
        } else {
          const { data, error } = await addActivity(filteredFormState);

          if (error) return toast.error(getErrorMessage(error));

          toast.success(data.message);
          setIsActivity(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isActivity) {
      setFormState(initialFormState);
      setErrorState({});
    }
  }, [isActivity]);

  const handleClickDialog = (activity: IActivity) => {
    setFormState({
      activityId: activity?.id?.toString(),
      startDate: dayjs(activity?.startDate),
      endDate: dayjs(activity?.endDate),
      isSelfAssignment: false,
      assignedDays: activity?.assignedDays,
      description: activity?.description,
      isRecurring: activity?.isRecurring,
      title: activity?.title,
      videoLink: activity?.videoLink,
      xp: activity?.xp,
    });

    setIsActivity(true);
  };

  if (isFetching) return <LineProgress />;
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Typography>Activities</Typography>

        <ActivityDialog
          open={isActivity}
          isLoading={isAdding || isUpdating}
          onClose={() => setIsActivity(false)}
          onSubmit={handleAddActivity}
          dialogTitle={formState.activityId ? 'Update Activity' : 'Add Activity'}
        />

        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
          onClick={() => setIsActivity(true)}
          endIcon={<Iconify icon="mingcute:add-line" />}
        >
          Add Activity
        </Button>
      </div>

      <div className="bg-[#4884b6] rounded-2xl p-1.5 sm:p-3 flex flex-col sm:flex-row items-center gap-3">
        <div className="">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <SmallAvatar src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
            }
          >
            <Avatar
              src={'/assets/images/target_xp.png'}
              // onError={() => setImageError(true)}
              className={cn(
                '!bg-[#FF991F] !border-4 !text-5xl font-bold !border-white !h-14 !w-12 md:!h-20 md:!w-18',
                { '!p-3': !false }
              )}
            >
              {fullName
                ?.split(' ')
                ?.map((w) => w?.[0]?.toUpperCase())
                ?.join('')}
            </Avatar>
          </Badge>

          {/* <div className="bg-[#FF991F] border-4 border-white h-22 w-18 rounded-[60%/60%] flex justify-center items-center text-white text-5xl font-bold">
            {fullName
              .split(' ')
              .map((w) => w[0].toUpperCase())
              .join('')}
          </div> */}
        </div>

        <div className="w-[70%] sm:w-[55%] flex flex-col gap-1.5 text-white">
          <Typography className="flex !text-xl !ms-1">Target Level XP</Typography>
          <Typography className="flex !text-5xl !font-extrabold !ms-1" component={'h1'}>
            1000
          </Typography>
          <BorderLinearProgress variant="determinate" value={50} />
          <Typography className="flex !ms-1">400XP to go</Typography>
        </div>
      </div>

      {!!!data?.resultData?.rows?.length ? (
        <>
          <Typography className="text-center !my-3">
            There is currently nothing to display. Please add some activities, and we will show the
            experience points (XP) accordingly.
          </Typography>

          <Button
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] !flex !m-auto"
            onClick={() => setIsActivity(true)}
            endIcon={<Iconify icon="mingcute:add-line" />}
          >
            Add Activity
          </Button>
        </>
      ) : (
        <>
          <ActivitiesList activities={data?.resultData?.rows} onUpdate={handleClickDialog} />
        </>
      )}
    </>
  );
};
