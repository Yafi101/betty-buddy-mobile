
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface BetCardProps {
  id: string;
  teamA: string;
  teamB: string;
  odds: number;
  time: string;
  league: string;
  isPremium?: boolean;
  onClick?: () => void;
}

const BetCard: React.FC<BetCardProps> = ({
  teamA,
  teamB,
  odds,
  time,
  league,
  isPremium = false,
  onClick
}) => {
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
      <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <Badge variant="outline" className="bg-background/50 text-xs font-normal">
              {league}
            </Badge>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <h3 className="font-medium text-base">{teamA}</h3>
              <h3 className="font-medium text-base mt-1">{teamB}</h3>
            </div>
            
            <div className="flex flex-col items-end">
              {isPremium && (
                <Badge variant="secondary" className="mb-1 bg-secondary/80">
                  <Award size={12} className="mr-1" /> Premium
                </Badge>
              )}
              <span className="font-bold text-lg">{odds.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-between hover:bg-primary/5 font-normal"
          >
            Place bet
            <ArrowRight size={16} />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BetCard;
