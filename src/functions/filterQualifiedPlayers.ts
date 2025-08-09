import { Player } from '../models/Player';

const filterQualifiedPlayers = (players: Player[]): Player[] => {
  return players.filter(player => player.stats.Matches > 4);
};

export default filterQualifiedPlayers;


