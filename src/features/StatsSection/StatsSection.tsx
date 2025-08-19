import React, { useMemo } from 'react';
import StatCard from './components/StatCard/StatCard';
import { useLanguage } from '../../context/LanguageContext';
import { useLeaderboard } from '../../context/LeaderboardContext';
import computeTopStats from '../../functions/computeTopStats';
import formatInteger from '../../functions/formatInteger';
import formatPercentage from '../../functions/formatPercentage';
import styles from './StatsSection.module.scss';

const StatsSection: React.FC = () => {
    const { state } = useLeaderboard();
    const { t } = useLanguage();

    const topStats = useMemo(() => computeTopStats(state.players), [state]);

    const clutchMasterValue = useMemo(() => {
        if (!topStats.clutchMaster) return 'N/A';
        const stats = topStats.clutchMaster.stats;
        return (
            `${formatPercentage(stats["1v1 Win Rate"] * 100)} (${stats["Total 1v1 Wins"]}/${stats["Total 1v1 Count"]}) | ` +
            `${formatPercentage(stats["1v2 Win Rate"] * 100)} (${stats["Total 1v2 Wins"]}/${stats["Total 1v2 Count"]})`
        );
    }, [topStats]);

    const utilityDamageValue = useMemo(() => {
        return topStats.utilityDamage
            ? formatInteger(topStats.utilityDamage.stats['Total Utility Damage'])
            : 'N/A';
    }, [topStats]);

    const mostMatchesValue = useMemo(() => {
        return topStats.mostMatches
            ? formatInteger(topStats.mostMatches.stats.Matches)
            : 'N/A';
    }, [topStats]);


    return (
        <div className={styles.statsCards}>
            <StatCard
                loading={state.loading}
                title={t('stats.clutchMaster')}
                player={topStats.clutchMaster}
                value={clutchMasterValue}
                subtitle={`${t('stats.oneVoneWinRate')} / ${t('stats.oneVtwoWinRate')}`}
                icon="🏆"
            />
            <StatCard
                loading={state.loading}
                title={t('stats.utilityDamage')}
                player={topStats.utilityDamage}
                value={utilityDamageValue}
                subtitle={t('stats.totalUtilityDamage')}
                icon="💣"
            />
            <StatCard
                loading={state.loading}
                title={t('stats.mostMatches')}
                player={topStats.mostMatches}
                value={mostMatchesValue}
                subtitle={t('stats.matches')}
                icon="🎮"
            />
        </div>
    );
};

export default StatsSection;



