import {
  Button,
  CircularProgress,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

import { useActivityAtom } from 'src/store/jotai/activities';
import { AntSwitch } from '../_components/Switch';

import ReactPlayer from 'react-player';

import { FormControl, OutlinedInput } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { VideoPreviewDialog } from '../../VideoPreview';
import { ErrorCaption } from 'src/components/ErrorCaption';
import { RecurringDateSelector } from './RecurringDateSelector';
import { ILevel } from '..';

export const ActivityDialog = ({
  open,
  isLoading,
  onClose,
  onSubmit,
  dialogTitle,
  level,
  setIsTemplate,
}: IActivityDialog) => {
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

  useEffect(() => {
    const remainingXp = level.levelXP - level.currentXP;

    if (formState.xp > remainingXp) {
      setErrorState((prev) => ({ ...prev, xp: 'XP can not be greater than remaining XP' }));
    }
  }, [formState.xp]);

  return (
    <Drawer
      anchor={'right'}
      slotProps={{
        paper: {
          className: 'w-[100%] md:w-[50%]',
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
          <Typography variant="h4">{dialogTitle}</Typography>

          <div className="flex items-center">
            <Button
              size="large"
              color="inherit"
              variant="contained"
              className="!h-2 !bg-[white] !border !border-[#09C0F0] !text-[#09C0F0] !text-sm !mr-5"
              disabled={isLoading}
              onClick={setIsTemplate}
            >
              Load Activity Template
            </Button>

            <IconButton
              aria-label="close"
              disabled={isLoading}
              onClick={onClose}
              sx={(theme) => ({
                position: 'absolute',
                right: 13,
                top: 25,
                color: theme.palette.grey[500],
                borderRadius: 10,
                border: '1px solid',
                padding: 0,
              })}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </header>

        <section className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row gap-2">
            <TextField
              fullWidth
              required
              name="name"
              label="Activity Name"
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
              slotProps={{ htmlInput: { min: 0, step: 1 } }}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) handleChange('xp', Number(value));
              }}
            />
          </div>

          <TextField
            fullWidth
            name="description"
            label="Activity Description (Optional)"
            placeholder="Activity Description (Optional)"
            multiline
            rows={5}
            error={!!errorState.description}
            helperText={errorState.description}
            value={formState.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <FormControl fullWidth variant="outlined">
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

        <DialogActions className="!flex !justify-center mt-2">
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

interface IActivityDialog {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<string | undefined>;
  dialogTitle: string;
  level: ILevel;
  setIsTemplate: () => void;
}
