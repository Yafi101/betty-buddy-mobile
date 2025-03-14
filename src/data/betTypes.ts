import { BetType } from "@/types/football";

export const betTypes: BetType[] = [
  {
    name: "Over/Under",
    options: ["Over 2.5 Goals", "Under 2.5 Goals"],
  },
  {
    name: "Both Teams to Score",
    options: ["Yes – Both teams score", "No – Not both teams score"],
  },
  {
    name: "Half-Time Result",
    options: ["Home Win at HT", "Draw at HT", "Away Win at HT"],
  },
  {
    name: "Double Chance",
    options: ["Home or Draw", "Away or Draw", "Home or Away"],
  },
  {
    name: "Correct Score",
    options: [
      "1-0 Scoreline",
      "2-0 Scoreline",
      "2-1 Scoreline",
      "Other Scoreline",
    ],
  },
  {
    name: "First Goal",
    options: [
      "Home Team Scores First",
      "Away Team Scores First",
      "No Goal Scored",
    ],
  },
];
