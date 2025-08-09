import React, { useMemo } from 'react';
import { Player } from '../../models/Player';
import formatPercentage from '../../functions/formatPercentage';
import formatInteger from '../../functions/formatInteger';
import { useLanguage } from '../../context/LanguageContext';
import StatCard from '../StatCard/StatCard';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';
import styles from './Dashboard.module.scss';
import computeTopStats from '../../functions/computeTopStats';

interface DashboardProps {
  players: Player[];
}

const Dashboard: React.FC<DashboardProps> = ({ players }) => {
  const { t } = useLanguage();

  const topStats = useMemo(() => computeTopStats(players), [players]);

  let clutchMasterValue: string;
  if (topStats.clutchMaster) {
    const stats = topStats.clutchMaster.stats;

    clutchMasterValue =
      `${formatPercentage(stats["1v1 Win Rate"] * 100)} (${stats["Total 1v1 Wins"]}/${stats["Total 1v1 Count"]}) | ` +
      `${formatPercentage(stats["1v2 Win Rate"] * 100)} (${stats["Total 1v2 Wins"]}/${stats["Total 1v2 Count"]})`;
  } else {
    clutchMasterValue = 'N/A';
  }

  let utilityDamageValue: string;
  if (topStats.utilityDamage) {
    utilityDamageValue = formatInteger(topStats.utilityDamage.stats['Total Utility Damage']);
  } else {
    utilityDamageValue = 'N/A';
  }

  let mostMatchesValue: string;
  if (topStats.mostMatches) {
    mostMatchesValue = formatInteger(topStats.mostMatches.stats.Matches);
  } else {
    mostMatchesValue = 'N/A';
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsCards}>
        <StatCard
          title={t('stats.clutchMaster')}
          player={topStats.clutchMaster}
          value={clutchMasterValue}
          subtitle={`${t('stats.oneVoneWinRate')} / ${t('stats.oneVtwoWinRate')}`}
          icon="🏆"
        />
        <StatCard
          title={t('stats.utilityDamage')}
          player={topStats.utilityDamage}
          value={utilityDamageValue}
          subtitle={t('stats.totalUtilityDamage')}
          icon="💣"
        />
        <StatCard
          title={t('stats.mostMatches')}
          player={topStats.mostMatches}
          value={mostMatchesValue}
          subtitle={t('stats.matches')}
          icon="🎮"
        />
      </div>

      <div className={styles.leaderboardSection}>
        <h2 className={styles.sectionTitle}>{t('app.title')}</h2>
        <LeaderboardTable players={players} />
      </div>
    </div>
  );
};

export default Dashboard;



