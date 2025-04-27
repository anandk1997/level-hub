import { Avatar, LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 18,
  borderRadius: 10,
  border: '1px solid white',

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],

    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: '#FF991F',

    ...theme.applyStyles('dark', {
      backgroundColor: '#FF991F',
    }),
  },
}));

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));
