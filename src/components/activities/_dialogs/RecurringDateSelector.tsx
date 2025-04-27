import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { ErrorCaption } from 'src/components/ErrorCaption';
import { useActivityAtom } from 'src/store/jotai/activities';
import { cn } from 'src/utils';

export function RecurringDateSelector() {
  const { formState, errorState, handleChange } = useActivityAtom();

  // Function to disable past dates
  const disablePastDates = (date: Dayjs) => {
    return date.isBefore(new Date(), 'day');
  };

  const startDateProps: Partial<DatePickerProps<any>> = {
    label: !formState.isRecurring ? 'Select Date' : 'Select Start Date',
    value: formState.startDate,
    onChange: (newValue) => handleChange('startDate', newValue),
    shouldDisableDate: disablePastDates,
    slotProps: {
      textField: {
        required: true,
        error: !!errorState.startDate,
        helperText: errorState.startDate,
      },
    },
  };

  const endDateProps: Partial<DatePickerProps<any>> = {
    label: 'Select End Date',
    value: formState.endDate,
    onChange: (newValue) => handleChange('endDate', newValue),
    shouldDisableDate: disablePastDates,
    slotProps: {
      textField: {
        required: true,
        error: !!errorState.endDate,
        helperText: errorState.endDate,
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col md:flex-row gap-2">
        <>
          <DatePicker {...startDateProps} className="!hidden md:!flex flex-1" />
          <MobileDatePicker {...startDateProps} className="md:!hidden !flex flex-1" />
        </>

        {formState.isRecurring && (
          <>
            <DatePicker {...endDateProps} className="!hidden md:!flex flex-1" />
            <MobileDatePicker {...endDateProps} className={cn('md:!hidden !flex flex-1')} />
          </>
        )}
      </div>

      {formState.isRecurring && (
        <>
          <ToggleButtonGroup
            value={formState.assignedDays || []}
            onChange={(_event: React.MouseEvent<HTMLElement>, newDays: string[]) =>
              handleChange('assignedDays', newDays)
            }
            aria-label="Select Recurring Days"
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center' }}
            exclusive={false}
          >
            {daysOfWeek.map((day, index) => (
              <ToggleButton
                key={index}
                value={day.value}
                sx={{
                  borderRadius: '50% !important',
                  width: 40,
                  height: 40,
                  margin: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  border: '1px solid #FF991F !important',
                  color: 'black',
                  '&.Mui-selected': {
                    backgroundColor: '#FF991F',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#FF991F',
                    },
                  },
                }}
              >
                {day.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <div className="text-center -mt-2">
            <ErrorCaption caption={errorState.assignedDays} />
          </div>
        </>
      )}
    </LocalizationProvider>
  );
}

interface DayOption {
  label: string;
  value: string;
}

const daysOfWeek: DayOption[] = [
  { label: 'S', value: 'sunday' },
  { label: 'M', value: 'monday' },
  { label: 'T', value: 'tuesday' },
  { label: 'W', value: 'wednesday' },
  { label: 'T', value: 'thursday' },
  { label: 'F', value: 'friday' },
  { label: 'S', value: 'saturday' },
];
