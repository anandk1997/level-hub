import type { Breakpoint } from '@mui/material/styles';

import { stylesMode } from 'src/theme/styles';

import { Main } from './main';
import { LayoutSection } from '../core/layout-section';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from 'src/components/navbar';
import { Footer } from 'src/components/footer';
import { Suspense, useEffect } from 'react';
import { LineProgress } from 'src/components/lineProgress';
import { useRouter } from 'src/routes/hooks';
import { useAppSelector } from 'src/store/redux';

export function AuthLayout() {
  const location = useLocation();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  const layoutQuery: Breakpoint = 'md';

  useEffect(() => {
    if (token) router.push('/');
  }, [token]);

  if (token) return <LineProgress />;
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={<Navbar />}
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<Footer />}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px' }}
      sx={{
        '&::before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          opacity: 0.24,
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(/assets/background/overlay.jpg)`,
          [stylesMode.dark]: { opacity: 0.08 },
        },
      }}
    >
      <Main layoutQuery={layoutQuery}>
        <Suspense key={location.key} fallback={<LineProgress />}>
          <Outlet />
        </Suspense>
      </Main>
    </LayoutSection>
  );
}
