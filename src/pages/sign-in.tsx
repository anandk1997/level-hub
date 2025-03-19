import { HelmetTitle } from 'src/components/HelmetTitle';

import { SignInView } from 'src/sections/auth';

export default function Page() {
  return (
    <>
      <HelmetTitle title="Sign in" />

      <SignInView />
    </>
  );
}
