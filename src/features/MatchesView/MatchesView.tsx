import React, { useEffect, useState } from 'react';

import { Match } from '../../models/match/Match';
import { fetchHubMatches } from '../../services/faceitApi/functions/fetchHubMatches';
import { useLanguage } from '../../context/LanguageContext';
import Loader from '../../components/Loader/Loader';
import ViewHeader from '../../components/ViewHeader/ViewHeader';

import MatchListItem from './components/MatchListItem/MatchListItem';
import styles from './MatchesView.module.scss';

const MatchesView: React.FC = () => {
    const { t } = useLanguage();
    const [ongoing, setOngoing] = useState<Match[]>();
    const [finished, setFinished] = useState<Match[]>();
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const loadMatches = async () => {
            try {
                const [ongoingData, finishedData] = await Promise.all([
                    fetchHubMatches('ongoing', 20),
                    fetchHubMatches('past', 20),
                ]);
                if (!cancelled) {
                    setOngoing(ongoingData);
                    setFinished(finishedData);
                }
            } catch {
                if (!cancelled) setError(true);
            }
        };
        loadMatches();
        return () => { cancelled = true; };
    }, []);

    if (error) {
        return <p>{t('error')}</p>;
    }

    if (!ongoing || !finished) {
        return <Loader />;
    }

    return (
        <div className={styles.view}>
            <ViewHeader
                title={t('matchesView.title')}
                subtitle={t('matchesView.subtitle')}
                liveLabel={t('app.live')}
                liveCount={ongoing.length}
            />

            <section className={styles.section}>
                <h2 className={styles.heading}>{t('matchesView.ongoing')}</h2>
                {ongoing.length === 0 ? (
                    <p className={styles.empty}>{t('noData')}</p>
                ) : (
                    <div className={styles.list}>
                        {ongoing.map((match) => (
                            <MatchListItem match={match} live key={match.match_id} />
                        ))}
                    </div>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.heading}>{t('matchesView.finished')}</h2>
                {finished.length === 0 ? (
                    <p className={styles.empty}>{t('noData')}</p>
                ) : (
                    <div className={styles.list}>
                        {finished.map((match) => (
                            <MatchListItem match={match} key={match.match_id} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MatchesView;
