import { HelmetTitle } from 'src/components/HelmetTitle';

import { Box } from '@mui/material';
import { TargetXP } from 'src/components/activities/TargetXp';
import { Activities } from 'src/components/activities';

export default function ActivitiesPage() {
  return (
    <>
      <HelmetTitle title="Activities" />

      <Box sx={{ p: 5 }}>
        {false ? (
          <TargetXP />
        ) : (
          <>
            <Activities />
          </>
        )}
      </Box>
    </>
  );
}
