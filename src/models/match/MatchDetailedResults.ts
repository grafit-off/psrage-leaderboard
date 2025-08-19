export interface MatchDetailedResult {
    asc_score: boolean;
    winner: string;
    factions: {
      faction1: {
        score: number;
      };
      faction2: {
        score: number;
      };
    };
  }