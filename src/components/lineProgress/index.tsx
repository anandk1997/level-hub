import { Box, Container, LinearProgress, linearProgressClasses } from '@mui/material';
import { varAlpha } from 'src/theme/styles';

export const LineProgress = () => (
  <Container
    sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
      <LinearProgress
        sx={{
          width: 1,
          maxWidth: 320,
          bgcolor: (theme) => varAlpha(theme?.vars?.palette?.text?.primaryChannel || 'black', 0.16),
          [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
        }}
      />
    </Box>
  </Container>
);
