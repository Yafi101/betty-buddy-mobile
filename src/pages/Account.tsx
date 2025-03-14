
import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Wallet, 
  CreditCard, 
  Settings, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import NavBar from '@/components/NavBar';

const Account: React.FC = () => {
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
  
  const menuItems = [
    { label: 'Profile Information', icon: User },
    { label: 'Payment Methods', icon: CreditCard },
    { label: 'Security', icon: Shield },
    { label: 'Settings', icon: Settings },
    { label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 pt-6 pb-4 bg-background/80 backdrop-blur-md"
      >
        <div className="container px-4">
          <h1 className="text-2xl font-bold mb-4">Account</h1>
        </div>
      </motion.div>
      
      <div className="container px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Balance Card */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="overflow-hidden bg-gradient-to-br from-primary/90 to-primary">
              <CardContent className="p-5 text-white">
                <p className="text-white/80 text-sm mb-1">Available Balance</p>
                <div className="flex items-center mb-3">
                  <DollarSign className="mr-1" size={24} />
                  <span className="text-3xl font-bold">750.00</span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="secondary" className="flex-1 bg-white text-primary hover:bg-white/90">
                    <Wallet size={16} className="mr-2" />
                    Deposit
                  </Button>
                  <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10">
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* User Info */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mr-4">
                    <User size={24} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Menu Items */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="overflow-hidden">
              <CardContent className="py-2 px-0">
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Button variant="ghost" className="w-full justify-start rounded-none px-5 py-6 h-auto">
                      <item.icon size={18} className="mr-3 text-muted-foreground" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight size={18} className="text-muted-foreground" />
                    </Button>
                    {index < menuItems.length - 1 && (
                      <Separator className="opacity-30" />
                    )}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Logout */}
          <motion.div variants={itemVariants}>
            <Button variant="outline" className="w-full border-destructive/20 text-destructive">
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Account;
