import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { layoutClasses } from 'src/layouts/classes';
import { usePathname } from 'src/routes/hooks';

type MainProps = BoxProps & {
  layoutQuery: Breakpoint;
};

export function Main({ sx, children, layoutQuery, ...other }: MainProps) {
  const theme = useTheme();

  const pathname = usePathname();

  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexDirection: 'column',

        background:
          pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/otp'
            ? 'linear-gradient(to right, #EF9324, #30817D)'
            : 'white',

        [theme.breakpoints.up(layoutQuery)]: {
          justifyContent: 'center',
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
