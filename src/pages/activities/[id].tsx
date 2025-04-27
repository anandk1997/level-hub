import { useParams } from 'react-router-dom';
import { useFetchActivityQuery } from 'src/slices/apis/app.api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { VideoPreviewDialog } from 'src/components/activities/_dialogs/VideoPreview';
import { LineProgress } from 'src/components/lineProgress';

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useFetchActivityQuery({ id: id! });

  const [openVideo, setOpenVideo] = useState(false);

  if (isLoading) return <LineProgress />;
  if (error || !data?.resultData?.activity) return <Typography>Error loading activity</Typography>;

  const activity = data?.resultData?.activity;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Details */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader title={activity?.title} subheader={`XP: ${activity?.xp}`} />
            <CardContent>
              <Typography variant="body1" gutterBottom>
                {activity?.description || 'No description provided.'}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {`Start: ${new Date(activity?.startDate).toLocaleDateString()}`}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {`End:   ${new Date(activity?.endDate).toLocaleDateString()}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {activity?.isRecurring ? 'Recurring activity' : 'One‑time activity'}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Assigned Days
              </Typography>
              {activity?.assignedDays?.length ? (
                <List dense>
                  {activity?.assignedDays?.map((day: any) => <ListItem key={day}>{day}</ListItem>)}
                </List>
              ) : (
                <Typography variant="body2">None</Typography>
              )}
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>

        {/* Video & History */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="outlined"
            disabled={!activity?.videoLink}
            onClick={() => setOpenVideo(true)}
          >
            Preview Video
          </Button>
          <VideoPreviewDialog
            open={openVideo}
            setOpen={() => setOpenVideo(false)}
            link={activity?.videoLink || ''}
          />

          <Typography variant="h6" sx={{ mt: 4 }}>
            Approval History
          </Typography>
          <List>
            {activity?.activityHistory?.length ? (
              activity?.activityHistory?.map((h: any) => (
                <ListItem key={h.id}>
                  <Typography variant="body2">
                    {`${new Date(h.approvalDate).toLocaleString()} — approved by ${h.approvedByName}`}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography variant="body2">No approvals yet.</Typography>
              </ListItem>
            )}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
