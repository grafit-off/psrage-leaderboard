import React, { useEffect, useState } from 'react';
import styles from './OngoingMatches.module.scss';
import { Match } from '../../../../models/match/Match';
import { fetchHubMatches } from '../../../../services/faceitApi/functions/fetchHubMatches';
import Loader from '../../../../components/Loader/Loader';
import MatchCard from '../MatchCard/MatchCard';
import { useLanguage } from '../../../../context/LanguageContext';

const OngoingMatches: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const matchesData = await fetchHubMatches('ongoing', 2);
                setMatches(matchesData);
                setLoading(false);
            } catch (error) {
                setError(true)
            }
        };

        fetchMatches();
    }, []);

    if(error) {
        return <p> Unexpected error occur, please try page refresh or reach to the owner </p>
    }

    if(loading || !matches) {
        return <Loader/>
    }

    if(!matches.length) {
        return <></>;
    }

    return (
        <div className={styles.matches}>
            <h2 className={styles.heading}>{t('match.ongoingMatches')}</h2>
            {matches.map((match) => (
                <div className={styles.match} key={match.match_id}>
                    <MatchCard  match={match}/>
                </div>
            ))}
        </div>
    );
};

export default OngoingMatches;



