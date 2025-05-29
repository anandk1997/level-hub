import { TextField } from '@mui/material';
import { Autocomplete, Button } from '@mui/material';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { cn } from 'src/utils';
import { route } from 'src/utils/constants/routes';

const Users = () => {
  const options = [
    { label: 'ALL', value: 'all' },
    { label: 'Child', value: 'child' },
    { label: 'Parent', value: 'parent' },
    { label: 'Individual', value: 'individual' },
  ];

  const options1 = [
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
  ];

  const options2 = [
    { label: 'ASC', value: 'asc' },
    { label: 'DESC', value: 'desc' },
  ];

  return (
    <>
      <div className="flex justify-between gap-1 mb-2">
        <div>
          <Typography variant="h4">Users</Typography>
        </div>

        <Button
          to={route.createInvite}
          component={Link}
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
        >
          Create Invitation
        </Button>
      </div>

      <div className="flex justify-end gap-1">
        <TextField
          // error={!!errorState.firstName}
          // helperText={errorState.firstName}
          name="search"
          label="Search"
          // value={formState.firstName}
          // onChange={(e) => handleChange('firstName', e.target.value)}
        />

        <Autocomplete
          className="w-16"
          options={options}
          getOptionLabel={(option) => option.label}
          // value={options.find((opt) => opt.value === filters.status) || null}
          // onChange={(_, value) => handleFilters('status', value?.value || '')}
          renderInput={(params) => (
            <TextField {...params} label="User Type" variant="outlined" fullWidth />
          )}
        />

        <Autocomplete
          className="w-13"
          options={options1}
          getOptionLabel={(option) => option.label}
          // value={options.find((opt) => opt.value === filters.status) || null}
          // onChange={(_, value) => handleFilters('status', value?.value || '')}
          renderInput={(params) => (
            <TextField {...params} label="Sort By" variant="outlined" fullWidth />
          )}
        />

        <Autocomplete
          className="w-16"
          options={options2}
          getOptionLabel={(option) => option.label}
          // value={options.find((opt) => opt.value === filters.status) || null}
          // onChange={(_, value) => handleFilters('status', value?.value || '')}
          renderInput={(params) => (
            <TextField {...params} label="Sort Order" variant="outlined" fullWidth />
          )}
        />
      </div>

      {Array.from({ length: 20 }, (_, i) => (
        <Card className="my-1 p-2 flex gap-1 justify-between items-center" key={i}>
          <span>Sledge Hammer</span>
          <span>demo@gmail.com</span>
          <span className="text-[#09C0F0]">Parent</span>

          <Button
            variant="contained"
            sx={{
              borderRadius: 4,
              textTransform: 'none',
              background: '#09C0F0',
              fontWeight: 'light',
              paddingX: 3,
              paddingY: 0.5,
            }}
          >
            Level 5
          </Button>

          <Link
            to={route.reports}
            className={cn(
              'group h-5 !border !border-transparent hover:!bg-white !flex justify-center items-center !rounded-full px-3 py-2 text-white disabled:!text-white disabled:cursor-none !max-w-fit',
              '!bg-[#09C0F0] hover:!border-[#09C0F0] hover:!text-[#09C0F0]'
            )}
          >
            View
          </Link>
        </Card>
      ))}
    </>
  );
};

export default Users;
