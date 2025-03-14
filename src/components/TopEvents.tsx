import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchedFootballLeagues, Fetchedfixtures } from "@/data/data";
import { FootballLeague, Match } from "@/types/football";

// A small component for displaying a league button with its logo and name.
interface LeagueButtonProps {
  league: FootballLeague;
  selected: boolean;
  onClick: () => void;
}

const LeagueButton = ({ league, selected, onClick }: LeagueButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 border rounded-full px-4 py-2 text-sm whitespace-nowrap min-w-fit ${
      selected
        ? "bg-primary text-white border-primary"
        : "bg-accent border-accent/50 text-gray-800 hover:bg-accent/80"
    }`}
  >
    <img
      src={league.logo}
      alt={league.name}
      className="w-5 h-5 object-contain flex-shrink-0"
    />
    {selected && <span className="truncate max-w-[150px]">{league.name}</span>}
  </button>
);

export const TopEvents = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // State for matches and leagues.
  const [matches, setMatches] = useState<Match[]>([]);
  const [footballLeagues, setFootballLeagues] = useState<FootballLeague[]>([]);
  // Store the currently selected league (null = "All")
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  // Toggle for displaying additional leagues.
  const [showMore, setShowMore] = useState(false);

  // Load leagues from local data on mount.
  useEffect(() => {
    setFootballLeagues(fetchedFootballLeagues);
  }, []);

  // Filter fixtures based on selected league.
  useEffect(() => {
    let filteredFixtures: Match[];

    if (selectedLeague) {
      const league = footballLeagues.find(
        (league) => league.name === selectedLeague
      );
      filteredFixtures = league
        ? Fetchedfixtures.filter((match) => match.league === league.name)
        : [];
    } else {
      // Pick one match from each league when "All" is selected
      const uniqueLeagues = new Set(
        Fetchedfixtures.map((match) => match.league)
      );
      filteredFixtures = Array.from(uniqueLeagues).map(
        (leagueName) =>
          Fetchedfixtures.find((match) => match.league === leagueName)!
      );
    }

    setMatches(filteredFixtures);
  }, [selectedLeague, footballLeagues]);

  // Define the featured leagues to display up front.
  const featuredLeagueNames = [
    "English PL", // Ensure this matches the league name in `data.ts`
    "La Liga",
    "Ligue 1",
    "Serie A",
    "Bundesliga",
    "Eredivisie",
    "UEFA Champions League",
  ];

  // Separate the leagues into featured and other.
  const featuredLeagues = footballLeagues.filter((league) =>
    featuredLeagueNames.includes(league.name)
  );
  const otherLeagues = footballLeagues.filter(
    (league) => !featuredLeagueNames.includes(league.name)
  );

  // Helper to get background color based on match status.
  const getStatusBg = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === "upcoming") return "bg-yellow-500";
    if (lower === "live") return "bg-red-500";
    return "bg-green-500"; // fallback
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-32 mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          {t("events.topEvents")}
        </h2>
        <button className="text-primary font-semibold">
          {t("events.seeAll")}
        </button>
      </div>

      {/* League filter section */}
      <div className="mb-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {/* "All" button */}
          <button
            onClick={() => setSelectedLeague(null)}
            className={`flex items-center px-6 py-3 border rounded-full text-sm whitespace-nowrap min-w-fit ${
              selectedLeague === null
                ? "bg-primary text-white border-primary"
                : "bg-accent/80 border-accent/50 text-gray-200 hover:bg-accent"
            }`}
          >
            <span>{t("All")}</span>
          </button>

          {/* Featured leagues */}
          {featuredLeagues.map((league) => (
            <LeagueButton
              key={league.id}
              league={league}
              selected={selectedLeague === league.name}
              onClick={() => setSelectedLeague(league.name)}
            />
          ))}

          {/* "See more" button */}
          {!showMore && otherLeagues.length > 0 && (
            <button
              onClick={() => setShowMore(true)}
              className="flex items-center px-6 py-3 border rounded-full text-sm whitespace-nowrap min-w-fit bg-accent/80 border-accent/50 text-gray-200 hover:bg-accent"
            >
              <span>{t("See more")}</span>
            </button>
          )}

          {/* Additional leagues */}
          {showMore &&
            otherLeagues.map((league) => (
              <LeagueButton
                key={league.id}
                league={league}
                selected={selectedLeague === league.name}
                onClick={() => setSelectedLeague(league.name)}
              />
            ))}
        </div>
      </div>

      {/* Fixture list */}
      <div className="space-y-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 cursor-pointer hover:bg-gray-800/70 transition-colors"
            onClick={() => navigate(`/match/${match.id}`)}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={
                    fetchedFootballLeagues.find((l) => l.name === match.league)
                      ?.logo
                  }
                  alt={match.league}
                  className="w-6 h-6 object-contain"
                />
                {selectedLeague && (
                  <span className="text-sm text-gray-400">{match.league}</span>
                )}
              </div>
              <span
                className={`text-xs text-white px-3 py-1.5 rounded-full ${getStatusBg(
                  match.status
                )}`}
              >
                {t(match.status)}
              </span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex-1 flex flex-col items-center gap-2">
                <img
                  src={match.homeTeamImage}
                  alt={match.homeTeam}
                  className="w-12 h-12 object-contain"
                />
                <p className="font-semibold text-white text-center">
                  {match.homeTeam}
                </p>
              </div>
              <div className="flex items-center gap-3 mx-6">
                <span className="font-bold text-2xl text-white">
                  {match.homeScore} : {match.awayScore}
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <img
                  src={match.awayTeamImage}
                  alt={match.awayTeam}
                  className="w-12 h-12 object-contain"
                />
                <p className="font-semibold text-white text-center">
                  {match.awayTeam}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
