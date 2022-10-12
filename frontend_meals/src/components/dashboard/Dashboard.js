import React from 'react';
import UnlockAccess from '../../hoc/unlockAccess/UnlockAccess'
import AdminDashboard from '../adminDashboard/AdminDashboard'
import ClientDashboard from '../clientDashboard/ClientDashboard';



const Dashboard = (children) => (
  <div>
    <UnlockAccess roles={"client"}>
      <ClientDashboard />
    </UnlockAccess>
    <UnlockAccess roles={"chef"}>
        <AdminDashboard />
    </UnlockAccess>
  </div>
);

export default Dashboard;