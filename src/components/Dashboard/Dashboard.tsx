import React, { useEffect, useState } from 'react';
import ViewHeader from '../ViewHeader/ViewHeader';
import LeaderboardTable from '../../features/LeaderboardTable/LeaderboardTable';
import StatsSection from '../../features/StatsSection/StatsSection';
import Matches from '../../features/Matches/Matches';
import { useLanguage } from '../../context/LanguageContext';
import { fetchHubMatches } from '../../services/faceitApi/functions/fetchHubMatches';
import { SortDirection, SortField } from '../../models/Sorting';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [liveCount, setLiveCount] = useState(0);
  const [sortField, setSortField] = useState<SortField>('customCombatRating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    let cancelled = false;

    const loadOngoingCount = async () => {
      try {
        const matches = await fetchHubMatches('ongoing', 20);
        if (!cancelled) setLiveCount(matches.length);
      } catch {
        if (!cancelled) setLiveCount(0);
      }
    };

    loadOngoingCount();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className={styles.dashboard}>
      <ViewHeader
        title={t('nav.leaderboard')}
        subtitle={<>{t('app.subtitle')} <b>{t(`stats.${sortField}`)}</b></>}
        liveLabel={t('app.live')}
        liveCount={liveCount}
      />
      <StatsSection />
      <LeaderboardTable
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={(field, direction) => {
          setSortField(field);
          setSortDirection(direction);
        }}
      />
      <Matches />
    </div>
  );
};

export default Dashboard;
