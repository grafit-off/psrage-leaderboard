import React from 'react';
import { Match } from '../../../../models/match/Match';
import styles from './MatchCard.module.scss';
import { useLanguage } from '../../../../context/LanguageContext';
import { classNames } from '../../../../functions/classNames';

interface MatchCardProps {
    match: Match;
    live?: boolean;
}

const formatAgo = (finishedAt: number, t: (key: string) => string): string => {
    const hoursAgo = Math.max(0, Math.round((Date.now() / 1000 - finishedAt) / 3600));
    if (hoursAgo < 24) return `${hoursAgo}${t('match.hoursShort')} ${t('match.ago')}`;
    return `${Math.round(hoursAgo / 24)}${t('match.daysShort')} ${t('match.ago')}`;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, live }) => {
    const { t } = useLanguage();
    const team1 = match.teams.faction1;
    const team2 = match.teams.faction2;
    const result = match.detailed_results?.[0];
    const team1Score = result?.factions?.faction1?.score;
    const team2Score = result?.factions?.faction2?.score;
    const matchLink = match.faceit_url.replace(`{lang}`, 'en');
    const votingMap = match.voting?.map;
    const pick = votingMap?.pick?.[0];
    const map = votingMap?.entities?.find((m) => m.class_name === pick);
    const homeWins = (team1Score ?? 0) > (team2Score ?? 0);

    return (
        <article className={classNames(styles.matchCard, live && styles.live)}>
            <div className={styles.head}>
                {live ? (
                    <span className={styles.liveStatus}>
                        <i className={styles.liveDot} /> {t('match.live')}
                    </span>
                ) : (
                    <span>{t('match.final')} · {formatAgo(match.finished_at, t)}</span>
                )}
                <span className={styles.mapName}>{map?.name ?? t('match.cancelled')}</span>
            </div>

            <div className={styles.body}>
                <span className={styles.team}>{team1.name}</span>
                <span className={styles.score}>
                    <span className={homeWins ? styles.win : styles.loss}>{team1Score ?? '–'}</span>
                    <span className={styles.divider}>:</span>
                    <span className={!homeWins ? styles.win : styles.loss}>{team2Score ?? '–'}</span>
                </span>
                <span className={classNames(styles.team, styles.away)}>{team2.name}</span>
            </div>

            <div className={styles.footer}>{t('app.faceitHub')}</div>
            <a href={matchLink} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={`${team1.name} vs ${team2.name}`} />
        </article>
    );
};

export default MatchCard;
