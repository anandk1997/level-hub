import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

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
        component={RouterLink}
        className={cn(logoClasses.root, 'w-fit mb-4', className)}
        aria-label="Logo"
        sx={{ ...sx }}
        {...other}
      >
        <Logo />
      </Box>
    );
  }
);

export const Logo = () => {
  return (
    <Link to={route.dashboard}>
      <img src="/assets/images/header_logo.png" alt="logo" className="h-7.5 w-12 rounded-md" />
    </Link>
  );
};
