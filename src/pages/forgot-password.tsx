import { CircularProgress, Button, TextField } from '@mui/material';
import { useForgotPasswordMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { getErrorMessage } from 'src/slices/apis/types';
import { useRouter } from 'src/routes/hooks';
import { autofillStyles } from 'src/sections/auth/sign-up-view';
import { route } from 'src/utils/constants/routes';
import { CardLayout } from 'src/layouts/auth/cardLayout';
import useFocusInput from 'src/hooks/useFocusInput';
import { encodeQueryParams } from 'src/utils';

const ForgotPassword = () => {
  const router = useRouter();
  const { inputsRef } = useFocusInput();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validate = () => {
    const emailValue = email.trim();

    if (!emailValue) {
      setError('Email is required');
      return false;
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      setError('Invalid email address');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const { error, data } = await forgotPassword({ email });

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data.message);

    const path = encodeQueryParams(route.otpReset, { email });

    router.push(path);
  };

  return (
    <CardLayout
      title="Forgot Password"
      message="Don’t worry, happens to all of us. Enter your email below to recover your password"
      to={route.signIn}
      linkTitle="Login"
    >
      <form onSubmit={handleSubmit}>
        <TextField
          inputRef={(el) => (inputsRef.current = el)}
          fullWidth
          name="email"
          label="Email address"
          error={!!error}
          helperText={error}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ ...autofillStyles }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          disabled={isLoading}
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] !mt-4"
        >
          {isLoading ? (
            <CircularProgress
              className="!text-white group-hover:!text-[#09C0F0]"
              sx={{ scale: '.5' }}
            />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </CardLayout>
  );
};

export default ForgotPassword;
