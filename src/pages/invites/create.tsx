import { useState } from 'react';

import { Button, CircularProgress, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import clsx from 'clsx';
import { useUpdateProfileMutation } from 'src/slices/apis/app.api';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { IRole } from 'src/sections/auth/_components/RoleSection';
import { route } from 'src/utils/constants/routes';
import { getErrorMessage } from 'src/slices/apis/types';
import toast from 'react-hot-toast';

const CreateInvite = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errorState, setErrorState] = useState<IErrorAtom>({ ...initialFormState });

  const [createInvite, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (key: keyof IFormAtom, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));

    setErrorState((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors: IErrorAtom = { ...initialFormState };

    const requiredFields: [keyof IFormAtom, string][] = [
      ['firstName', 'First name is required'],
      ['lastName', 'Last name is required'],
      ['email', 'Email is required'],
      ['role', 'Role is required'],
    ];

    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    const email = formState.email?.trim();
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const { data, error } = await createInvite(formState);

      if (error) return toast.error(getErrorMessage(error));

      toast.success(data?.message);
      setFormState(initialFormState);
    }
  };

  const roles = rolesData.reduce<IRole[][]>((rows, role, index) => {
    if (index % 2 === 0) rows.push([role]);
    else rows[rows.length - 1].push(role);

    return rows;
  }, []);

  return (
    <div className="h-[70vh]">
      <Typography
        to={route.invites}
        className="!font-bold !text-2xl flex items-center gap-1"
        component={Link}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        Create Invitation
      </Typography>

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
            error={!!errorState.email}
            helperText={errorState.email}
            name="email"
            label="Email address"
            value={formState.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <>
          <div className="flex flex-col gap-2">
            {roles.map((row, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-2">
                {row.map((role) => (
                  <RoleButton
                    key={role.key}
                    role={role}
                    selectedRole={formState.role}
                    onSelect={handleChange}
                    errorState={errorState}
                  />
                ))}
              </div>
            ))}
          </div>

          {!!errorState.role && (
            <Alert className="max-w-fit" severity="error">
              {errorState.role}
            </Alert>
          )}
        </>

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
            'Create Invitation'
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateInvite;

const rolesData: IRole[] = [
  {
    key: 'INDIVIDUAL.OWNER',
    label: 'Single User',
    description: 'Train independently and monitor your performance.',
    icon: '/assets/icons/sign_up/individual_icon.png',
  },
  {
    key: 'PARENT.OWNER',
    label: 'Parent',
    description: 'Track and manage your children’s progress.',
    icon: '/assets/icons/sign_up/parent_icon.png',
  },
];

interface IFormAtom {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface IErrorAtom {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

type RoleButtonProps = {
  role: IRole;
  selectedRole: string;
  onSelect: (key: keyof IFormAtom, value: string) => void;
  errorState: IErrorAtom;
};

const RoleButton: React.FC<RoleButtonProps> = ({ role, selectedRole, onSelect, errorState }) => {
  const isActive = selectedRole === role.key;

  return (
    <button
      type="button"
      className={clsx(
        'flex items-center gap-1.5 flex-1 border rounded-md p-2 cursor-pointer transition-colors',
        isActive ? 'border-[#09C0F0] bg-[#09C0F00A]' : 'border-gray-300',
        { 'border border-red-500': !!errorState.role }
      )}
      onClick={() => onSelect('role', role.key)}
    >
      <img
        src={
          isActive
            ? `/assets/icons/sign_up/${role.key.split('.')[0].toLowerCase()}_active.png`
            : role.icon
        }
        alt={role.label}
        className="w-6 h-6"
      />
      <div>
        <div className="font-bold flex">{role.label}</div>
        <span className="text-gray-400 text-xs">{role.description}</span>
      </div>
    </button>
  );
};
