import { Button, CircularProgress, Switch, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';

import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { useAddActivityMutation } from 'src/slices/apis/app.api';
import { styled } from '@mui/material';
import { Iconify } from '../iconify';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { useActivityAtom } from 'src/store/jotai/activities';
import { ErrorCaption } from '../ErrorCaption';
import { cn } from 'src/utils';
import { Dayjs } from 'dayjs';

export const Activities = () => {
  const [isAddActivity, setIsAddActivity] = useState(false);

  const { formState, errorState, handleChange, validate } = useActivityAtom();
  const [addActivity, { isLoading: isAdding }] = useAddActivityMutation();

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const formattedDate = formState.selectedDate!?.toDate().toISOString().split('T')[0];

      const { error } = await addActivity({ ...formState, selectedDate: formattedDate });

      if (error) return toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Typography>Activities</Typography>

        <Drawer anchor={'right'} open={isAddActivity} onClose={() => setIsAddActivity(false)}>
          <form className="p-2" onSubmit={handleAddActivity}>
            <header className="flex justify-between items-center gap-2 border-b border-gray-300 pb-1 mb-2">
              <Typography>Add Activity</Typography>

              <IconButton
                aria-label="close"
                disabled={isAdding}
                onClick={() => setIsAddActivity(false)}
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
                  name="name"
                  label="Task Name"
                  error={!!errorState.name}
                  helperText={errorState.name}
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />

                <TextField
                  fullWidth
                  name="xp"
                  label="XP"
                  error={!!errorState.xp}
                  helperText={errorState.xp}
                  value={formState.xp}
                  onChange={(e) => handleChange('xp', e.target.value)}
                />
              </div>

              <TextField
                fullWidth
                name="description"
                label="Task Description (Optional)"
                multiline
                rows={10}
                error={!!errorState.description}
                helperText={errorState.description}
                value={formState.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />

              <TextField
                fullWidth
                name="videoLink"
                label="Video Link (Optional)"
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
                  checked={formState.recurring}
                  onChange={(e) => handleChange('recurring', e.target.checked)}
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
                disabled={isAdding}
                onClick={() => setIsAddActivity(false)}
              >
                Cancel
              </Button>

              <Button
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
                disabled={isAdding}
              >
                {isAdding ? (
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

        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
          onClick={() => setIsAddActivity(true)}
          endIcon={<Iconify icon="mingcute:add-line" />}
        >
          Add Activity
        </Button>
      </div>
      <img src="/assets/images/target_xp.png" alt="target_xp" className="w-full h-30" />

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
        onClick={() => setIsAddActivity(true)}
        endIcon={<Iconify icon="mingcute:add-line" />}
      >
        Add Activity
      </Button>
    </>
  );
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#177ddc',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));

interface DayOption {
  label: string;
  value: string;
}

const daysOfWeek: DayOption[] = [
  { label: 'S', value: 'Sunday' },
  { label: 'M', value: 'Monday' },
  { label: 'T', value: 'Tuesday' },
  { label: 'W', value: 'Wednesday' },
  { label: 'T', value: 'Thursday' },
  { label: 'F', value: 'Friday' },
  { label: 'S', value: 'Saturday' },
];

function RecurringDateSelector() {
  const { formState, errorState, handleChange } = useActivityAtom();

  // Function to disable past dates
  const disablePastDates = (date: Dayjs) => {
    return date.isBefore(new Date(), 'day');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="!hidden md:!flex"
        label="Select Start Date"
        value={formState.selectedDate}
        onChange={(newValue) => handleChange('selectedDate', newValue)}
        shouldDisableDate={disablePastDates}
        slotProps={{
          textField: {
            error: !!errorState.selectedDate,
            helperText: errorState.selectedDate,
          },
        }}
      />

      <MobileDatePicker
        className={cn('md:!hidden !flex')}
        label="Select Start Date"
        value={formState.selectedDate}
        onChange={(newValue) => handleChange('selectedDate', newValue)}
        shouldDisableDate={disablePastDates}
        slotProps={{
          textField: {
            error: !!errorState.selectedDate,
            helperText: errorState.selectedDate,
          },
        }}
      />

      {formState.recurring && (
        <>
          <ToggleButtonGroup
            value={formState.selectedDays}
            onChange={(_event: React.MouseEvent<HTMLElement>, newDays: string[]) =>
              handleChange('selectedDays', newDays)
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

          <ErrorCaption caption={errorState.selectedDays} />
        </>
      )}
    </LocalizationProvider>
  );
}
