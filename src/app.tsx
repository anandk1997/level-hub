import 'src/global.css';

import Fab from '@mui/material/Fab';

import { router } from 'src/routes';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';
import { HelmetProvider } from 'react-helmet-async';

import { RouterProvider } from 'react-router-dom';

export default function App() {
  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        {githubButton}
      </ThemeProvider>
    </HelmetProvider>
  );
}
