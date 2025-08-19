import { Player } from '../models/player/Player';
import { SortDirection, SortField } from '../models/Sorting';
import comparePlayersForField from './comparePlayersForField';

const sortPlayers = (
  players: Player[],
  field: SortField,
  direction: SortDirection
): Player[] => {
  return [...players].sort((a, b) => comparePlayersForField(a, b, field, direction));
};

export default sortPlayers;


