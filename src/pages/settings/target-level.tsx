import { Button, CircularProgress, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';

import { useFetchLevelQuery, useLevelMutation } from 'src/slices/apis/app.api';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'src/slices/apis/types';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { cn } from 'src/utils';
import { LineProgress } from 'src/components/lineProgress';
import { ConfirmationDialog } from 'src/components/ConfirmationDialog';

const STEP = 100;

const TargetLevel = () => {
  const { data, isFetching } = useFetchLevelQuery({});

  const [levelXP, setLevelXP] = useState(0);
  const [error, setError] = useState('');

  const [isXP, toggleIsXP] = useReducer((state) => !state, false);

  useEffect(() => {
    if (data?.resultData?.levelXP != null) {
      setLevelXP(data.resultData.levelXP);
    }
  }, [data?.resultData?.levelXP]);

  const [updateLevel, { isLoading }] = useLevelMutation();

  const handleXp = async () => {
    if (levelXP < 0) {
      return toast.error('XP cannot be negative');
    }

    const { error: apiError, data: apiData } = await updateLevel({ levelXP });

    toggleIsXP();

    if (apiError) {
      return toast.error(getErrorMessage(apiError));
    }

    toast.success(apiData.message);
  };

  const adjustXp = (delta: number) => {
    setError('');
    setLevelXP((prev) => {
      const next = prev + delta;
      return next < 0 ? 0 : next;
    });
  };

  const onInputChange = (value: string) => {
    setError('');
    const num = Number(value);
    if (isNaN(num) || num < 0) {
      setLevelXP(0);
      setError('XP must be a non-negative number');
    } else {
      setLevelXP(num);
    }
  };

  if (isFetching) return <LineProgress />;

  return (
    <div className="p-4 flex flex-col items-center md:items-start w-full">
      <ConfirmationDialog
        title="Are you sure you want to change target XP"
        message="This action will influence the XP levels of all users"
        onOpen={isXP}
        onClose={toggleIsXP}
        isLoading={isLoading}
        onSubmit={handleXp}
      />

      <Typography className="!font-bold !text-2xl text-center">Target/Level Management</Typography>

      <Typography className="!text-sm !mt-1 !mb-3 text-center">
        Set your target XP to display your performance as a progress bar.
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toggleIsXP();
        }}
        className="w-full flex flex-col items-center md:items-start"
      >
        <div className="flex flex-col items-center gap-1 max-w-[80%] md:max-w-[50%] my-2">
          <label className="text-gray-500 text-sm">Target Level XP</label>

          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              className={cn('cursor-pointer', { 'mb-2.5': error })}
              onClick={() => adjustXp(-STEP)}
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
              helperText={error || `Step: ${STEP}`}
              onChange={(e) => onInputChange(e.target.value)}
              slotProps={{
                htmlInput: {
                  className: 'text-center',
                },
              }}
            />

            <button
              type="button"
              className={cn('cursor-pointer', { 'mb-2.5': error })}
              onClick={() => adjustXp(STEP)}
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
