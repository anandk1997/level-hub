import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Suspense, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { _langs, _notifications } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { Outlet, useLocation } from 'react-router-dom';
import { LineProgress } from 'src/components/lineProgress';
import Cookies from 'js-cookie';
import { logoutUser } from 'src/slices/reducers/auth.reducer';
import { useAppDispatch } from 'src/store/redux';
import { useRouter } from 'src/routes/hooks';
import { route } from 'src/utils/constants/routes';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = { sx?: SxProps<Theme>; header?: { sx?: SxProps<Theme> } };

export function DashboardLayout({ sx, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useScrollToTop();

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';

  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      dispatch(logoutUser());
      router.push(route.signIn);
    }
  }, [token]);

  if (!token) return <LineProgress />;
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false, sx: { px: { [layoutQuery]: 5 } } } }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{ ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <Searchbar />
                <LanguagePopover data={_langs} />
                <NotificationsPopover data={_notifications} />
                <AccountPopover
                  data={[
                    {
                      label: 'Home',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    {
                      label: 'Profile',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Settings',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: { pl: 'var(--layout-nav-vertical-width)' },
        },
        ...sx,
      }}
    >
      <Main>
        <Suspense key={location.key} fallback={<LineProgress />}>
          <Outlet />
        </Suspense>
      </Main>
    </LayoutSection>
  );
}
