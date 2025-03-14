// FootballField.tsx

import React from "react";
import fieldImage from "@/assets/field.jpg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Player {
  name: string;
  position: string;
  top: string; // e.g. "30%"
  left: string; // e.g. "50%"
}

interface FootballFieldProps {
  homeTeam: Player[];
  awayTeam: Player[];
  className?: string;
}

const FootballField: React.FC<FootballFieldProps> = ({
  homeTeam,
  awayTeam,
  className = "",
}) => {
  // Reusable function to render a single player marker
  const renderPlayer = (player: Player, index: number, isHome: boolean) => {
    // Home team in blue, away team in red (adjust as needed)
    const colorClass = isHome ? "bg-blue-500" : "bg-red-500";

    return (
      <div
        key={`${isHome ? "home" : "away"}-${index}`}
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: player.top, left: player.left }}
      >
        <Avatar className={`border-2 border-white ${colorClass}`}>
          <AvatarFallback className={`text-white text-xs ${colorClass}`}>
            {player.position}
          </AvatarFallback>
        </Avatar>
        <div className="mt-1 text-white text-xs text-center font-medium bg-black/50 px-1 rounded">
          {/* Display only first name or however you prefer */}
          {player.name.split(" ")[0]}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative w-full h-[600px] rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${fieldImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Render Home Team (top half) */}
      {homeTeam.map((player, index) => renderPlayer(player, index, true))}

      {/* Render Away Team (bottom half) */}
      {awayTeam.map((player, index) => renderPlayer(player, index, false))}
    </div>
  );
};

export default FootballField;
