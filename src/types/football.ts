export interface FootballLeague {
  id: number;
  name: string;
  logo: string;
}

export interface BetType {
  name: string;
  options: string[];
}

export interface PlayerPosition {
  position: string;
  top: string;
  left: string;
}

export interface Player {
  name: string;
  position: string;
  top: string;
  left: string;
}

export interface TeamLineup {
  home: Player[];
  away: Player[];
}

export interface Match {
  id: number;
  league: string;
  homeTeam: string;
  homeTeamImage: string;
  awayTeam: string;
  awayTeamImage: string;
  status: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  betTypes: BetType[];
  predictedLineupPositions: TeamLineup;
  homeScore?: number;
  awayScore?: number;
}

// Example of LeagueStanding type
export interface LeagueStanding {
  position: number;
  team: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  points: number;
}

// Example of PastFixture type
export interface PastFixture {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  score: string;
}

