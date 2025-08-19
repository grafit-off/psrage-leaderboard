import React from 'react';
import { Match } from '../../../../models/match/Match';
import styles from './MatchCard.module.scss';
import { useLanguage } from '../../../../context/LanguageContext';

interface MatchCardProps {
    match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
    const { t } = useLanguage();
    const team1 = match.teams.faction1;
    const team2 = match.teams.faction2;
    const result = match.detailed_results?.[0];
    const team1Score = result?.factions?.faction1?.score;
    const team2Score = result?.factions?.faction2?.score;
    const matchLink = match.faceit_url.replace(`{lang}`, 'en');
    const votingMap = match.voting?.map;
    const pick = votingMap?.pick?.[0];
    const map = votingMap?.entities?.find((map) => map.class_name === pick);
    const isDraw = team1Score === team2Score;
    const placeholderImage = 'https://placehold.co/100x100/374151/9ca3af?text=NA';

    return (
        <article className={styles.matchCard}>
            <div className={styles.team}>
                <img
                    src={team1.avatar ? team1.avatar : placeholderImage}
                    alt={`${team1.name} logo`}
                    className={styles.teamAvatar}
                />
                <h3 className={styles.teamName}>
                    {team1.name}
                </h3>
            </div>

            <div className={styles.score}>
                <div className={styles.scoreContainer}>
                    <span
                        className={`${styles.scoreValue} ${(team1Score > team2Score) ? styles.scoreWinning : styles.scoreLosing} ${isDraw ? styles.draw : ''}`}
                    >
                        {team1Score ?? 'N'}
                    </span>
                    <span className={styles.vs}>vs</span>
                    <span className={`${styles.scoreValue} ${team2Score > team1Score ? styles.scoreWinning : styles.scoreLosing}  ${isDraw ? styles.draw : ''}`}>
                        {team2Score ?? 'A'}
                    </span>
                </div>
                {map?.name && <div >{map?.name ?? t('match.cancelled')}</div>}
            </div>

            <div className={styles.team}>
                <img
                    src={team2.avatar ? team2.avatar : placeholderImage} alt={`${team2.name} logo`}
                    className={styles.teamAvatar}
                />
                <h3 className={styles.teamName}>
                    {team2.name}
                </h3>
            </div>
            <a href={matchLink} className={styles.link} target='_blank'></a>
            <img src={map?.image_lg ? map?.image_lg : placeholderImage} className={styles.background} />
        </article>
    );
};

export default MatchCard;



