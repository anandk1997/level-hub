import { route } from 'src/utils/constants/routes';
import { OtpVerify } from 'src/components/otpVerify';

const OtpSignup = () => {
  return <OtpVerify navigatePath={route.welcome} />;
};

export default OtpSignup;
