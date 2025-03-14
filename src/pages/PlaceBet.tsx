
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Info, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavBar from '@/components/NavBar';

const PlaceBet: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const betId = searchParams.get('id') || '1';
  
  const [betAmount, setBetAmount] = useState(10);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  
  // Sample data based on ID
  // In a real app, you would fetch this data based on the ID
  const matchData = {
    teamA: 'Arsenal',
    teamB: 'Chelsea',
    league: 'Premier League',
    time: 'Today, 20:00',
    odds: {
      teamA: 2.5,
      draw: 3.2,
      teamB: 2.8
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handlePlaceBet = () => {
    if (!selectedOutcome) {
      toast({
        title: "Error",
        description: "Please select an outcome",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Bet Placed Successfully!",
      description: `$${betAmount} on ${selectedOutcome}`,
      action: (
        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-primary" />
        </div>
      ),
    });
    
    // In a real app, you would submit the bet to your backend
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  // Calculate potential winnings
  const getPotentialWinnings = () => {
    if (!selectedOutcome) return 0;
    
    let selectedOdds = 0;
    if (selectedOutcome === matchData.teamA) selectedOdds = matchData.odds.teamA;
    if (selectedOutcome === 'Draw') selectedOdds = matchData.odds.draw;
    if (selectedOutcome === matchData.teamB) selectedOdds = matchData.odds.teamB;
    
    return (betAmount * selectedOdds).toFixed(2);
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 pt-6 pb-4 bg-background/80 backdrop-blur-md"
      >
        <div className="container px-4">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold">Place Bet</h1>
          </div>
        </div>
      </motion.div>
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Card className="overflow-hidden border shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-4">
                <Badge variant="outline" className="bg-background/50 text-xs font-normal">
                  {matchData.league}
                </Badge>
                <span className="text-xs text-muted-foreground">{matchData.time}</span>
              </div>
              
              <div className="flex justify-between items-center mb-5">
                <div className="flex-1 text-center border-r pr-4">
                  <h3 className="font-medium text-base mb-1">{matchData.teamA}</h3>
                </div>
                <div className="px-4 text-sm text-muted-foreground">
                  VS
                </div>
                <div className="flex-1 text-center border-l pl-4">
                  <h3 className="font-medium text-base mb-1">{matchData.teamB}</h3>
                </div>
              </div>
              
              <Separator className="my-4 opacity-50" />
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                  Select Outcome 
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          <Info size={12} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Select who you think will win</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={selectedOutcome === matchData.teamA ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedOutcome(matchData.teamA)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs">{matchData.teamA}</span>
                      <span className="font-bold mt-1">{matchData.odds.teamA}</span>
                    </div>
                  </Button>
                  
                  <Button
                    variant={selectedOutcome === 'Draw' ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => setSelectedOutcome('Draw')}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs">Draw</span>
                      <span className="font-bold mt-1">{matchData.odds.draw}</span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant={selectedOutcome === matchData.teamB ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedOutcome(matchData.teamB)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs">{matchData.teamB}</span>
                      <span className="font-bold mt-1">{matchData.odds.teamB}</span>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Bet Amount</h3>
                  <span className="font-bold">${betAmount}</span>
                </div>
                
                <Slider
                  value={[betAmount]}
                  min={5}
                  max={500}
                  step={5}
                  onValueChange={(values) => setBetAmount(values[0])}
                  className="mb-4"
                />
                
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setBetAmount(10)}>$10</Button>
                  <Button variant="outline" size="sm" onClick={() => setBetAmount(50)}>$50</Button>
                  <Button variant="outline" size="sm" onClick={() => setBetAmount(100)}>$100</Button>
                  <Button variant="outline" size="sm" onClick={() => setBetAmount(200)}>$200</Button>
                </div>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Potential Winnings</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Including your stake
                    </p>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    ${getPotentialWinnings()}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full"
                disabled={!selectedOutcome}
                onClick={handlePlaceBet}
              >
                <Trophy size={16} className="mr-2" />
                Place Bet
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default PlaceBet;
