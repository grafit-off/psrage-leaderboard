import React from 'react';

import { useLeaderboard } from '../../context/LeaderboardContext';
import { useLanguage } from '../../context/LanguageContext';
import ViewHeader from '../../components/ViewHeader/ViewHeader';
import Loader from '../../components/Loader/Loader';
import formatADR from '../../functions/formatADR';
import formatInteger from '../../functions/formatInteger';
import formatPercentage from '../../functions/formatPercentage';
import formatKDRatio from '../../functions/formatKDRatio';

import styles from './PlayersView.module.scss';

const PlayersView: React.FC = () => {
    const { state } = useLeaderboard();
    const { t } = useLanguage();
    const { players, loading, error } = state;

    if (error) {
        return <p>{t('error')}</p>;
    }

    if (loading || players.length === 0) {
        return <Loader />;
    }

    return (
        <div className={styles.view}>
            <ViewHeader
                title={t('playersView.title')}
                subtitle={<>{t('playersView.subtitle')} <b>{players.length} {t('leaderboard.operatives')}</b></>}
            />

            <div className={styles.grid}>
                {players.map((player) => (
                    <article className={styles.card} key={player.player_id}>
                        <div className={styles.head}>
                            <span className={styles.avatar}>{player.nickname.slice(0, 2).toUpperCase()}</span>
                            <div>
                                <h3 className={styles.nickname}>{player.nickname}</h3>
                                <span className={styles.rating}>{t('playersView.rating')} · {formatKDRatio(player.stats['Custom Combat Rating'])}</span>
                            </div>
                        </div>

                        <dl className={styles.stats}>
                            <div className={styles.stat}>
                                <dt>{t('stats.totalMatches')}</dt>
                                <dd>{formatInteger(player.stats.Matches)}</dd>
                            </div>
                            <div className={styles.stat}>
                                <dt>{t('stats.winRate')}</dt>
                                <dd>{formatPercentage(player.stats['Win Rate %'])}</dd>
                            </div>
                            <div className={styles.stat}>
                                <dt>{t('stats.adr')}</dt>
                                <dd>{formatADR(player.stats.ADR)}</dd>
                            </div>
                            <div className={styles.stat}>
                                <dt>{t('stats.averageKDRatio')}</dt>
                                <dd>{formatKDRatio(player.stats['K/D Ratio'])}</dd>
                            </div>
                            <div className={styles.stat}>
                                <dt>{t('stats.averageHeadshots')}</dt>
                                <dd>{formatPercentage(player.stats['Average Headshots %'])}</dd>
                            </div>
                        </dl>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default PlayersView;
