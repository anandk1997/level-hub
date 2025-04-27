import { Button, CircularProgress } from '@mui/material';

import DialogActions from '@mui/material/DialogActions';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
