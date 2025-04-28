import { Button, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';

import toast from 'react-hot-toast';
import { useFetchActivitiesQuery, useUpsertActivityMutation } from 'src/slices/apis/app.api';
import { getErrorMessage } from 'src/slices/apis/types';
import { Iconify } from '../iconify';

import dayjs from 'dayjs';
import { initialFormState, useActivityAtom } from 'src/store/jotai/activities';
import { filterValues } from 'src/utils';
import { LineProgress } from '../lineProgress';
import { ActivitiesList, IActivity } from './_components/ActivitiesList';
import { ActivityDialog } from './_dialogs/ActivityDialog';
import { XpProgress } from './_components/XpProgress';
import { TemplatesDialog } from './_dialogs/Templates';

export const Activities = ({ level }: IActivities) => {
  const [isActivity, setIsActivity] = useState(false);
  const [isTemplate, setIsTemplate] = useReducer((prev) => !prev, false);

  const { formState, setFormState, setErrorState, validate, filters, handleFilters } =
    useActivityAtom();

  const [upsertActivity, { isLoading: isUpserting }] = useUpsertActivityMutation();

  const { data, isFetching } = useFetchActivitiesQuery({
    page: filters.page,
    pageSize: filters.pageSize,
    status: filters.status,
    ...(filters.startDate && filters.endDate
      ? { startDate: filters.startDate, endDate: filters.endDate }
      : {}),
  });

  const totalCount = data?.resultData?.count || 0;
  const totalPages = Math.ceil(totalCount / filters.pageSize);

  const handleUpsertActivity = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!validate()) return;

      const formatStartDate = formState.startDate!?.toDate().toISOString().split('T')[0];
      const formatEndDate = formState.endDate!?.toDate().toISOString().split('T')[0];

      const payload = {
        ...formState,
        startDate: formatStartDate,
        endDate: formatEndDate,
      };

      const filteredFormState: any = filterValues(payload);

      const { data, error } = await upsertActivity(filteredFormState);

      if (error) return toast.error(getErrorMessage(error));

      toast.success(data.message);
      setIsActivity(false);
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
          level={level}
          open={isActivity}
          isLoading={isUpserting}
          onClose={() => setIsActivity(false)}
          onSubmit={handleUpsertActivity}
          dialogTitle={formState.activityId ? 'Update Activity' : 'Add Activity'}
          setIsTemplate={setIsTemplate}
        />

        <TemplatesDialog open={isTemplate} onClose={setIsTemplate} />

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

      <XpProgress level={level} />

      <ActivitiesList
        activities={data?.resultData?.activities}
        onUpdate={handleClickDialog}
        currentPage={filters.page}
        onPageChange={(_e, value) => handleFilters('page', value)}
        totalPages={totalPages}
        setIsActivity={setIsActivity}
      />
    </>
  );
};

export interface ILevel {
  id: number;
  levelXP: number;
  currentXP: number;
}

interface IActivities {
  level: ILevel;
}
