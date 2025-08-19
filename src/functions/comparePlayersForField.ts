import { Player } from '../models/player/Player';
import { SortDirection, SortField } from '../models/Sorting';

const comparePlayersForField = (
  a: Player,
  b: Player,
  field: SortField,
  direction: SortDirection
): number => {
  if (field === 'nickname') {
    const cmp = a.nickname.localeCompare(b.nickname);
    return direction === 'asc' ? cmp : -cmp;
  }

  let aValue: number;
  let bValue: number;

  switch (field) {
    case 'averageKDRatio':
      aValue = a.stats['Average K/D Ratio'];
      bValue = b.stats['Average K/D Ratio'];
      break;
    case 'averageKills':
      aValue = a.stats['Average Kills'];
      bValue = b.stats['Average Kills'];
      break;
    case 'adr':
      aValue = a.stats.ADR;
      bValue = b.stats.ADR;
      break;
    case 'winRate':
      aValue = a.stats['Win Rate %'];
      bValue = b.stats['Win Rate %'];
      break;
    case 'averageHeadshots':
      aValue = a.stats['Average Headshots %'];
      bValue = b.stats['Average Headshots %'];
      break;
    case 'totalMatches':
      aValue = a.stats['Total Matches'];
      bValue = b.stats['Total Matches'];
      break;
    case 'customCombatRating':
      aValue = a.stats['Custom Combat Rating'];
      bValue = b.stats['Custom Combat Rating'];
      break;
    default:
      return 0;
  }

  return direction === 'asc' ? aValue - bValue : bValue - aValue;
};

export default comparePlayersForField;


