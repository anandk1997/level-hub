import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import { usePathname } from 'src/routes/hooks';
import { route } from 'src/utils/constants/routes';

export const CardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <Container sx={{ m: 5 }}>
      <Box
        sx={{
          py: 5,
          px: 3,
          width: 1,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          margin: 'auto',
          ...(pathname !== route.signUp && { maxWidth: 'var(--layout-auth-content-width)' }),
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
