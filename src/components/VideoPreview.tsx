import { Button, CircularProgress, IconButton } from '@mui/material';

import DialogActions from '@mui/material/DialogActions';

import { cn } from 'src/utils';

import ReactPlayer from 'react-player';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

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
      <DialogTitle>Video Preview</DialogTitle>

      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={setOpen}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

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
