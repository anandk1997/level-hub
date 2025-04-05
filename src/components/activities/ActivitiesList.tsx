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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';

export function ActivitiesList({
  activities,
  onUpdate,
}: {
  activities: IActivity[];
  onUpdate: (activity: IActivity) => void;
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <div className="flex justify-between items-center mt-2 px-2">
        <Typography className="!font-bold">Activities List</Typography>

        <Button
          className="!bg-white !text-black !rounded-none !border !border-gray-200 !font-light"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>

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
                    'group !border !border-transparent !text-white hover:!bg-white !flex !rounded-full disabled:!text-white disabled:cursor-none',
                    '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
                    {
                      '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
                        activity.isRecurring,
                    }
                  )}
                  component="div"
                  onClick={() => onUpdate(activity)}
                >
                  <EditSquareIcon
                    className="!text-sm"
                    // className="cursor-pointer hover:!text-[#09C0F0] text-black"
                  />
                </IconButton>

                <Button
                  component="div"
                  variant="contained"
                  className={cn(
                    'group h-5 !border !border-transparent hover:!bg-white !flex !rounded-full disabled:!text-white disabled:cursor-none !max-w-fit',
                    '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
                    {
                      '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
                        activity.isRecurring,
                    }
                  )}
                  startIcon={!activity.isRecurring ? <CheckCircleIcon /> : <IncompleteCircleIcon />}
                  sx={{ flex: 1, whiteSpace: 'nowrap' }}
                >
                  {!activity.isRecurring ? 'Completed' : 'Pending'}
                </Button>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
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
}
