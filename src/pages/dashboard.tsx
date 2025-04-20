import { HelmetTitle } from 'src/components/HelmetTitle';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

export default function DashboardPage() {
  return (
    <>
      <HelmetTitle
        title="Dashboard"
        metaData={{
          description:
            'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
          keywords: 'react,material,kit,application,dashboard,admin,template',
        }}
      />

      <OverviewAnalyticsView />
    </>
  );
}
