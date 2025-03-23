import { Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Iconify } from 'src/components/iconify';
import { usePathname } from 'src/routes/hooks';
import { route } from 'src/utils/constants/routes';

export const CardLayout = ({ children, title, message, linkTitle, to }: ICardLayout) => {
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
        <Box gap={1.5} display="flex" flexDirection="column" sx={{ mb: 3, gap: 0 }}>
          <Link to={to} className="flex items-center -ml-1 mb-1 text-xs w-fit">
            <Iconify icon="iconamoon:arrow-left-2-thin" />
            Back to {linkTitle}
          </Link>

          <Typography variant="h5">{title}</Typography>

          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Box>

        {children}
      </Box>
    </Container>
  );
};

interface ICardLayout {
  children: ReactNode;
  title: string;
  message: string;
  linkTitle: string;
  to: string;
}
