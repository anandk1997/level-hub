import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import ContainerWrapper from 'src/components/ContainerWrapper';
import { Link } from 'react-router-dom';
import { Iconify } from '../iconify';
import { NavMenu, NavMenuDrawer } from './NavItems';
import MenuPopper from './MenuPopper';

export default function NavbarContent10({ navItems }: any) {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', width: 1 }}>
      <Link to="/dashboard">
        <img src="/assets/images/header_logo.png" alt="logo" className="h-7.5 w-12 rounded-md" />
      </Link>

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
                    <NavMenuDrawer {...{ navItems }} />
                  </Box>
                )}

                {downSM && <AuthLinks />}
              </ContainerWrapper>
            </MenuPopper>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

export const AuthLinks = () => (
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
      to="/sign-in"
      className="bg-[#080808] px-3.5 py-1.5 rounded-xl text-white !border !border-white hover:!bg-white hover:!border-black hover:!text-black"
    >
      Login
    </Link>

    <Link
      to="/sign-up"
      className="bg-[#09C0F0] px-3.5 py-1.5 rounded-xl text-white !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
    >
      Signup
    </Link>
  </Stack>
);
