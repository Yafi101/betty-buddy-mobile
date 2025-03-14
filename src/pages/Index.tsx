
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import BetCard from '@/components/BetCard';
import MatchCard from '@/components/MatchCard';
import NavBar from '@/components/NavBar';

// Sample data
const topBets = [
  { id: '1', teamA: 'Arsenal', teamB: 'Chelsea', odds: 2.5, time: 'Today, 20:00', league: 'Premier League', isPremium: true },
  { id: '2', teamA: 'Barcelona', teamB: 'Real Madrid', odds: 1.8, time: 'Tomorrow, 21:30', league: 'La Liga' },
  { id: '3', teamA: 'PSG', teamB: 'Bayern Munich', odds: 3.2, time: 'Wed, 20:45', league: 'Champions League' },
];

const liveMatches = [
  { teamA: 'Liverpool', teamB: 'Man United', scoreA: 2, scoreB: 1, time: '67\'', date: 'Today', league: 'Premier League', isLive: true },
  { teamA: 'Milan', teamB: 'Inter', scoreA: 0, scoreB: 0, time: '23\'', date: 'Today', league: 'Serie A', isLive: true },
];

const upcomingMatches = [
  { teamA: 'Ajax', teamB: 'PSV', time: '19:30', date: 'Today', league: 'Eredivisie' },
  { teamA: 'Juventus', teamB: 'Napoli', time: '20:45', date: 'Tomorrow', league: 'Serie A' },
  { teamA: 'Dortmund', teamB: 'Bayern', time: '18:30', date: 'Saturday', league: 'Bundesliga' },
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const handleBetClick = (id: string) => {
    navigate(`/placebet?id=${id}`);
  };
  
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  // Item animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">BetWise</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell size={20} />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search teams, leagues..."
              className="pl-10 bg-secondary/50 border-none shadow-none"
            />
          </div>
        </div>
      </motion.div>
      
      <div className="container px-4">
        {/* Top Bets Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <motion.h2 variants={itemVariants} className="text-lg font-semibold">
              <span className="inline-block">
                <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1 block">Featured</span>
                Top Bets
              </span>
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                See all <ChevronRight size={16} />
              </Button>
            </motion.div>
          </div>
          
          <div className="space-y-3">
            {topBets.map((bet) => (
              <motion.div key={bet.id} variants={itemVariants}>
                <BetCard 
                  {...bet} 
                  onClick={() => handleBetClick(bet.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <Separator className="my-6 opacity-50" />
        
        {/* Matches Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-lg font-semibold mb-4">
            <span className="inline-block">
              <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1 block">Games</span>
              Matches
            </span>
          </motion.h2>
          
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-4 bg-secondary/50">
              <TabsTrigger value="live" className="flex-1">Live</TabsTrigger>
              <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
              <TabsTrigger value="finished" className="flex-1">Finished</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live" className="space-y-3 mt-2">
              {liveMatches.map((match, idx) => (
                <motion.div
                  key={`live-${idx}`}
                  variants={itemVariants}
                >
                  <MatchCard {...match} />
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-3 mt-2">
              {upcomingMatches.map((match, idx) => (
                <motion.div
                  key={`upcoming-${idx}`}
                  variants={itemVariants}
                >
                  <MatchCard {...match} />
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="finished" className="mt-2">
              <div className="py-8 text-center text-muted-foreground">
                No finished matches today
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
