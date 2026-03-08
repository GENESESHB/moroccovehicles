'use client';

import Dashboard from '../Dashboard/Dashboard';
import withAuth from '../components/withAuth';

function DashboardPage() {
  return <Dashboard />;
}

export default withAuth(DashboardPage);
