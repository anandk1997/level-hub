import { Typography } from '@mui/material';
import { cn } from 'src/utils';

export const ErrorCaption = ({
  caption,
  className,
}: {
  caption: string | undefined;
  className?: string;
}) => {
  return (
    !!caption && (
      <Typography color="error" variant="caption" className={cn('!ms-2 !mt-0.5', className)}>
        {caption}
      </Typography>
    )
  );
};
