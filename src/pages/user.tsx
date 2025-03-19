import { HelmetTitle } from 'src/components/HelmetTitle';

import { UserView } from 'src/sections/user/view';

export default function Page() {
  return (
    <>
      <HelmetTitle title="Users" />

      <UserView />
    </>
  );
}
