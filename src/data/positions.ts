import { PlayerPosition } from "@/types/football";

export const homePositions: PlayerPosition[] = [
  { position: "GK", top: "90%", left: "50%" },
  { position: "RB", top: "78%", left: "90%" },
  { position: "CB", top: "80%", left: "60%" },
  { position: "CB", top: "80%", left: "40%" },
  { position: "LB", top: "78%", left: "10%" },
  { position: "RM", top: "70%", left: "70%" },
  { position: "CM", top: "67%", left: "50%" },
  { position: "LM", top: "70%", left: "30%" },
  { position: "RF", top: "56%", left: "90%" },
  { position: "CF", top: "55%", left: "50%" },
  { position: "LF", top: "56%", left: "10%" },
];

export const awayPositions: PlayerPosition[] = [
  { position: "GK", top: "10%", left: "50%" },
  { position: "RB", top: "28%", left: "90%" },
  { position: "CB", top: "20%", left: "60%" },
  { position: "CB", top: "20%", left: "40%" },
  { position: "LB", top: "28%", left: "10%" },
  { position: "RM", top: "35%", left: "70%" },
  { position: "CM", top: "32%", left: "50%" },
  { position: "LM", top: "35%", left: "30%" },
  { position: "RF", top: "46%", left: "90%" },
  { position: "CF", top: "45%", left: "50%" },
  { position: "LF", top: "46%", left: "10%" },
];

export function mapLineup(lineup: string[], positions: PlayerPosition[]) {
  return lineup.map((player, index) => ({
    name: player,
    position: positions[index].position,
    top: positions[index].top,
    left: positions[index].left,
  }));
}
