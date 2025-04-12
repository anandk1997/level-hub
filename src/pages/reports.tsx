import { Card, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from 'src/utils';
import { route } from 'src/utils/constants/routes';
// import MonthPicker  from '@mui/x-date-pickers';

const Reports = () => {
  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <>
      <div className="flex justify-between gap-1 mb-2">
        <Typography className="!flex !flex-col">
          <span className="!font-bold text-xl">Reports</span>

          <span className="text-gray-500 text-sm">
            This month you completed 200 Activities and 800XP
          </span>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            label="Select Month and Year"
            minDate={dayjs('2000-01-01')}
            maxDate={dayjs('2050-12-31')}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slots={{
              textField: (params) => <TextField {...params} helperText={null} />,
            }}
          />
        </LocalizationProvider>{' '}
      </div>

      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
      <Card className="my-1 p-2 flex gap-1 justify-between items-center">
        <span>30 March 2025</span>
        <span>4 Activities</span>
        <span>500XP</span>

        <Link
          to={route.reports}
          className={cn(
            'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 disabled:!text-white disabled:cursor-none !max-w-fit',
            '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]',
            {
              // '!bg-[#FF991F] hover:!border-[#FF991F] hover:!text-[#FF991F] !text-black':
              //   activity.isRecurring,
            }
          )}
        >
          View
        </Link>
      </Card>
    </>
  );
};

export default Reports;
