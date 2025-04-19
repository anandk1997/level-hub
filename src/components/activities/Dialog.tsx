import { Button, CircularProgress, InputAdornment, InputLabel, TextField } from '@mui/material';
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

import ReactPlayer from 'react-player';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useEffect, useReducer, useState } from 'react';
import { OutlinedInput } from '@mui/material';
import { FormControl } from '@mui/material';

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
  const { formState, errorState, setErrorState, handleChange } = useActivityAtom();

  const [isPlayable, setIsPlayable] = useState<boolean | null>(null);

  useEffect(() => {
    if (!ReactPlayer.canPlay(formState.videoLink) && formState.videoLink) {
      setIsPlayable(false);
      setErrorState((prev) => ({ ...prev, videoLink: 'Please provide a valid video link' }));
    } else {
      setIsPlayable(null);
    }
  }, [formState.videoLink]);

  const [isVideo, setIsVideo] = useReducer((open) => !open, false);

  return (
    <Drawer
      anchor={'right'}
      slotProps={{
        paper: {
          className: 'w-[70%] md:w-[50%]',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <ReactPlayer
        url={formState.videoLink}
        onReady={() => setIsPlayable(true)}
        onError={() => setIsPlayable(false)}
        className="hidden"
      />

      <VideoPreviewDialog open={isVideo} setOpen={setIsVideo} link={formState.videoLink} />

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
              value={formState.title || ''}
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
              value={formState.xp || ''}
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
            value={formState.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <FormControl fullWidth required variant="outlined">
            <InputLabel>Video Link (Optional)</InputLabel>

            <OutlinedInput
              fullWidth
              name="videoLink"
              label="Video Link (Optional)"
              placeholder="Video Link (Optional)"
              error={!!errorState.videoLink}
              value={formState.videoLink || ''}
              onChange={(e) => handleChange('videoLink', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <button
                    className="bg-[#FF991F] text-black rounded-full cursor-pointer disabled:cursor-default disabled:bg-gray-300 disabled:border-none disabled:hover:bg-gray-300 disabled:hover:text-black border border-[#FF991F] px-2 hover:bg-white hover:text-[#FF991F]"
                    type="button"
                    disabled={!formState.videoLink || !isPlayable}
                    onClick={setIsVideo}
                  >
                    Preview
                  </button>
                </InputAdornment>
              }
            />

            <ErrorCaption caption={errorState.videoLink} />
          </FormControl>

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

export function RecurringDateSelector() {
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

          <div className="text-center -mt-2">
            <ErrorCaption caption={errorState.assignedDays} />
          </div>
        </>
      )}
    </LocalizationProvider>
  );
}

export function VideoPreviewDialog({
  open,
  setOpen,
  link,
}: {
  link: string;
  open: boolean;
  setOpen: () => void;
}) {
  const [loading, setLoading] = useState(true);

  const handleReady = () => setLoading(false);

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={setOpen}>
      <DialogTitle>Optional sizes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>

        {loading && (
          <div className="flex justify-center items-center h-[360px] m-auto">
            <CircularProgress
              className="!text-[#09C0F0] group-hover:!text-[#09C0F0]"
              sx={{ scale: '1.5' }}
            />
          </div>
        )}

        <div
          className={cn({
            'h-0 opacity-0': loading,
          })}
        >
          <ReactPlayer
            url={link}
            playing={false}
            controls={true}
            width="100%"
            // height="360px"
            onReady={handleReady}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export function ApproveDialog({
  isOpen,
  setOpen,
  isLoading,
  onSubmit,
}: {
  isOpen: boolean;
  isLoading: boolean;
  setOpen: () => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog fullWidth maxWidth={'sm'} open={isOpen} onClose={setOpen}>
      <DialogTitle className="text-center">
        Are you sure you want to complete this activity
      </DialogTitle>

      <DialogContent>
        <DialogContentText className="text-center">
          Your action notify the coach or parent once you complete this activity
        </DialogContentText>
      </DialogContent>

      <DialogActions className="!flex !justify-center !pb-3">
        <Button
          size="large"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[white] !border !border-black !text-black hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
          disabled={isLoading}
          onClick={setOpen}
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
          onClick={onSubmit}
        >
          {isLoading ? (
            <CircularProgress
              className="!text-white group-hover:!text-[#09C0F0]"
              sx={{ scale: '.5' }}
            />
          ) : (
            'Yes'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
