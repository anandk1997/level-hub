import { useEffect, useId } from 'react';

import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';

import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useGetProfileQuery, useUpdateProfileMutation } from 'src/slices/apis/app.api';
import { getErrorMessage } from 'src/slices/apis/types';
import { filterValues } from 'src/utils';
import { ErrorCaption } from '../../components/ErrorCaption';

import { RadioGroup } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LineProgress } from 'src/components/lineProgress';
import { MuiStyledPhoneInput } from 'src/sections/auth/_components/PhoneInput';
import { initialFormState, useAccountsAtom } from 'src/store/jotai/accounts';

const Account = () => {
  const genderId = useId();

  const { formState, setFormState, errorState, handleChange, validate } = useAccountsAtom();

  const { data, isFetching } = useGetProfileQuery({});

  const user = data?.resultData?.profile;

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = formState.dob!?.toDate().toISOString().split('T')[0];

    if (validate()) {
      const payload = { ...formState, dob: formattedDate };

      const filteredFormState: any = filterValues(payload);

      const { data, error } = await updateProfile(filteredFormState);

      if (error) return toast.error(getErrorMessage(error));

      toast.success(data?.message);
      setFormState(initialFormState);
    }
  };

  useEffect(() => {
    if (!user) return;

    setFormState((prev) => ({
      ...prev,
      dob: user?.dob ? dayjs(user?.dob) : null,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      gender: user?.gender,
    }));
  }, [user]);

  const dobProps: Partial<DatePickerProps<any>> = {
    label: 'Select Date of Birth (Optional)',
    value: formState.dob,
    onChange: (newValue) => handleChange('dob', newValue),
    slotProps: {
      textField: {
        error: !!errorState.dob,
        helperText: errorState.dob,
      },
    },
  };

  if (isFetching) return <LineProgress />;
  return (
    <div className="h-[70vh] p-5">
      <Typography className="!font-bold !text-2xl">Account Details</Typography>

      <form noValidate className="flex flex-col gap-2 mt-4" onSubmit={handleSignIn}>
        <div className="flex flex-col md:flex-row gap-2">
          <TextField
            fullWidth
            required
            error={!!errorState.firstName}
            helperText={errorState.firstName}
            name="firstName"
            label="First Name"
            value={formState.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />

          <TextField
            fullWidth
            required
            error={!!errorState.lastName}
            helperText={errorState.lastName}
            name="lastName"
            label="Last Name"
            value={formState.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <TextField
            fullWidth
            required
            disabled
            error={!!errorState.email}
            helperText={errorState.email}
            name="email"
            label="Email address"
            // value={formState.email}
            value={user?.email}
            // onChange={(e) => handleChange('email', e.target.value)}
          />

          <div className="w-full flex flex-col">
            <MuiStyledPhoneInput
              className="z-10 w-full bg-transparent"
              defaultCountry="in"
              key={formState.phone} // forces remount on phone change
              value={formState.phone}
              onChange={(phone) => handleChange('phone', phone)}
              sx={{
                '& .react-international-phone-input': {
                  borderTop: !!errorState.phone ? '1px solid red !important' : '',
                  borderRight: !!errorState.phone ? '1px solid red !important' : '',
                  borderBottom: !!errorState.phone ? '1px solid red !important' : '',
                  color: !!errorState.phone ? 'red !important' : '',
                },

                '& .react-international-phone-country-selector-button': {
                  borderTop: !!errorState.phone ? '1px solid red !important' : '',
                  borderLeft: !!errorState.phone ? '1px solid red !important' : '',
                  borderBottom: !!errorState.phone ? '1px solid red !important' : '',
                },
              }}
            />

            <ErrorCaption caption={errorState.phone} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className="!hidden md:!flex" {...dobProps} />
              <MobileDatePicker className={clsx('md:!hidden !flex')} {...dobProps} />
            </LocalizationProvider>
          </div>

          <FormControl sx={{ flex: 1 }}>
            <FormLabel id={genderId} className="!text-sm !font-bold">
              What's your gender? (Optional)
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby={genderId}
              name="row-radio-buttons-group"
              value={formState.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>

            <ErrorCaption caption={errorState.gender} />
          </FormControl>
        </div>

        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          disabled={isLoading}
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] md:max-w-[40%] !mt-4"
        >
          {isLoading ? (
            <CircularProgress
              className="!text-white group-hover:!text-[#09C0F0]"
              sx={{ scale: '.5' }}
            />
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </div>
  );
};

export default Account;
