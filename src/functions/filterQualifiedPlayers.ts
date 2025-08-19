import { Player } from '../models/player/Player';

const filterQualifiedPlayers = (players: Player[]): Player[] => {
  return players.filter(player => player.stats.Matches > 4);
};

export default filterQualifiedPlayers;
