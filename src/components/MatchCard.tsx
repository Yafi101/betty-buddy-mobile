
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface MatchCardProps {
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  time: string;
  date: string;
  league: string;
  isLive?: boolean;
  onClick?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  teamA,
  teamB,
  scoreA,
  scoreB,
  time,
  date,
  league,
  isLive = false,
  onClick
}) => {
  const showScores = scoreA !== undefined && scoreB !== undefined;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full cursor-pointer"
    >
      <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <Badge variant="outline" className="bg-background/50 text-xs font-normal">
              {league}
            </Badge>
            <div className="flex items-center gap-2">
              {isLive && (
                <Badge variant="secondary" className="bg-destructive/10 text-destructive text-xs animate-pulse-slow">
                  LIVE
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">{isLive ? time : `${date}, ${time}`}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-medium text-base truncate">{teamA}</p>
            </div>
            
            {showScores && (
              <div className="px-3 font-semibold">
                <span className={isLive ? "text-destructive" : ""}>{scoreA}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-1">
            <div className="flex-1">
              <p className="font-medium text-base truncate">{teamB}</p>
            </div>
            
            {showScores && (
              <div className="px-3 font-semibold">
                <span className={isLive ? "text-destructive" : ""}>{scoreB}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MatchCard;
