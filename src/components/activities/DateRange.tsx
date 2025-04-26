import { useState, MouseEvent } from 'react';
import { Popover, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateRangePicker as ReactDateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { CalendarMonth } from '@mui/icons-material';

export function CustomRangePicker() {
  const theme = useTheme();
  // Consider "sm" (600px) and below as mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [range, setRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (ranges: RangeKeyDict) => {
    setRange(ranges.selection);
  };

  return (
    <>
      <Button
        variant="outlined"
        className="!text-gray-600 border !border-gray-600 flex gap-1"
        onClick={handleOpen}
      >
        {`${range.startDate!.toLocaleDateString()} – ${range.endDate!.toLocaleDateString()}`}
        <CalendarMonth />
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <ReactDateRange
          months={2}
          // switch direction responsively
          direction={isMobile ? 'vertical' : 'horizontal'}
          staticRanges={[]}
          inputRanges={[]}
          ranges={[range]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          editableDateInputs={true}
          retainEndDateOnFirstSelection={true}
        />
      </Popover>
    </>
  );
}
