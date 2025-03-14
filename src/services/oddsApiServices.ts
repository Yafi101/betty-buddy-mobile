import axios from "axios";

export interface Match {
  id: string;
  league: string;
  status: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  homeScore: number;
  awayScore: number;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface FootballLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
}

export interface Outcome {
  name: string;
  price: number;
}

export async function fetchFixtureById(matchId: string): Promise<Match | null> {
  const apiKey = "7904d0190efbaff6f18095acb02d6db2"; // Replace with your key
  const baseUrl = "https://v3.football.api-sports.io/fixtures";
  const params = { id: matchId };
  const options = {
    method: "GET",
    url: baseUrl,
    params,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("44444444444444");
    console.log(response.data);
    const fixtureData = response.data.response;
    if (fixtureData && fixtureData.length > 0) {
      const fixture = fixtureData[0];
      const now = new Date();
      const fixtureTime = new Date(fixture.fixture.date);
      const match: Match = {
        id: fixture.fixture.id.toString(),
        league: fixture.league.name,
        status: fixtureTime > now ? "Upcoming" : "Live",
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        commenceTime: fixture.fixture.date,
        homeScore: fixture.goals.home ?? 0,
        awayScore: fixture.goals.away ?? 0,
        odds: {
          home: 0,
          draw: 0,
          away: 0,
        },
      };
      return match;
    }
    return null;
  } catch (error) {
    console.error("Error fetching fixture by id:", error);
    return null;
  }
}

// Fetch match odds for a given fixture id.
export async function fetchMatchOdds(matchId: string): Promise<Outcome[]> {
  const apiKey = "7904d0190efbaff6f18095acb02d6db2"; // Replace with your key
  const baseUrl = "https://v3.football.api-sports.io/odds";
  const params = {
    id: matchId,
    markets: "h2h", // Head-to-head odds
  };
  const options = {
    method: "GET",
    url: baseUrl,
    params,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    const oddsData = response.data.response;
    if (oddsData && oddsData.length > 0) {
      // Use the first bookmaker's odds for simplicity.
      const bookmaker = oddsData[0];
      const h2hMarket = bookmaker.markets.find((m: any) => m.key === "h2h");
      if (h2hMarket) {
        return h2hMarket.outcomes;
      }
    }
    return [];
  } catch (error) {
    console.error("Error fetching match odds:", error);
    return [];
  }
}

export async function fetchUpcomingFixtures(
  leagueId?: number
): Promise<Match[]> {
  // const apiKey = "efa836c6ec54cf778d997fa1ef5d0be1"; // YamlakFikru4
  const apiKey = "7904d0190efbaff6f18095acb02d6db2"; // YamlakF1
  const baseUrl = "https://v3.football.api-sports.io/fixtures";

  // Use a supported season (free plans only allow seasons from 2021 to 2023)
  const season = "2021"; // Adjust as needed

  // Set parameters:
  // - season: required by the API.
  // - status: "NS-PST-FT" (or whatever status you want for placeholder data).
  const params: any = {
    season,
    status: "NS-PST-FT",
  };
  if (leagueId) {
    params.league = leagueId;
  }
  console.log(params);

  const options = {
    method: "GET",
    url: baseUrl,
    params,
    qs: { live: "all" },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    // The API returns an object with a "response" array.
    const fixturesData = response.data.response;
    const now = new Date();
    // Map the API response to our Match interface.
    const matches: Match[] = fixturesData.map((fixture: any) => {
      const fixtureTime = new Date(fixture.fixture.date);
      return {
        id: fixture.fixture.id.toString(),
        league: fixture.league.name,
        status: fixtureTime > now ? "Upcoming" : "Live",
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        commenceTime: fixture.fixture.date,
        homeScore: fixture.goals.home ?? 0,
        awayScore: fixture.goals.away ?? 0,
        odds: {
          home: 0, // Odds not provided via this endpoint.
          draw: 0,
          away: 0,
        },
      };
    });

    // Remove the filter based on time so you always get data for design purposes.
    const sortedMatches = matches.sort(
      (a, b) =>
        new Date(a.commenceTime).getTime() - new Date(b.commenceTime).getTime()
    );
    return sortedMatches.slice(0, 10);
  } catch (error) {
    console.error("Error fetching upcoming fixtures:", error);
    return [];
  }
}

export interface FootballLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
}

export async function fetchFootballLeagues(): Promise<FootballLeague[]> {
  const options = {
    method: "GET",
    url: "https://v3.football.api-sports.io/leagues",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      // "x-rapidapi-key": "efa836c6ec54cf778d997fa1ef5d0be1", //yamlakfikru4
      "x-rapidapi-key": "7904d0190efbaff6f18095acb02d6db2", //yamlakf1
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    // The API returns a "response" array with league details.
    const leaguesData = response.data.response;
    const leagues: FootballLeague[] = leaguesData.map((item: any) => ({
      id: item.league.id,
      name: item.league.name,
      country: item.country.name,
      logo: item.league.logo, // Include the logo URL
    }));
    return leagues;
  } catch (error) {
    console.error("Error fetching football leagues:", error);
    return [];
  }
}
