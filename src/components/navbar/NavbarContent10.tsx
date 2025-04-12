import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import ContainerWrapper from 'src/components/ContainerWrapper';
import { Link } from 'react-router-dom';
import { Iconify } from '../iconify';
import { NavMenu, NavMenuDrawer } from './NavItems';
import MenuPopper from './MenuPopper';
import { route } from 'src/utils/constants/routes';
import { Logo } from '../logoSection';
import { INavitemProps } from './types';
import { useNavbarAtom } from 'src/store/jotai/navbar';

export default function NavbarContent10({ navItems }: INavitemProps) {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { setAnchorEl } = useNavbarAtom();

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', width: 1 }}>
      <Logo to={route.index} />

      {!downMD && navItems && (
        <Box sx={{ borderRadius: 10 }}>
          <NavMenu {...{ navItems }} />
        </Box>
      )}

      <Stack
        direction="row"
        sx={{ gap: { xs: 1, md: 1.5, justifyContent: 'center', alignItems: 'center' } }}
      >
        {!downSM && <AuthLinks />}

        {downMD && (
          <Box sx={{ flexGrow: 1 }}>
            <MenuPopper
              offset={downSM ? 12 : 16}
              toggleProps={{
                children: <Iconify width={24} icon="mage:dash-menu" />,
                color: 'inherit',
                sx: { minWidth: 40, width: 40, height: 40, p: 0 },
              }}
            >
              <ContainerWrapper>
                {navItems && (
                  <Box sx={{ mx: -2 }}>
                    <NavMenuDrawer navItems={navItems} onClose={() => setAnchorEl(null)} />
                  </Box>
                )}
                {downSM && <AuthLinks onClose={() => setAnchorEl(null)} />}
              </ContainerWrapper>
            </MenuPopper>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

export const AuthLinks = ({ onClose }: { onClose?: () => void }) => (
  <Stack
    direction="row"
    sx={{
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 1,
      px: 1,
      py: 2.5,
    }}
  >
    <Link
      to={route.signIn}
      onClick={() => {
        if (onClose) onClose();
      }}
      className="bg-[#080808] px-3.5 py-1.5 rounded-xl text-white !border !border-white hover:!bg-white hover:!border-black hover:!text-black"
    >
      Login
    </Link>

    <Link
      to={route.signUp}
      onClick={() => {
        if (onClose) onClose();
      }}
      className="bg-[#09C0F0] px-3.5 py-1.5 rounded-xl text-white !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
    >
      Signup
    </Link>
  </Stack>
);
