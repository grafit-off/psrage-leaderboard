import React from 'react';
import styles from './Matches.module.scss';
import OngoingMatches from './components/OngoingMatches/OngoingMatches';
import FinishedMatches from './components/FinishedMatches/FinishedMatches';

const Matches: React.FC = () => {
    return (
        <div className={styles.matches}>
            <OngoingMatches />
            <FinishedMatches />
        </div>
    );
};

export default Matches;



