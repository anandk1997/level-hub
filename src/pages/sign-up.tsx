import { HelmetTitle } from 'src/components/HelmetTitle';

import { SignUpView } from 'src/sections/auth/sign-up-view';

export default function Page() {
  return (
    <>
      <HelmetTitle title="Sign up" />

      <SignUpView />
    </>
  );
}
