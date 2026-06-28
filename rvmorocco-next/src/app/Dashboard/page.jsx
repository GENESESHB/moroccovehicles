'use client';

import Dashboard from './Dashboard';
import withAuth from '../components/withAuth';

function DashboardPage() {
  return <Dashboard />;
}

export default withAuth(DashboardPage);
