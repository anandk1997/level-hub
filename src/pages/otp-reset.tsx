import { route } from 'src/utils/constants/routes';
import { OtpVerify } from 'src/components/otpVerify';

const otpReset = () => {
  return <OtpVerify navigatePath={route.reset} />;
};

export default otpReset;
