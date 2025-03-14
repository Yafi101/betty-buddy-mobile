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
        ? "bg-[#FACD6A] text-white border-[#FACD6A]"
        : "bg-gray-300 border-accent/80 text-gray-800 hover:bg-accent/80"
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
  const [matches, setMatches] = useState<Match[]>([]);
  const [footballLeagues, setFootballLeagues] = useState<FootballLeague[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [selectedBets, setSelectedBets] = useState<
    { type: string; option: string }[]
  >([]);

  const handleSelectBet = (type: string, option: string) => {
    const existingBetIndex = selectedBets.findIndex((bet) => bet.type === type);
    if (existingBetIndex !== -1) {
      const newBets = [...selectedBets];
      newBets[existingBetIndex] = { type, option };
      setSelectedBets(newBets);
    } else {
      setSelectedBets([...selectedBets, { type, option }]);
    }
  };

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
        <h2 className="text-xl font-bold text-gray-900">
          {t("events.topEvents")}
        </h2>
        <button className="text-gray-500 font-semibold">
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
                ? "bg-[#FACD6A] text-gray-900 border-[#FACD6A]"
                : "bg-gray-300 border-[#FACD6A]/50 text-gray-900 hover:bg-[#FACD6A]"
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
            className="bg-white backdrop-blur-sm rounded-2xl p-3 cursor-pointer hover:bg-[#FACD6A]/70 transition-colors shadow-2xl"
            onClick={() => navigate(`/match/${match.id}`)}
          >
            <div className="flex justify-center items-center ">
              <span
                className={`text-xs text-gray-900  px-3 py-1.5 rounded-full ${getStatusBg(
                  match.status
                )}`}
              >
                {t(match.status)}
              </span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex-1 flex flex-col items-center ">
                <img
                  src={match.homeTeamImage}
                  alt={match.homeTeam}
                  className="w-7 h-7 object-contain"
                />
                <p className="font-semibold text-sm text-gray-900 text-center">
                  {match.homeTeam}
                </p>
              </div>

              <div className="flex items-center gap-3 mx-6">
                <span className="font-bold text-2xl text-gray-900">
                  {match.homeScore} : {match.awayScore}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2">
                <img
                  src={match.awayTeamImage}
                  alt={match.awayTeam}
                  className="w-7 h-7 object-contain"
                />
                <p className="font-semibold text-gray-900 text-center text-sm">
                  {match.awayTeam}
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                className="flex-1 py-2 text-sm font-medium bg-[#ECE8E5]  rounded-2xl hover:bg-gray-700 flex gap-5 item-center justify-center w-fit"
                onClick={() => handleSelectBet("Double Chance", "1X")}
              >
                <span className="text-gray-500">1X</span>
                <span className="font-medium">{match.odds.home}</span>
              </button>

              <button
                className="flex-1 py-2 text-sm font-medium bg-[#ECE8E5]  rounded-2xl hover:bg-gray-700 flex gap-5 item-center justify-center w-fit"
                onClick={() => handleSelectBet("Double Chance", "X")}
              >
                <span className="text-gray-500 ">X</span>{" "}
                <span className="font-medium">{match.odds.draw}</span>
              </button>

              <button
                className="flex-1 py-2 text-sm  bg-[#ECE8E5]  rounded-2xl hover:bg-gray-700 flex gap-5 item-center justify-center w-fit"
                onClick={() => handleSelectBet("Double Chance", "2X")}
              >
                <span className="text-gray-500 ">2X</span>{" "}
                <span className="font-medium">{match.odds.away}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
