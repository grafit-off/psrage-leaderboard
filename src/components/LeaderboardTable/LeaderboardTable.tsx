import React, { useState, useMemo } from 'react';
import { Player } from '../../models/Player';
import { SortField, SortDirection } from '../../models/Sorting';
import formatPercentage from '../../functions/formatPercentage';
import formatKDRatio from '../../functions/formatKDRatio';
import formatADR from '../../functions/formatADR';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LeaderboardTable.module.scss';
import filterQualifiedPlayers from '../../functions/filterQualifiedPlayers';
import sortPlayers from '../../functions/sortPlayers';
import computeNextSort from '../../functions/computeNextSort';
import getSortIconUtil from '../../functions/getSortIcon';
import formatInteger from '../../functions/formatInteger';

interface LeaderboardTableProps {
  players: Player[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ players }) => {
  const { t } = useLanguage();
  const [sortField, setSortField] = useState<SortField>('customCombatRating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredPlayers = useMemo(() => filterQualifiedPlayers(players), [players]);

  const sortedPlayers = useMemo(() => sortPlayers(filteredPlayers, sortField, sortDirection), [filteredPlayers, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    const next = computeNextSort(sortField, sortDirection, field);
    setSortField(next.sortField);
    setSortDirection(next.sortDirection);
  };

  const getSortIcon = (field: SortField) => getSortIconUtil(sortDirection);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('nickname')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'nickname' ? styles.activeSort : ''}`}>
              {t('stats.nickname')}  <span className={styles.sortIcon}>{getSortIcon('nickname')}</span>
            </th>
            <th onClick={() => handleSort('customCombatRating')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'customCombatRating' ? styles.activeSort : ''}`}>
              {t('stats.customCombatRating')}  <span className={styles.sortIcon}>{getSortIcon('customCombatRating')}</span>
            </th>
            <th onClick={() => handleSort('averageKDRatio')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'averageKDRatio' ? styles.activeSort : ''}`}>
              {t('stats.averageKDRatio')}  <span className={styles.sortIcon}>{getSortIcon('averageKDRatio')}</span>
            </th>
            <th onClick={() => handleSort('averageKills')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'averageKills' ? styles.activeSort : ''}`}>
              {t('stats.averageKills')}  <span className={styles.sortIcon}>{getSortIcon('averageKills')}</span>
            </th>
            <th onClick={() => handleSort('adr')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'adr' ? styles.activeSort : ''}`}>
              {t('stats.adr')}  <span className={styles.sortIcon}>{getSortIcon('adr')}</span>
            </th>
            <th onClick={() => handleSort('winRate')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'winRate' ? styles.activeSort : ''}`}>
              {t('stats.winRate')}  <span className={styles.sortIcon}>{getSortIcon('winRate')}</span>
            </th>
            <th onClick={() => handleSort('averageHeadshots')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'averageHeadshots' ? styles.activeSort : ''}`}>
              {t('stats.averageHeadshots')}  <span className={styles.sortIcon}>{getSortIcon('averageHeadshots')}</span>
            </th>
            <th onClick={() => handleSort('totalMatches')} className={`${styles.th} ${styles.sortableHeader} ${sortField === 'totalMatches' ? styles.activeSort : ''}`}>
              {t('stats.totalMatches')}  <span className={styles.sortIcon}>{getSortIcon('totalMatches')}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr
              key={player.player_id}
              className={`${styles.row} ${index === 0 ? styles.top1 : index === 1 ? styles.top2 : index === 2 ? styles.top3 : ''}`}
            >
              <td className={styles.playerNickname}>
                <a 
                  href={`https://www.faceit.com/en/players/${player.nickname}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.playerLink}
                >
                  {player.nickname}
                </a>
              </td>
              <td>{player.stats['Custom Combat Rating'].toFixed(2)}</td>
              <td>{formatKDRatio(player.stats['Average K/D Ratio'])}</td>
              <td>{player.stats['Average Kills'].toFixed(2)}</td>
              <td>{formatADR(player.stats.ADR)}</td>
              <td>{formatPercentage(player.stats['Win Rate %'])}</td>
              <td>{formatPercentage(player.stats['Average Headshots %'])}</td>
              <td>{formatInteger(player.stats['Total Matches'])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;


