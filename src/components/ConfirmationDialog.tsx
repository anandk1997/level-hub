import { Button, CircularProgress } from '@mui/material';

import DialogActions from '@mui/material/DialogActions';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function ConfirmationDialog({
  onOpen,
  onClose,
  isLoading,
  onSubmit,
  title,
  message,
}: {
  onOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  message: string;
}) {
  return (
    <Dialog fullWidth maxWidth={'sm'} open={onOpen} onClose={onClose}>
      <DialogTitle className="text-center">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText className="text-center">{message}</DialogContentText>
      </DialogContent>

      <DialogActions className="!flex !justify-center !pb-3">
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
