import { Button } from '@mui/material';
import { Typography } from '@mui/material';

import { cn } from 'src/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IncompleteCircleIcon from '@mui/icons-material/IncompleteCircle';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { IconButton } from '@mui/material';
import { Checkbox } from '@mui/material';
import { useApproveActivityMutation } from 'src/slices/apis/app.api';
import { ChangeEvent, Dispatch, SetStateAction, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';

import { PlayCircle } from '@mui/icons-material';
import { ConfirmationDialog } from '../../ConfirmationDialog';
import { useRouter } from 'src/routes/hooks';
import { route } from 'src/utils/constants/routes';

import { Iconify } from '../../iconify';
import { Filters } from './Filters';
import { VideoPreviewDialog } from '../../VideoPreview';
import { Pagination } from 'src/components/Pagination';

export function ActivitiesList({
  activities,
  onUpdate,
  totalPages,
  currentPage,
  onPageChange,
  setIsActivity,
}: {
  activities: IActivity[];
  onUpdate: (activity: IActivity) => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
  setIsActivity: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [ids, setIds] = useState<number[]>([]);
  const [video, setVideo] = useState('');

  const [isVideo, setIsVideo] = useReducer((open) => !open, false);
  const [isApprove, setIsApprove] = useReducer((open) => !open, false);

  const [approve, { isLoading }] = useApproveActivityMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    e.stopPropagation();
    setIds((ids) => (ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]));
  };

  const handleApprove = async () => {
    const { data, error } = await approve({ activityIds: ids, remarks: 'jhg' });

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data?.message);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <div className="flex justify-between items-center flex-wrap mt-2 px-2">
        <Typography className="!font-bold">Activities List</Typography>

        <Filters ids={ids} setIsApprove={setIsApprove} />
      </div>

      {!!!activities?.length && (
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
      )}

      <ConfirmationDialog
        title="Are you sure you want to complete this activity"
        message="Your action notify the coach or parent once you complete this activity"
        onOpen={isApprove}
        onClose={setIsApprove}
        isLoading={isLoading}
        onSubmit={handleApprove}
      />

      <VideoPreviewDialog open={isVideo} setOpen={setIsVideo} link={video} />

      {activities?.map((activity) => (
        <Card key={activity.id} sx={{ marginY: 2, width: '100%' }}>
          <CardActionArea
            sx={{
              cursor: 'default',
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
            onClick={() => {
              router.push(`${route.activities}/${activity.id}`);
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflow: 'hidden',
              }}
            >
              {/* Content Row */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  flexWrap: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    flex: 1,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Checkbox
                    disableRipple
                    checked={ids.includes(activity.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onChange(e, activity.id)}
                    disabled={activity?.completed}
                  />

                  {activity.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    flex: 2,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {activity.description}
                </Typography>

                {/* XP */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flex: 1, whiteSpace: 'nowrap' }}
                >
                  {activity.xp} XP
                </Typography>

                {/* Action Button */}

                <IconButton
                  className={cn(
                    'group !border !border-transparent !text-white hover:!bg-white !flex !rounded-full',
                    '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
                    {
                      '!cursor-default !bg-gray-400': activity?.completed,
                    }
                  )}
                  component="div"
                  disabled={activity?.completed}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activity?.completed) return;
                    onUpdate(activity);
                  }}
                >
                  <EditSquareIcon className="!text-sm" />
                </IconButton>

                <Button
                  component="div"
                  variant="contained"
                  className={cn(
                    'group h-5 !border !border-transparent hover:!bg-white md:!w-20 !flex !rounded-full disabled:!text-white disabled:cursor-none',
                    '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0] flex gap-1 justify-center items-center',
                    {
                      '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
                        !activity?.completed,

                      '!cursor-default': activity?.completed,
                    }
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activity?.completed) return;

                    setIds([activity.id]);
                    setIsApprove();
                  }}
                >
                  {activity?.completed ? <CheckCircleIcon /> : <IncompleteCircleIcon />}
                  <span className="hidden sm:block">
                    {activity?.completed ? 'Completed' : 'Pending'}
                  </span>
                </Button>

                <IconButton
                  component="div"
                  disabled={!activity.videoLink}
                  className={cn('cursor-pointer disabled:cursor-default text-gray-300', {
                    '!text-[#09C0F0]': activity.videoLink,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVideo();
                    setVideo(activity.videoLink);
                  }}
                >
                  <PlayCircle sx={{ fontSize: 35 }} />
                </IconButton>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
    </Box>
  );
}

export interface IActivity {
  id: number;
  title: string;
  description: string;
  videoLink: string;
  xp: number;
  isRecurring: boolean;
  assignedDays: string[];
  startDate: string;
  endDate: string;
  assigneeId: number;
  assignedById: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  completed: boolean;

  activityHistory: {
    id: number;
    approvalDate: string;
    assigneeId: number;
    approvedByName: string;
    approvedById: number;
  }[];
}
