import { HelmetTitle } from 'src/components/HelmetTitle';

import { NotFoundView } from 'src/sections/error';

export default function Page() {
  return (
    <>
      <HelmetTitle title="404 page not found! | Error" />

      <NotFoundView />
    </>
  );
}
