import { Player } from './Player';

export interface LeaderboardData {
  players: Player[];
  loading: boolean;
  error: string | null;
}
