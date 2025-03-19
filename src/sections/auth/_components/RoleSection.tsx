import { FormHelperText, FormLabel, Radio } from '@mui/material';
import { Alert, FormControl, FormControlLabel, RadioGroup, TextField } from '@mui/material';
import clsx from 'clsx';
import { IFormAtom, RoleType, useSignupAtom } from 'src/store/jotai/signup';
import { generateOptions } from './DateOfBirth';
import { ErrorCaption } from './ErrorCaption';
import { autofillStyles } from '../sign-up-view';
import { useId } from 'react';
import { Box } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const RoleSection = ({
  handleChange,
}: {
  handleChange: <K extends keyof IFormAtom>(key: K, value: IFormAtom[K]) => void;
}) => {
  const { formState, errorState, updateChildrenData, setNumberOfChildren } = useSignupAtom();

  const genderId = useId();

  const isRole = <T extends RoleType>(validRoles: T[]) => validRoles.includes(formState.role as T);

  // Generate options for children's age
  const childrensAge = generateOptions(1, 18);

  // Handle change in number of children
  const handleChildrenCountChange = (_: any, newValue: any) => {
    handleChange('childrens', newValue);
    const count = newValue ? parseInt(newValue.value) : 0;
    setNumberOfChildren(count);
  };

  const roles = rolesData.reduce<IRole[][]>((rows, role, index) => {
    if (index % 2 === 0) rows.push([role]);
    else rows[rows.length - 1].push(role);

    return rows;
  }, []);

  return (
    <>
      {/* Role Selection */}
      <div className="flex flex-col gap-2">
        {roles.map((row, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-2">
            {row.map((role) => (
              <RoleButton
                key={role.key}
                role={role}
                selectedRole={formState.role}
                onSelect={handleChange}
              />
            ))}
          </div>
        ))}
      </div>

      {!!errorState.role && (
        <div className="flex justify-center items-center m-auto border border-red-500 m-w-50 rounded-md">
          <Alert severity="error">{errorState.role}</Alert>
        </div>
      )}

      {/* Coach and Single User Section */}
      {isRole(['coach', 'single_user']) && (
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="!hidden md:!flex"
                label="Select Date of Birth"
                value={formState.dob}
                onChange={(newValue) => handleChange('dob', newValue)}
                slotProps={{
                  textField: {
                    error: !!errorState.dob,
                    helperText: errorState.dob,
                  },
                }}
              />

              <MobileDatePicker
                className={clsx('md:!hidden !flex')}
                label="Select Date of Birth"
                value={formState.dob}
                onChange={(newValue) => handleChange('dob', newValue)}
                slotProps={{
                  textField: {
                    error: !!errorState.dob,
                    helperText: errorState.dob,
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          <FormControl sx={{ flex: 1 }}>
            <FormLabel id={genderId} className="!text-sm !font-bold !mb-2">
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
      )}

      {/* Gym Owner Section */}
      {isRole(['gym']) && (
        <TextField
          error={!!errorState.gymName}
          helperText={errorState.gymName}
          name="gymName"
          label="Gym Name"
          value={formState.gymName}
          onChange={(e) => handleChange('gymName', e.target.value)}
          sx={{ width: { xs: '100%', md: '49%' }, ...autofillStyles }}
        />
      )}

      {/* Parent Section */}
      {isRole(['parent']) && (
        <>
          {/* Number of children */}
          <Box sx={{ width: { xs: '100%', md: '49%' } }}>
            <Autocomplete
              options={generateOptions(1, 5)}
              getOptionLabel={(option) => option.label}
              value={formState.childrens}
              onChange={handleChildrenCountChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Number of Children"
                  variant="outlined"
                  fullWidth
                  error={!!errorState.childrens}
                  helperText={errorState.childrens}
                />
              )}
            />
          </Box>

          {/* Dynamically Render Children Inputs */}
          {formState.childrenData.map((child, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2">
              {/* Age */}
              <div className="flex-1">
                <Autocomplete
                  options={childrensAge}
                  getOptionLabel={(option) => option.label}
                  value={child.age}
                  onChange={(_, newValue) => updateChildrenData(index, 'age', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Child ${index + 1} Age`}
                      variant="outlined"
                      fullWidth
                      error={!!errorState.childrenData?.[index]?.age}
                      helperText={errorState.childrenData?.[index]?.age}
                    />
                  )}
                />
              </div>

              {/* Gender */}
              <FormControl sx={{ flex: 1 }} error={!!errorState.childrenData?.[index]?.gender}>
                <FormLabel className="!text-sm !font-bold !mb-2">
                  Child {index + 1} Gender
                </FormLabel>

                <RadioGroup
                  row
                  name={`child${index + 1}Gender`}
                  value={child.gender}
                  onChange={(e) => updateChildrenData(index, 'gender', e.target.value)}
                  sx={{
                    '& .MuiFormControlLabel-label, .MuiRadio-root': {
                      color: errorState.childrenData?.[index]?.gender ? 'red !important' : '',
                    },
                  }}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>

                <FormHelperText>{errorState.childrenData?.[index]?.gender}</FormHelperText>
              </FormControl>
            </div>
          ))}
        </>
      )}
    </>
  );
};

type IRole = {
  key: string;
  label: string;
  description: string;
  icon: string;
};

const rolesData: IRole[] = [
  {
    key: 'gym',
    label: 'Gym Owner',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    icon: '/assets/icons/sign_up/gym_icon.png',
  },
  {
    key: 'coach',
    label: 'Coach',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    icon: '/assets/icons/sign_up/coach_icon.png',
  },
  {
    key: 'single_user',
    label: 'Single User',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    icon: '/assets/icons/sign_up/single_user_icon.png',
  },
  {
    key: 'parent',
    label: 'Parent',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    icon: '/assets/icons/sign_up/parent_icon.png',
  },
];

type RoleButtonProps = {
  role: IRole;
  selectedRole: string;
  onSelect: (key: keyof IFormAtom, value: string) => void;
};

const RoleButton: React.FC<RoleButtonProps> = ({ role, selectedRole, onSelect }) => {
  const isActive = selectedRole === role.key;
  const { errorState } = useSignupAtom();

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
        src={isActive ? `/assets/icons/sign_up/${role.key}_active.png` : role.icon}
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
