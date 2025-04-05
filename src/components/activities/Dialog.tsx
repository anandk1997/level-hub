import { Button, CircularProgress, TextField } from '@mui/material';
import { Typography } from '@mui/material';

import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DatePicker,
  MobileDatePicker,
  DatePickerProps,
} from '@mui/x-date-pickers';
import { useActivityAtom } from 'src/store/jotai/activities';
import { ErrorCaption } from '../ErrorCaption';
import { cn } from 'src/utils';
import { Dayjs } from 'dayjs';
import { AntSwitch } from './Switch';

export const ActivityDialog = ({
  open,
  isLoading,
  onClose,
  onSubmit,
  dialogTitle,
}: {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<string | undefined>;
  dialogTitle: string;
}) => {
  const { formState, errorState, handleChange } = useActivityAtom();

  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <form noValidate className="p-2" onSubmit={onSubmit}>
        <header className="flex justify-between items-center gap-2 border-b border-gray-300 pb-1 mb-2">
          <Typography>{dialogTitle}</Typography>

          <IconButton
            aria-label="close"
            disabled={isLoading}
            onClick={onClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
              borderRadius: 10,
              border: '1px solid',
              padding: 0,
            })}
          >
            <CloseIcon />
          </IconButton>
        </header>

        <section className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row gap-2">
            <TextField
              fullWidth
              required
              name="name"
              label="Task Name"
              error={!!errorState.title}
              helperText={errorState.title}
              value={formState.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />

            <TextField
              fullWidth
              required
              type="number"
              name="xp"
              label="XP"
              error={!!errorState.xp}
              helperText={errorState.xp}
              value={formState.xp}
              onChange={(e) => handleChange('xp', Number(e.target.value))}
            />
          </div>

          <TextField
            fullWidth
            name="description"
            label="Task Description (Optional)"
            placeholder="Task Description (Optional)"
            multiline
            rows={5}
            error={!!errorState.description}
            helperText={errorState.description}
            value={formState.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <TextField
            fullWidth
            name="videoLink"
            label="Video Link (Optional)"
            placeholder="Video Link (Optional)"
            error={!!errorState.videoLink}
            helperText={errorState.videoLink}
            value={formState.videoLink}
            onChange={(e) => handleChange('videoLink', e.target.value)}
          />

          <div className="flex justify-between items-end gap-2">
            <div className="flex flex-col">
              <div className="font-bold">Recurring</div>

              <div className="text-gray-400 text-sm">
                Disabled will allow this state to one time
              </div>
            </div>

            <AntSwitch
              slotProps={{ input: { 'aria-label': 'ant design' } }}
              checked={formState.isRecurring}
              onChange={(e) => handleChange('isRecurring', e.target.checked)}
            />
          </div>

          <RecurringDateSelector />
        </section>

        <DialogActions className="flex justify-center mt-2">
          <Button
            size="large"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[white] !border !border-black !text-black hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress
                className="!text-white group-hover:!text-[#09C0F0]"
                sx={{ scale: '.5' }}
              />
            ) : (
              'Save'
            )}
          </Button>
        </DialogActions>
      </form>
    </Drawer>
  );
};

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

function RecurringDateSelector() {
  const { formState, errorState, handleChange } = useActivityAtom();

  // Function to disable past dates
  const disablePastDates = (date: Dayjs) => {
    return date.isBefore(new Date(), 'day');
  };

  const startDateProps: Partial<DatePickerProps<any>> = {
    label: !formState.isRecurring ? 'Select Date' : 'Select Start Date',
    value: formState.startDate,
    onChange: (newValue: Dayjs) => handleChange('startDate', newValue),
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
    onChange: (newValue: Dayjs) => handleChange('endDate', newValue),
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
      <>
        <DatePicker {...startDateProps} className="!hidden md:!flex" />
        <MobileDatePicker {...startDateProps} className="md:!hidden !flex" />
      </>

      {formState.isRecurring && (
        <>
          <>
            <DatePicker {...endDateProps} className="!hidden md:!flex" />
            <MobileDatePicker {...endDateProps} className={cn('md:!hidden !flex')} />
          </>

          <ToggleButtonGroup
            value={formState.assignedDays}
            onChange={(_event: React.MouseEvent<HTMLElement>, newDays: string[]) =>
              handleChange('assignedDays', newDays)
            }
            aria-label="Select Recurring Days"
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
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

          <ErrorCaption caption={errorState.assignedDays} />
        </>
      )}
    </LocalizationProvider>
  );
}
