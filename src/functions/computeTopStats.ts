import { Player } from '../models/Player';

export interface TopStatsResult {
  clutchMaster: Player | null;
  utilityDamage: Player | null;
  mostMatches: Player | null;
}

const computeTopStats = (players: Player[]): TopStatsResult => {
  if (players.length === 0) {
    return { clutchMaster: null, utilityDamage: null, mostMatches: null };
  }

  const qualifiedPlayers = players.filter(player => player.stats.Matches > 5);

  if (qualifiedPlayers.length === 0) {
    return { clutchMaster: null, utilityDamage: null, mostMatches: null };
  }

  const clutchMaster = qualifiedPlayers.reduce((best, current) => {
    const clutchScore = (player: typeof qualifiedPlayers[number]) => {
      const oneVoneRate = player.stats["1v1 Win Rate"] || 0;
      const oneVtwoRate = player.stats["1v2 Win Rate"] || 0;
      const oneVoneCount = player.stats["Total 1v1 Count"] || 0;
      const oneVtwoCount = player.stats["Total 1v2 Count"] || 0;
  
      const oneVoneWins = player.stats["Total 1v1 Wins"] || 0;
      const oneVtwoWins = player.stats["Total 1v2 Wins"] || 0;
  
      const weightedRate = (oneVoneRate * oneVoneCount + oneVtwoRate * oneVtwoCount * 2) /
                           (oneVoneCount + oneVtwoCount * 2 || 1);
  
      const totalWinsBonus = (oneVoneWins + oneVtwoWins * 2) * 0.1;
  
      return weightedRate + totalWinsBonus;
    };
  
    return clutchScore(current) > clutchScore(best) ? current : best;
  });

  const utilityDamage = qualifiedPlayers.reduce((best, current) => {
    const bestDamage = best.stats['Total Utility Damage'];
    const currentDamage = current.stats['Total Utility Damage'];
    if (currentDamage > bestDamage) {
      return current;
    } else {
      return best;
    }
  });

  const mostMatches = qualifiedPlayers.reduce((best, current) => {
    const bestMatches = best.stats.Matches;
    const currentMatches = current.stats.Matches;
    if (currentMatches > bestMatches) {
      return current;
    } else {
      return best;
    }
  });

  return { clutchMaster, utilityDamage, mostMatches };
};

export default computeTopStats;


