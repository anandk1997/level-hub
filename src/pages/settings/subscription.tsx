import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardActionArea,
  FormControlLabel,
  Radio,
  RadioGroup,
  Chip,
} from '@mui/material';

const plans = [
  {
    title: 'Basic',
    users: '0-10 Users',
    pricing: [
      { label: '$20 Billed Monthly' },
      {
        group: true,
        items: [
          { label: 'Save 15%', variant: 'outlined', color: 'primary' },
          { label: '$200 Billed Yearly' },
        ],
      },
    ],
  },
  {
    title: 'Premium',
    users: '10-50 Users',
    pricing: [{ label: '$200 Billed Monthly' }, { label: '$2000 Billed Yearly' }],
  },
  {
    title: 'Enterprise',
    users: '50-1k Users',
    pricing: [{ label: '$500 Billed Monthly' }, { label: '$5000 Billed Yearly' }],
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = React.useState('Premium');

  return (
    <Box className="p-4 flex flex-col items-center md:items-start w-full">
      <Typography variant="h4" gutterBottom>
        Subscription
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can change your subscription plan here.
      </Typography>

      {/* Current Subscription */}
      <Card sx={{ width: '100%', borderRadius: 2, mb: 3 }}>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Premium</Typography>
          <Typography variant="body2" color="text.secondary">
            5 Aug, 2024
          </Typography>
          <Chip label="Active" size="small" color="success" sx={{ mt: 0.5 }} />

          <Button variant="contained" color="error" sx={{ borderRadius: 4, textTransform: 'none' }}>
            Cancel
          </Button>
        </Box>
      </Card>

      <Divider sx={{ width: '100%', mb: 3 }} />

      <Typography variant="h5" gutterBottom sx={{ width: '100%' }}>
        Plans
      </Typography>

      <RadioGroup
        value={selectedPlan}
        onChange={(e) => setSelectedPlan(e.target.value)}
        sx={{ width: '100%' }}
      >
        {plans.map((plan) => {
          const isActive = selectedPlan === plan.title;

          return (
            <Card
              key={plan.title}
              sx={{
                mb: 2,
                borderRadius: 2,
                border: isActive ? `2px solid #09C0F0` : '1px solid #e0e0e0',
                backgroundColor: isActive ? '#09C0F01A' : 'background.paper',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {isActive && (
                <Chip
                  label="Active"
                  color="info"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: 16,
                    zIndex: 2,
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: '12px',
                    height: 24,
                    lineHeight: '24px',
                  }}
                />
              )}

              <CardActionArea
                onClick={() => setSelectedPlan(plan.title)}
                sx={{ p: 2, display: 'flex', alignItems: 'center' }}
              >
                <FormControlLabel value={plan.title} control={<Radio />} label="" sx={{ mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{plan.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plan.users}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  {plan.pricing.map((p, i) => {
                    if (p.group) {
                      return (
                        <Box
                          key={i}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          {p.items.map((item, j) =>
                            item.variant === 'outlined' ? (
                              <Chip
                                key={j}
                                label={item.label}
                                variant="filled"
                                color="info"
                                size="small"
                              />
                            ) : (
                              <Typography
                                key={j}
                                variant="body2"
                                color={
                                  item.label.startsWith('Save') ? 'success.main' : 'text.secondary'
                                }
                              >
                                {item.label}
                              </Typography>
                            )
                          )}
                        </Box>
                      );
                    }

                    return (
                      <Typography
                        key={i}
                        variant="body2"
                        color={p.label?.startsWith('Save') ? 'success.main' : 'text.secondary'}
                      >
                        {p.label}
                      </Typography>
                    );
                  })}
                </Box>
              </CardActionArea>
            </Card>
          );
        })}
      </RadioGroup>

      <Box sx={{ width: { xs: '100%', sm: '50%' }, mt: 3 }}>
        <Button
          variant="contained"
          color="info"
          fullWidth
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
