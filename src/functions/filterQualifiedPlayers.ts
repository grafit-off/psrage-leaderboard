import { Player } from '../models/Player';

const filterQualifiedPlayers = (players: Player[]): Player[] => {
  return players.filter(player => player.stats.Matches > 3);
};

export default filterQualifiedPlayers;


