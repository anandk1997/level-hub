import { HelmetTitle } from 'src/components/HelmetTitle';
import { Box, Typography } from '@mui/material';
import { TargetXP } from 'src/components/activities/_components/TargetXp';
import { Activities } from 'src/components/activities';
import { useFetchLevelQuery } from 'src/slices/apis/app.api';
import { LineProgress } from 'src/components/lineProgress';

export default function ActivitiesPage() {
  const { data, isFetching, error } = useFetchLevelQuery({});

  return (
    <>
      <HelmetTitle title="Activities" />

      <Box sx={{ p: 5, textAlign: 'center' }}>
        {(() => {
          if (isFetching) return <LineProgress />;
          if (error)
            return (
              <Typography variant="h6" color="error">
                Oops! Something went wrong. Please try again later.
              </Typography>
            );

          return !data?.resultData ? <TargetXP /> : <Activities level={data?.resultData} />;
        })()}
      </Box>
    </>
  );
}
