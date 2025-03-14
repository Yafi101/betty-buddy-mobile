import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Fetchedfixtures } from "@/data/data";
import FootballField from "@/components/FootballField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { leagueStandings } from "@/data/leagueStandings";
import { pastFixtures } from "@/data/pastFixtures";
import { placedBets } from "@/data/placedBets";
import { useToast } from "@/hooks/use-toast";

const MatchDetails = () => {
  const [activeTab, setActiveTab] = useState<"bets" | "lineup" | "statistics">(
    "bets"
  );
  const [selectedBets, setSelectedBets] = useState<
    { type: string; option: string }[]
  >([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [match, setMatch] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const matchId = parseInt(id, 10);
      const selectedMatch = Fetchedfixtures.find(
        (fixture) => fixture.id === matchId
      );
      setMatch(selectedMatch || null);
    }
  }, [id]);

  if (!match) {
    return <div className="p-4">{t("loadingMatchDetails")}</div>;
  }

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

  const handleConfirmBet = () => {
    if (!match) return;

    const newBet = {
      id: Math.random().toString(36).substr(2, 9),
      matchId: match.id,
      match,
      selectedBets,
      possibleWin: 100, // This would normally be calculated based on odds
      amount: 10, // This would normally be input by the user
      timestamp: new Date().toISOString(),
    };

    placedBets.push(newBet);
    toast({
      title: "Bet placed successfully!",
      description: "You can view your bets in the betting history.",
    });
    setIsConfirmDialogOpen(false);
    navigate("/");
  };

  const isOptionSelected = (type: string, option: string) => {
    return selectedBets.some(
      (bet) => bet.type === type && bet.option === option
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-24 pt-5">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-3 flex items-center gap-4 fixed top-0 w-full z-10">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-gray-700 rounded-full p-2 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <span className="font-semibold text-white">
          {t("matchDetails.title")}
        </span>
      </div>

      {/* Main content */}
      <div className="pt-16 px-4 pb-32">
        {/* Game overview */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 flex flex-col items-center gap-3">
              <img
                src={match.homeTeamImage}
                alt={match.homeTeam}
                className="w-16 h-16 object-contain"
              />
              <p className="font-bold text-lg text-white text-center">
                {match.homeTeam}
              </p>
            </div>
            <div className="text-center px-4">
              <p className="font-bold text-2xl text-white">
                {match.homeScore} : {match.awayScore}
              </p>
              <p className="text-sm text-primary">
                {match.status === "Live" ? "LIVE" : "FT"}
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-3">
              <img
                src={match.awayTeamImage}
                alt={match.awayTeam}
                className="w-16 h-16 object-contain"
              />
              <p className="font-bold text-lg text-white text-center">
                {match.awayTeam}
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400">
            {match.league} - {new Date(match.commenceTime).toLocaleString()}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-row gap-2 mb-6">
          {["bets", "lineup", "statistics"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "secondary"}
              className={`
                flex-1 py-4 text-base font-medium rounded-xl
                ${
                  activeTab === tab
                    ? "bg-primary/80 hover:bg-primary/90 text-white shadow-lg"
                    : "bg-gray-600/50 hover:bg-gray-500/50 text-gray-100"
                }
                transition-all duration-200 ease-in-out
              `}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {t(`matchDetails.${tab}`)}
            </Button>
          ))}
        </div>

        {/* Bets Tab */}
        {activeTab === "bets" && (
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Match Winner Section */}
              <AccordionItem value="match-winner" className="border-none">
                <AccordionTrigger className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl text-white hover:no-underline">
                  <span className="font-semibold">
                    {t("matchDetails.matchWinner")}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      variant={
                        isOptionSelected("Match Winner", "Home")
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleSelectBet("Match Winner", "Home")}
                      className={`w-full py-6 text-base font-medium rounded-xl
                        ${
                          isOptionSelected("Match Winner", "Home")
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 text-white"
                        } transition-all duration-200`}
                    >
                      Home {match.odds.home}
                    </Button>
                    <Button
                      variant={
                        isOptionSelected("Match Winner", "Draw")
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleSelectBet("Match Winner", "Draw")}
                      className={`w-full py-6 text-base font-medium rounded-xl
                        ${
                          isOptionSelected("Match Winner", "Draw")
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 text-white"
                        } transition-all duration-200`}
                    >
                      Draw {match.odds.draw}
                    </Button>
                    <Button
                      variant={
                        isOptionSelected("Match Winner", "Away")
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleSelectBet("Match Winner", "Away")}
                      className={`w-full py-6 text-base font-medium rounded-xl
                        ${
                          isOptionSelected("Match Winner", "Away")
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 text-white"
                        } transition-all duration-200`}
                    >
                      Away {match.odds.away}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Other Bet Types */}
              {match.betTypes?.map((betType: any) => (
                <AccordionItem
                  key={betType.name}
                  value={betType.name}
                  className="border-none"
                >
                  <AccordionTrigger className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl text-white hover:no-underline">
                    <span className="font-semibold">{betType.name}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {betType.options.map((option: string) => (
                        <Button
                          key={option}
                          variant={
                            isOptionSelected(betType.name, option)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => handleSelectBet(betType.name, option)}
                          className={`w-full py-6 text-base font-medium rounded-xl
                            ${
                              isOptionSelected(betType.name, option)
                                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 text-white"
                            } transition-all duration-200`}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Lineups Tab */}
        {activeTab === "lineup" && (
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="font-semibold mb-4 text-white">
              {t("matchDetails.lineup")}
            </h3>
            {match.predictedLineupPositions ? (
              <div className="space-y-6">
                <FootballField
                  homeTeam={match.predictedLineupPositions.home}
                  awayTeam={match.predictedLineupPositions.away}
                  className="mb-6"
                />
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      {match.homeTeam}
                    </h4>
                    <ul className="space-y-2">
                      {match.predictedLineupPositions.home.map(
                        (player: any) => (
                          <li
                            key={player.name}
                            className="text-sm text-gray-300"
                          >
                            <span className="font-medium text-primary">
                              {player.position}:
                            </span>{" "}
                            {player.name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      {match.awayTeam}
                    </h4>
                    <ul className="space-y-2">
                      {match.predictedLineupPositions.away.map(
                        (player: any) => (
                          <li
                            key={player.name}
                            className="text-sm text-gray-300"
                          >
                            <span className="font-medium text-primary">
                              {player.position}:
                            </span>{" "}
                            {player.name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-white">{t("noLineupAvailable")}</div>
            )}
          </div>
        )}

        {/* Game Statistics Tab */}
        {activeTab === "statistics" && (
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="font-semibold mb-4 text-white">
              {t("matchDetails.statistics")}
            </h3>

            {/* League Standings Table */}
            <div className="mb-8">
              <h4 className="font-semibold text-white mb-2">
                League Standings ({match.league})
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Pos</th>
                      <th className="px-4 py-2">Team</th>
                      <th className="px-4 py-2">P</th>
                      <th className="px-4 py-2">W</th>
                      <th className="px-4 py-2">D</th>
                      <th className="px-4 py-2">L</th>
                      <th className="px-4 py-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueStandings[match.league]?.map((team) => (
                      <tr key={team.team} className="border-t border-gray-700">
                        <td className="px-4 py-2">{team.position}</td>
                        <td className="px-4 py-2">{team.team}</td>
                        <td className="px-4 py-2">{team.played}</td>
                        <td className="px-4 py-2">{team.win}</td>
                        <td className="px-4 py-2">{team.draw}</td>
                        <td className="px-4 py-2">{team.loss}</td>
                        <td className="px-4 py-2">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Past Fixtures Table */}
            <div>
              <h4 className="font-semibold text-white mb-2">Past Fixtures</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Home</th>
                      <th className="px-4 py-2">Score</th>
                      <th className="px-4 py-2">Away</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastFixtures
                      .filter(
                        (fixture) =>
                          (fixture.homeTeam === match.homeTeam &&
                            fixture.awayTeam === match.awayTeam) ||
                          (fixture.homeTeam === match.awayTeam &&
                            fixture.awayTeam === match.homeTeam)
                      )
                      .map((fixture) => (
                        <tr
                          key={fixture.id}
                          className="border-t border-gray-700"
                        >
                          <td className="px-4 py-2">
                            {new Date(fixture.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">{fixture.homeTeam}</td>
                          <td className="px-4 py-2">{fixture.score}</td>
                          <td className="px-4 py-2">{fixture.awayTeam}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white">
          <Wallet className="w-5 h-5 text-primary" />
          <span className="font-medium">$500.00</span>
        </div>
        <Button
          className="flex-1 py-6 text-lg font-semibold"
          onClick={() => setIsConfirmDialogOpen(true)}
          disabled={selectedBets.length === 0}
        >
          Place Bet ({selectedBets.length})
        </Button>
      </div>

      {/* Bet confirmation dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirm Your Bet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-400">Selected Bets</h4>
              {selectedBets.map((bet, index) => (
                <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-medium">{bet.type}</p>
                  <p className="text-sm text-gray-300">{bet.option}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-2 border-t border-gray-700">
              <span>Possible Win</span>
              <span className="font-medium text-primary">$100.00</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-700">
              <span>Wallet Balance</span>
              <span className="font-medium">$500.00</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsConfirmDialogOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmBet} className="w-full">
              Confirm Bet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchDetails;
