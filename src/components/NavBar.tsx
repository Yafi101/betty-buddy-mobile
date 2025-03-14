
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, User, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/placebet', label: 'Bet', icon: Trophy },
    { path: '/history', label: 'History', icon: History },
    { path: '/account', label: 'Account', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass rounded-t-xl animate-slide-in-bottom">
      <div className="flex justify-around py-3 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              to={item.path} 
              key={item.path}
              className={cn(
                "flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={20} className={cn(
                "mb-1 transition-transform",
                isActive && "scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
