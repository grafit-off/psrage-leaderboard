import { Player } from '../models/player/Player';

export interface StatLeaderboard {
  key: string;
  titleKey: string;
  unit: 'percentage' | 'integer' | 'decimal';
  entries: Array<{ player: Player; value: number }>;
}

const TOP_N = 5;
const MIN_MATCHES = 1;

const buildLeaderboard = (
  key: string,
  titleKey: string,
  unit: StatLeaderboard['unit'],
  qualifiedPlayers: Player[],
  getValue: (player: Player) => number,
): StatLeaderboard => {
  const entries = [...qualifiedPlayers]
    .map((player) => ({ player, value: getValue(player) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, TOP_N);

  return { key, titleKey, unit, entries };
};

// WHY: surfaces ranked mini-leaderboards beyond the 3 dashboard highlights, using
// PlayerStats fields the API already returns, mirroring computeTopStats' qualification rule.
const computeStatLeaderboards = (players: Player[]): StatLeaderboard[] => {
  const qualifiedPlayers = players.filter((player) => player.stats.Matches >= MIN_MATCHES);

  if (qualifiedPlayers.length === 0) {
    return [];
  }

  return [
    buildLeaderboard('entryRate', 'statsView.entryRate', 'percentage', qualifiedPlayers, (player) => player.stats['Entry Rate']),
    buildLeaderboard('mvps', 'statsView.mvps', 'integer', qualifiedPlayers, (player) => player.stats.MVPs),
    buildLeaderboard('flashSuccess', 'statsView.flashSuccess', 'percentage', qualifiedPlayers, (player) => player.stats['Flash Success Rate']),
    buildLeaderboard('headshotsPct', 'statsView.headshotsPct', 'percentage', qualifiedPlayers, (player) => player.stats['Average Headshots %']),
    buildLeaderboard('multiKills', 'statsView.multiKills', 'integer', qualifiedPlayers, (player) =>
      player.stats['Triple Kills'] + player.stats['Quadro Kills'] + player.stats['Penta Kills']),
  ];
};

export default computeStatLeaderboards;
