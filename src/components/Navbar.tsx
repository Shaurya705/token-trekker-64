
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Home, Coins, History, Menu, X } from 'lucide-react';
import ConnectWallet from './ConnectWallet';
import { useWallet } from '@solana/wallet-adapter-react';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const { connected } = useWallet();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Coins },
    { name: 'Transactions', path: '/transactions', icon: History },
  ];
  
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-solana-purple" />
          <h1 className="text-xl font-bold solana-gradient-text hidden sm:inline-block">Solana Token Trekker</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link to={item.path}>
                    <NavigationMenuLink
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        location.pathname === item.path 
                          ? "bg-secondary text-primary" 
                          : "text-gray-700 hover:bg-secondary/50"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Wallet Connect Button */}
        <div className="flex items-center gap-2">
          <ConnectWallet />
          
          {/* Mobile Menu Button */}
          <button 
            className="p-2 text-gray-700 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <nav className="container mx-auto px-4 py-2 flex flex-col">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-secondary text-primary" 
                    : "text-gray-700 hover:bg-secondary/50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
