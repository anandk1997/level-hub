import { Button, CircularProgress, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';

import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';
import toast from 'react-hot-toast';
import { getErrorMessage, IActArgs } from 'src/slices/apis/types';
import { useAddActivityMutation } from 'src/slices/apis/app.api';

export const Activities = () => {
  const [isAddActivity, setIsAddActivity] = useState(false);

  const initialState: IActArgs = {
    name: '',
    xp: '',
    description: '',
    videoLink: '',
  };

  const [formState, setFormState] = useState(initialState);
  const [errorState, setErrorState] = useState<Partial<IActArgs>>(initialState);

  const [addActivity, { isLoading: isAdding }] = useAddActivityMutation();

  const handleChange = (key: keyof IActArgs, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));

    setErrorState((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors: Partial<IActArgs> = {};

    // Common required fields
    const requiredFields: [keyof IActArgs, string][] = [
      ['name', 'Name is required'],
      ['xp', 'XP is required'],
    ];

    // ✅ Validate required fields
    requiredFields.forEach(([key, message]) => {
      if (!formState[key]) newErrors[key] = message;
    });

    // ✅ Set error state
    setErrorState(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const { error } = await addActivity(formState);
      if (error) return toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Typography>Activities</Typography>

        <Drawer anchor={'right'} open={isAddActivity} onClose={() => setIsAddActivity(false)}>
          <form className="p-2 w-95" onSubmit={handleAddActivity}>
            <header className="flex justify-between items-center gap-2 border-b border-gray-300 pb-1 mb-2">
              <Typography>Add Activity</Typography>

              <IconButton
                aria-label="close"
                disabled={isAdding}
                onClick={() => setIsAddActivity(false)}
                sx={(theme) => ({
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                  borderRadius: 10,
                  border: '1px solid',
                  padding: 0,
                })}
              >
                <CloseIcon />
              </IconButton>
            </header>

            <section className="flex flex-col gap-2">
              <div className="flex flex-col md:flex-row gap-2">
                <TextField
                  fullWidth
                  name="name"
                  label="Task Name"
                  error={!!errorState.name}
                  helperText={errorState.name}
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  // sx={{ mb: 3, ...autofillStyles }}
                />

                <TextField
                  fullWidth
                  name="xp"
                  label="XP"
                  error={!!errorState.xp}
                  helperText={errorState.xp}
                  value={formState.xp}
                  onChange={(e) => handleChange('xp', e.target.value)}
                  // sx={{ mb: 3, ...autofillStyles }}
                />
              </div>

              <TextField
                fullWidth
                name="description"
                label="Task Description (Optional)"
                multiline
                rows={10}
                error={!!errorState.description}
                helperText={errorState.description}
                value={formState.description}
                onChange={(e) => handleChange('description', e.target.value)}
                // sx={{ mb: 3, ...autofillStyles }}
              />

              <TextField
                fullWidth
                name="videoLink"
                label="Video Link (Optional)"
                error={!!errorState.videoLink}
                helperText={errorState.videoLink}
                value={formState.videoLink}
                onChange={(e) => handleChange('videoLink', e.target.value)}
                // sx={{ mb: 3, ...autofillStyles }}
              />
            </section>

            <DialogActions className="flex justify-center mt-2">
              <Button
                size="large"
                color="inherit"
                variant="contained"
                className="group h-5 !bg-[white] !border !border-black !text-black hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
                disabled={isAdding}
                onClick={() => setIsAddActivity(false)}
              >
                Cancel
              </Button>

              <Button
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] w-[48%]"
                disabled={isAdding}
              >
                {isAdding ? (
                  <CircularProgress
                    className="!text-white group-hover:!text-[#09C0F0]"
                    sx={{ scale: '.5' }}
                  />
                ) : (
                  'Save'
                )}
              </Button>
            </DialogActions>
          </form>
        </Drawer>

        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0]"
          onClick={() => setIsAddActivity(true)}
        >
          Add Activity
        </Button>
      </div>
      <img src="/assets/images/target_xp.png" alt="target_xp" className="w-full h-30" />

      <Typography className="text-center !my-3">
        There is currently nothing to display. Please add some activities, and we will show the
        experience points (XP) accordingly.
      </Typography>

      <Button
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        className="group h-5 !bg-[#09C0F0] !border !border-transparent hover:!bg-white hover:!border-[#09C0F0] hover:!text-[#09C0F0] !flex !m-auto"
        onClick={() => setIsAddActivity(true)}
      >
        Add Activity
      </Button>
    </>
  );
};
