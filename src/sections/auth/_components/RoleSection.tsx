import { FormLabel } from '@mui/material';
import { Alert, FormControl, TextField } from '@mui/material';
import clsx from 'clsx';
import { IFormAtom, RoleType, useSignupAtom } from 'src/store/jotai/signup';
import { autofillStyles } from '../sign-up-view';
import { route } from 'src/utils/constants/routes';

export const RoleSection = ({
  handleChange,
}: {
  handleChange: <K extends keyof IFormAtom>(key: K, value: IFormAtom[K]) => void;
}) => {
  const { formState, errorState } = useSignupAtom();

  const isRole = <T extends RoleType>(validRoles: T[]) => validRoles.includes(formState.role as T);

  // Generate options for children's age
  // const childrensAge = generateOptions(1, 18);

  // // Handle change in number of children
  // const handleChildrenCountChange = (_: any, newValue: any) => {
  //   handleChange('childrens', newValue);
  //   const count = newValue ? parseInt(newValue.value) : 0;
  //   setNumberOfChildren(count);
  // };

  const roles = rolesData.reduce<IRole[][]>((rows, role, index) => {
    if (index % 2 === 0) rows.push([role]);
    else rows[rows.length - 1].push(role);

    return rows;
  }, []);

  return (
    <>
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

      {/* Role Selection */}
      <FormControl required component="fieldset">
        <FormLabel component="legend" className="!font-bold mb-1">
          Select Role
        </FormLabel>

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
      </FormControl>

      {!!errorState.role && (
        <Alert className="max-w-fit" severity="error">
          {errorState.role}
        </Alert>
      )}

      <>
        {/* Parent Section */}
        {/* {isRole(['parent']) && (
        <>
          // Number of children 
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

          // Dynamically Render Children Inputs 
          {formState.childrenData.map((child, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2">
              // Age 
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

              // Gender 
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
      )} */}
      </>
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
    key: route.gym.split('/')[1],
    label: 'Gym Owner',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    icon: '/assets/icons/sign_up/gym_icon.png',
  },
  {
    key: route.coach.split('/')[1],
    label: 'Coach',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    icon: '/assets/icons/sign_up/coach_icon.png',
  },
  {
    key: route.individual.split('/')[1],
    label: 'Individual',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    icon: '/assets/icons/sign_up/individual_icon.png',
  },
  {
    key: route.parent.split('/')[1],
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
