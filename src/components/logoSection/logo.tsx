import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { logoClasses } from './classes';
import { cn } from 'src/utils';
import { Link } from 'react-router-dom';
import { route } from 'src/utils/constants/routes';

type LogoProps = BoxProps & {};

export const LogoSection = forwardRef<HTMLDivElement, LogoProps>(
  ({ width, height, className, sx, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(logoClasses.root, 'w-fit mb-4', className)}
        aria-label="Logo"
        sx={{ ...sx }}
        {...other}
      >
        <Logo to={route.dashboard} />
      </Box>
    );
  }
);

export const Logo = ({ to }: { to: string }) => {
  return (
    <Link to={to}>
      <img src="/assets/images/header_logo.png" alt="logo" className="h-7.5 w-12 rounded-md" />
    </Link>
  );
};
