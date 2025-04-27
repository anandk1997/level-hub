import { Button } from '@mui/material';

import { cn } from 'src/utils';

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { VerifiedUser } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { useActivityAtom } from 'src/store/jotai/activities';

import { CustomRangePicker } from './DateRange';

export const Filters = ({ setIsApprove, ids }: IFilters) => {
  const { filters, handleFilters } = useActivityAtom();

  const options = [
    { label: 'ALL', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'notCompleted' },
  ];

  return (
    <div className="flex flex-wrap gap-1">
      <CustomRangePicker />

      <Autocomplete
        className="w-15"
        options={options}
        getOptionLabel={(option) => option.label}
        value={options.find((opt) => opt.value === filters.status) || null}
        onChange={(_, value) => handleFilters('status', value?.value || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Status"
            variant="outlined"
            placeholder="Status"
            fullWidth
          />
        )}
      />

      <Button
        className="!bg-white !text-black !rounded-none !border !border-gray-200 !font-light !me-1"
        startIcon={<FilterAltIcon />}
      >
        Filter
      </Button>

      <button
        className={cn('cursor-pointer disabled:cursor-default text-gray-300', {
          'text-[#09C0F0]': ids.length,
        })}
        disabled={!ids.length}
        onClick={setIsApprove}
      >
        <VerifiedUser />
      </button>
    </div>
  );
};

interface IFilters {
  setIsApprove: () => void;
  ids: number[];
}
