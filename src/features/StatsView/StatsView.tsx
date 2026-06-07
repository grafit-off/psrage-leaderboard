import React, { useMemo } from 'react';

import { useLeaderboard } from '../../context/LeaderboardContext';
import { useLanguage } from '../../context/LanguageContext';
import ViewHeader from '../../components/ViewHeader/ViewHeader';
import Loader from '../../components/Loader/Loader';
import computeStatLeaderboards, { StatLeaderboard } from '../../functions/computeStatLeaderboards';
import formatInteger from '../../functions/formatInteger';
import formatPercentage from '../../functions/formatPercentage';

import styles from './StatsView.module.scss';

const formatValue = (unit: StatLeaderboard['unit'], value: number): string => {
    if (unit === 'percentage') {
        return formatPercentage(value);
    }
    return formatInteger(value);
};

const StatsView: React.FC = () => {
    const { state } = useLeaderboard();
    const { t } = useLanguage();
    const { players, loading, error } = state;

    const leaderboards = useMemo(() => computeStatLeaderboards(players), [players]);

    if (error) {
        return <p>{t('error')}</p>;
    }

    if (loading || players.length === 0) {
        return <Loader />;
    }

    return (
        <div className={styles.view}>
            <ViewHeader
                title={t('statsView.title')}
                subtitle={t('statsView.subtitle')}
            />

            <div className={styles.grid}>
                {leaderboards.map((board) => (
                    <section className={styles.card} key={board.key}>
                        <h2 className={styles.title}>{t(board.titleKey)}</h2>
                        <ol className={styles.list}>
                            {board.entries.map((entry, index) => (
                                <li className={styles.row} key={entry.player.player_id}>
                                    <span className={styles.rank}>{index + 1}</span>
                                    <span className={styles.nickname}>{entry.player.nickname}</span>
                                    <span className={styles.value}>{formatValue(board.unit, entry.value)}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default StatsView;
