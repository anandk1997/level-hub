import { useState, MouseEvent } from 'react';
import { Popover, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateRangePicker as ReactDateRange, RangeKeyDict } from 'react-date-range';
import { CalendarMonth, Cancel } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs'; //

import { useActivityAtom } from 'src/store/jotai/activities';
import { CircularProgress } from '@mui/material';

export function CustomRangePicker() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);

  const handleClose = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();

    setStartDate(null);
    setEndDate(null);

    handleFilters('startDate', '');
    handleFilters('endDate', '');

    setAnchorEl(null);
  };

  const { filters, handleFilters } = useActivityAtom();

  const handleSelect = (ranges: RangeKeyDict) => {
    const selectedRange = ranges.selection;
    if (selectedRange.startDate && selectedRange.endDate) {
      const dayJsStart = dayjs(selectedRange.startDate);
      const dayJsEnd = dayjs(selectedRange.endDate);

      // 🛠 Only update if start is BEFORE or SAME AS end
      if (dayJsStart.isBefore(dayJsEnd) || dayJsStart.isSame(dayJsEnd, 'day')) {
        setStartDate(dayJsStart);
        setEndDate(dayJsEnd);
      }
    }
  };

  return (
    <>
      <Button
        component="div"
        variant="outlined"
        className="!text-gray-600 border !border-gray-600 flex gap-1 !cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen(e);
        }}
      >
        {!isMobile && `${filters.startDate || 'YYYY/MM/DD'} – ${filters.endDate || 'YYYY/MM/DD'}`}
        <CalendarMonth />{' '}
        {filters.startDate && filters.endDate && (
          <button className="cursor-pointer" onClick={handleClose}>
            <Cancel />
          </button>
        )}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <ReactDateRange
          months={2}
          direction={isMobile ? 'vertical' : 'horizontal'}
          staticRanges={[]}
          inputRanges={[]}
          ranges={[
            {
              startDate: startDate ? startDate.toDate() : new Date(),
              endDate: endDate ? endDate.toDate() : new Date(),
              key: 'selection',
            },
          ]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          editableDateInputs={true}
          retainEndDateOnFirstSelection={true}
        />

        <div className="flex justify-center gap-1  p-1">
          <Button
            size="large"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[white] !border !border-black !text-black hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
            onClick={() => {
              handleFilters('startDate', startDate?.format('YYYY-MM-DD')!);
              handleFilters('endDate', endDate?.format('YYYY-MM-DD')!);
            }}
          >
            {false ? (
              <CircularProgress
                className="!text-white group-hover:!text-[#09C0F0]"
                sx={{ scale: '.5' }}
              />
            ) : (
              'Find Activities'
            )}
          </Button>
        </div>
      </Popover>
    </>
  );
}
