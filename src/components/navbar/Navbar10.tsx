import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import ContainerWrapper from '../ContainerWrapper';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '@media all': {
    minHeight: 84,
    paddingLeft: 0,
    paddingRight: 0,
  },
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    '@media all': {
      minHeight: 72,
    },
  },
  [theme.breakpoints.down('sm')]: {
    '@media all': {
      minHeight: 64,
    },
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

export default function Navbar10({ children }: any) {
  return (
    <ContainerWrapper>
      <AppBar position="static" color="inherit" elevation={0} sx={{ background: 'transparent' }}>
        <StyledToolbar>{children}</StyledToolbar>
      </AppBar>
    </ContainerWrapper>
  );
}
