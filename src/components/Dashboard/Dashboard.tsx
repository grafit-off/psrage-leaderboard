import React from 'react';
import LeaderboardTable from '../../features/LeaderboardTable/LeaderboardTable';
import StatsSection from '../../features/StatsSection/StatsSection';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <StatsSection />
      <LeaderboardTable />
    </div>
  );
};

export default Dashboard;
