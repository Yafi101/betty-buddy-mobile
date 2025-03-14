
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import NavBar from '@/components/NavBar';

// Sample data
const betsHistory = [
  { 
    id: '1', 
    matchup: 'Arsenal vs Chelsea',
    date: 'Oct 15, 2023',
    amount: 50,
    odds: 2.5,
    selection: 'Arsenal',
    status: 'won',
    payout: 125
  },
  { 
    id: '2', 
    matchup: 'Barcelona vs Real Madrid',
    date: 'Oct 10, 2023',
    amount: 20,
    odds: 1.8,
    selection: 'Barcelona',
    status: 'lost',
    payout: 0
  },
  { 
    id: '3', 
    matchup: 'Liverpool vs Man City',
    date: 'Oct 5, 2023',
    amount: 30,
    odds: 3.2,
    selection: 'Draw',
    status: 'pending',
    payout: 96
  },
];

const History: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter bets based on active tab
  const filteredBets = betsHistory.filter(bet => {
    if (activeTab === 'all') return true;
    return bet.status === activeTab;
  });
  
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
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <CheckCircle2 className="text-green-500" size={16} />;
      case 'lost':
        return <XCircle className="text-red-500" size={16} />;
      case 'pending':
        return <Clock className="text-amber-500" size={16} />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'won':
        return 'Won';
      case 'lost':
        return 'Lost';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'text-green-500';
      case 'lost':
        return 'text-red-500';
      case 'pending':
        return 'text-amber-500';
      default:
        return '';
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
          <h1 className="text-2xl font-bold mb-4">Bet History</h1>
        </div>
      </motion.div>
      
      <div className="container px-4">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="w-full mb-4 bg-secondary/50">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="won" className="flex-1">Won</TabsTrigger>
            <TabsTrigger value="lost" className="flex-1">Lost</TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-4"
        >
          {filteredBets.length > 0 ? (
            filteredBets.map((bet) => (
              <motion.div key={bet.id} variants={itemVariants}>
                <Card className="overflow-hidden shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{bet.matchup}</h3>
                        <p className="text-sm text-muted-foreground">{bet.date}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`flex items-center gap-1 ${getStatusColor(bet.status)}`}
                      >
                        {getStatusIcon(bet.status)}
                        {getStatusText(bet.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <p className="text-muted-foreground">Selection</p>
                        <p className="font-medium">{bet.selection}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-muted-foreground">Odds</p>
                        <p className="font-medium">{bet.odds.toFixed(2)}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-muted-foreground">Stake</p>
                        <p className="font-medium">${bet.amount}</p>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-muted-foreground">Payout</p>
                        <p className={`font-bold ${bet.status === 'won' ? 'text-green-500' : ''}`}>
                          ${bet.payout}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              No bets found for this filter
            </div>
          )}
        </motion.div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
