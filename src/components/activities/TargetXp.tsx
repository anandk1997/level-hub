import { Button, CircularProgress, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useLevelMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { Box } from '@mui/material';

export const TargetXP = () => {
  const [open, setOpen] = useState(false);
  const [levelXP, setLevelXP] = useState(0);
  const [error, setError] = useState('');

  const [level, { isLoading }] = useLevelMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleXp = async () => {
    if (!levelXP) return setError('LevelXP is required');

    const { error, data } = await level({
      levelXP,
    });

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data.message);
    setLevelXP(0);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        py: 5,
        px: 3,
        width: 1,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        margin: 'auto',
        height: '80vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Set Your Target XP
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
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
        <DialogContent dividers className="flex flex-col justify-center items-center gap-2">
          <div className="flex items-end gap-2">
            <span className="">-</span>
            <label htmlFor="" className="flex flex-col text-center">
              Target Level XP
              <TextField
                fullWidth
                name="xp"
                placeholder="XP"
                type="number"
                className="!max-w-50 !min-w-10 !w-[100%]"
                value={levelXP}
                error={!!error}
                helperText={error}
                onChange={(e) => setLevelXP(Number(e.target.value))}
                slotProps={{
                  htmlInput: {
                    className: 'text-center',
                  },
                }}
              />
            </label>
            <span className="">+</span>
          </div>

          <Typography>Set your target XP to display your performance as a progress bar.</Typography>
        </DialogContent>

        <DialogActions className="flex justify-center">
          <Button
            size="large"
            color="inherit"
            variant="contained"
            className="group h-5 !bg-[white] !border !border-black !text-black hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
            disabled={isLoading}
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
            disabled={isLoading}
            onClick={handleXp}
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
      </BootstrapDialog>

      <div className="flex flex-col justify-center items-center gap-2 h-[80vh]">
        <img src="/assets/images/activities.png" alt="activities" className="" />
        <Typography>Set your target XP to display your performance as a progress bar.</Typography>

        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-50"
          onClick={handleClickOpen}
        >
          Set Your Target XP
        </Button>
      </div>
    </Box>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
