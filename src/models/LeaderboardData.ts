import { Player } from './player/Player';

export interface LeaderboardData {
  players: Player[];
  loading: boolean;
  error: string | null;
}
