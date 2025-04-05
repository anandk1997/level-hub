import { Button } from '@mui/material';
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

export const Activities = () => {
  const [isActivity, setIsActivity] = useState(false);

  const { formState, setFormState, validate } = useActivityAtom();
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
    if (!isActivity) setFormState(initialFormState);
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
      <img src="/assets/images/target_xp.png" alt="target_xp" className="w-full h-30" />

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
