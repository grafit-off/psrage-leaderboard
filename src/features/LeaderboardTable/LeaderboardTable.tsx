import React, { useMemo, useState } from 'react';
import Skeleton from '../../components/Skeleton/Skeleton';
import { useLanguage } from '../../context/LanguageContext';
import { useLeaderboard } from '../../context/LeaderboardContext';
import { classNames } from '../../functions/classNames';
import computeNextSort from '../../functions/computeNextSort';
import { createNumberArray } from '../../functions/createNumberArray';
import filterQualifiedPlayers from '../../functions/filterQualifiedPlayers';
import formatADR from '../../functions/formatADR';
import formatInteger from '../../functions/formatInteger';
import formatKDRatio from '../../functions/formatKDRatio';
import formatPercentage from '../../functions/formatPercentage';
import sortPlayers from '../../functions/sortPlayers';
import { Player } from '../../models/player/Player';
import { SortDirection, SortField } from '../../models/Sorting';
import styles from './LeaderboardTable.module.scss';

const SKELETONS = createNumberArray(7);

interface MatchesFilterOption {
  minMatches: number;
  labelKey: string;
}

const MATCHES_FILTER_OPTIONS: MatchesFilterOption[] = [
  { minMatches: 1, labelKey: 'leaderboard.filterAll' },
  { minMatches: 5, labelKey: 'leaderboard.filterMin5' },
];

interface Column {
  field: SortField;
  labelKey: string;
  defaultDirection: SortDirection;
  align: 'left' | 'right';
  accent?: boolean;
  render: (player: Player) => React.ReactNode;
}

const COLUMNS: Column[] = [
  {
    field: 'customCombatRating',
    labelKey: 'stats.customCombatRating',
    defaultDirection: 'desc',
    align: 'right',
    render: (player) => player.stats['Custom Combat Rating'].toFixed(2),
  },
  {
    field: 'averageKDRatio',
    labelKey: 'stats.averageKDRatio',
    defaultDirection: 'desc',
    align: 'right',
    accent: true,
    render: (player) => formatKDRatio(player.stats['Average K/D Ratio']),
  },
  {
    field: 'averageKills',
    labelKey: 'stats.averageKills',
    defaultDirection: 'desc',
    align: 'right',
    render: (player) => player.stats['Average Kills'].toFixed(2),
  },
  {
    field: 'adr',
    labelKey: 'stats.adr',
    defaultDirection: 'desc',
    align: 'right',
    render: (player) => formatADR(player.stats.ADR),
  },
  {
    field: 'winRate',
    labelKey: 'stats.winRate',
    defaultDirection: 'desc',
    align: 'right',
    render: (player) => formatPercentage(player.stats['Win Rate %']),
  },
  {
    field: 'averageHeadshots',
    labelKey: 'stats.averageHeadshots',
    defaultDirection: 'desc',
    align: 'right',
    render: (player) => formatPercentage(player.stats['Average Headshots %']),
  },
  {
    field: 'totalMatches',
    labelKey: 'stats.totalMatches',
    defaultDirection: 'desc',
    align: 'right',
    render: (player) => formatInteger(player.stats['Total Matches']),
  },
];

interface LeaderboardTableProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ sortField, sortDirection, onSortChange }) => {
  const { state } = useLeaderboard();
  const { t } = useLanguage();
  const [minMatches, setMinMatches] = useState(MATCHES_FILTER_OPTIONS[0].minMatches);

  const players = useMemo(() => state.players, [state]);
  const qualifiedPlayers = useMemo(() => filterQualifiedPlayers(players), [players]);
  const filteredPlayers = useMemo(
    () => qualifiedPlayers.filter((player) => player.stats.Matches >= minMatches),
    [qualifiedPlayers, minMatches]
  );
  const sortedPlayers = useMemo(
    () => sortPlayers(filteredPlayers, sortField, sortDirection),
    [filteredPlayers, sortField, sortDirection]
  );

  const handleSort = (field: SortField, defaultDirection: SortDirection = 'desc') => {
    if (field === sortField) {
      const next = computeNextSort(sortField, sortDirection, field);
      onSortChange(next.sortField, next.sortDirection);
    } else {
      onSortChange(field, defaultDirection);
    }
  };

  const renderCaret = (field: SortField) => {
    if (sortField !== field) return <span className={styles.caret}>▾</span>;
    return <span className={styles.caret}>{sortDirection === 'asc' ? '▴' : '▾'}</span>;
  };

  const initials = (nickname: string) => nickname.slice(0, 2).toUpperCase();

  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <span className={styles.panelTitle}>{t('leaderboard.ranking')}</span>
        <div className={styles.headRight}>
          <div className={styles.filter} role="group">
            {MATCHES_FILTER_OPTIONS.map((option) => (
              <button
                key={option.minMatches}
                className={classNames(styles.filterButton, minMatches === option.minMatches && styles.filterButtonActive)}
                onClick={() => setMinMatches(option.minMatches)}
                aria-pressed={minMatches === option.minMatches}
              >
                {t(option.labelKey)}
              </button>
            ))}
          </div>
          <span className={styles.panelMeta}>
            {sortedPlayers.length} {t('leaderboard.operatives')} · <b>{t('leaderboard.live')}</b>
          </span>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.table}>
          <div className={styles.headerRow}>
            <div>
              <button
                className={classNames(styles.headerButton, sortField === 'nickname' && styles.headerButtonActive)}
                onClick={() => handleSort('nickname', 'asc')}
              >
                {t('stats.rank')}
                {renderCaret('nickname')}
              </button>
            </div>
            <div>
              <button
                className={classNames(styles.headerButton, sortField === 'nickname' && styles.headerButtonActive)}
                onClick={() => handleSort('nickname', 'asc')}
              >
                {t('stats.nickname')}
                {renderCaret('nickname')}
              </button>
            </div>
            {COLUMNS.map((column) => (
              <div className={styles.numCell} key={column.field}>
                <button
                  className={classNames(styles.headerButton, sortField === column.field && styles.headerButtonActive)}
                  onClick={() => handleSort(column.field, column.defaultDirection)}
                >
                  {renderCaret(column.field)}
                  {t(column.labelKey)}
                </button>
              </div>
            ))}
          </div>

          {state.loading ? (
            SKELETONS.map((skeleton) => (
              <div className={styles.row} key={skeleton}>
                <span className={styles.rank}><Skeleton lines={1} /></span>
                <span className={styles.player}><Skeleton lines={1} /></span>
                {COLUMNS.map((column) => (
                  <span className={styles.numCell} key={column.field}><Skeleton lines={1} /></span>
                ))}
              </div>
            ))
          ) : sortedPlayers.length === 0 ? (
            <div className={styles.noData}>{t('noData')}</div>
          ) : (
            sortedPlayers.map((player, index) => {
              const rank = index + 1;
              return (
                <div className={classNames(styles.row, rank === 1 && styles.rowTop1)} key={player.player_id}>
                  <span className={styles.rank}>{String(rank).padStart(2, '0')}</span>
                  <span className={styles.player}>
                    <span className={styles.avatar}>{initials(player.nickname)}</span>
                    <a
                      href={`https://www.faceit.com/en/players/${player.nickname}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.nickname}
                    >
                      {player.nickname}
                    </a>
                  </span>
                  {COLUMNS.map((column) => (
                    <span
                      className={classNames(styles.numCell, styles.numValue, column.accent && styles.accentValue)}
                      key={column.field}
                    >
                      {column.render(player)}
                    </span>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default LeaderboardTable;
