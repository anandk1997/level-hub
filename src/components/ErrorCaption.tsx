import { Typography } from '@mui/material';

export const ErrorCaption = ({ caption }: { caption: string | undefined }) => {
  return (
    !!caption && (
      <Typography color="error" variant="caption" className="!ms-2 !mt-0.5">
        {caption}
      </Typography>
    )
  );
};
