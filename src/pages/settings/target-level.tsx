import { Button, CircularProgress, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

import { useLevelMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { cn } from 'src/utils';

const TargetLevel = () => {
  const [levelXP, setLevelXP] = useState(0);
  const [error, setError] = useState('');

  const [level, { isLoading }] = useLevelMutation();

  const handleXp = async (e: FormEvent) => {
    e.preventDefault();

    if (!levelXP) return setError('LevelXP is required');

    const { error, data } = await level({
      levelXP,
    });

    if (error) return toast.error(getErrorMessage(error));

    toast.success(data.message);
  };

  return (
    <div className="p-4">
      <Typography className="!font-bold !text-2xl">Target/Level Management</Typography>

      <Typography className="!text-sm !mt-1 !mb-3">
        Set your target XP to display your performance as a progress bar.
      </Typography>

      <form onSubmit={handleXp}>
        <div className="flex flex-col items-center gap-1 max-w-[80%] md:max-w-[50%] my-2">
          <label className="text-gray-500">Target Level XP</label>

          <div className="flex items-center gap-2 mb-2">
            <button
              className={cn('cursor-pointer', {
                'mb-2.5': error,
              })}
            >
              <RemoveCircle />
            </button>

            <TextField
              fullWidth
              name="xp"
              placeholder="XP"
              type="number"
              className="!max-w-50 !min-w-10 !w-[100%]"
              value={levelXP}
              error={!!error}
              helperText={error}
              onChange={(e) => {
                setError('');
                setLevelXP(Number(e.target.value));
              }}
              slotProps={{
                htmlInput: {
                  className: 'text-center',
                },
              }}
            />

            <button
              className={cn('cursor-pointer', {
                'mb-2.5': error,
              })}
            >
              <AddCircle />
            </button>
          </div>
        </div>

        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[70%] md:w-[50%]"
          disabled={isLoading}
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

export default TargetLevel;
