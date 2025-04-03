import { HelmetTitle } from 'src/components/HelmetTitle';

import { Box } from '@mui/material';
import { TargetXP } from 'src/components/activities/TargetXp';
import { Activities } from 'src/components/activities';
import { useFetchLevelQuery } from 'src/slices/apis/app.api';
import { LineProgress } from 'src/components/lineProgress';

export default function ActivitiesPage() {
  const { data, isFetching, refetch } = useFetchLevelQuery({});

  if (isFetching) return <LineProgress />;
  return (
    <>
      <HelmetTitle title="Activities" />

      <Box sx={{ p: 5 }}>
        {!data?.resultData ? (
          <TargetXP refetchLevel={refetch} />
        ) : (
          <>
            <Activities />
          </>
        )}
      </Box>
    </>
  );
}
