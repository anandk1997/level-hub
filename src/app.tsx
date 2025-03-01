import 'src/styles/global.css';
import 'src/i18n';

import { router } from 'src/routes';

import { RouterProvider } from 'react-router-dom';
import { Providers } from './providers';

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
