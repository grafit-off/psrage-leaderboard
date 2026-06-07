import React, { useState } from 'react';
import { Match } from '../../../../models/match/Match';
import { useLanguage } from '../../../../context/LanguageContext';
import { classNames } from '../../../../functions/classNames';
import styles from './MatchListItem.module.scss';

interface MatchListItemProps {
  match: Match;
  live?: boolean;
}

const MatchListItem: React.FC<MatchListItemProps> = ({ match, live }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const team1 = match.teams.faction1;
  const team2 = match.teams.faction2;
  const votingMap = match.voting?.map;
  const pick = votingMap?.pick?.[0];
  const map = votingMap?.entities?.find((m) => m.class_name === pick);
  const matchLink = match.faceit_url.replace('{lang}', 'en');

  return (
    <article className={classNames(styles.item, live && styles.live)}>
      <button className={styles.summary} onClick={() => setExpanded((prev) => !prev)} aria-expanded={expanded}>
        <span className={styles.status}>
          {live ? (
            <span className={styles.liveStatus}><i className={styles.liveDot} /> {t('match.live')}</span>
          ) : (
            <span>{t('match.final')}</span>
          )}
        </span>
        <span className={styles.teams}>
          <span className={styles.teamName}>{team1.name}</span>
          <span className={styles.vs}>vs</span>
          <span className={styles.teamName}>{team2.name}</span>
        </span>
        <span className={styles.mapName}>{map?.name ?? t('match.cancelled')}</span>
        <span className={classNames(styles.chevron, expanded && styles.chevronOpen)}>▾</span>
      </button>

      {expanded && (
        <div className={styles.detail}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>{t('matchesView.mapPick')}</span>
            <span className={styles.detailValue}>{map?.name ?? t('match.cancelled')}</span>
          </div>

          {match.detailed_results?.length > 0 && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t('matchesView.score')}</span>
              <span className={styles.detailValue}>
                {match.detailed_results.map((result, index) => (
                  <span className={styles.scorePill} key={index}>
                    {result.factions.faction1.score} : {result.factions.faction2.score}
                  </span>
                ))}
              </span>
            </div>
          )}

          <div className={styles.rosters}>
            {[team1, team2].map((team) => (
              <div className={styles.roster} key={team.faction_id}>
                <span className={styles.rosterTeam}>{team.name}</span>
                <ul className={styles.rosterList}>
                  {team.roster.map((player) => (
                    <li key={player.player_id} className={styles.rosterPlayer}>
                      <span className={styles.rosterNick}>{player.nickname}</span>
                      <span className={styles.rosterLevel}>{t('matchesView.skillLevel')} {player.game_skill_level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <a href={matchLink} target="_blank" rel="noopener noreferrer" className={styles.faceitLink}>
            {t('app.faceitHub')} ↗
          </a>
        </div>
      )}
    </article>
  );
};

export default MatchListItem;
