
import React from 'react';
import ConnectWallet from "@/components/ConnectWallet";
import TokenList from "@/components/TokenList";
import TokenActions from "@/components/TokenActions";
import TransactionHistory from "@/components/TransactionHistory";
import { Wallet, ArrowRight } from "lucide-react";
import { SolanaProvider } from "@/context/SolanaProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const AppContent = () => {
  const { connected } = useWallet();
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          {!connected && (
            <div className="flex flex-col items-center justify-center mb-6">
              <img 
                src="https://solana.com/src/img/branding/solanaLogoMark.svg" 
                alt="Solana Logo" 
                className="w-16 h-16 mb-3 animate-pulse-slow"
              />
              <h1 className="text-3xl font-bold solana-gradient-text text-center">Solana Token Trekker</h1>
              <p className="text-muted-foreground mt-2 text-center max-w-lg">
                A powerful dashboard to create, manage, and track your Solana tokens and transactions
              </p>
            </div>
          )}
        </header>
        
        {connected && (
          <main>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-8">
                <TokenList />
                <TransactionHistory />
              </div>
              <div className="md:col-span-4">
                <TokenActions />
              </div>
            </div>
          </main>
        )}
        
        {!connected && (
          <div className="flex flex-col items-center justify-center my-6">
            <Card className="w-full max-w-3xl mx-auto">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-solana-purple to-solana-green p-8 text-white rounded-l-lg">
                    <h2 className="text-2xl font-bold mb-4">Connect to Solana</h2>
                    <p className="mb-6 opacity-90">
                      Unlock the full potential of the Solana blockchain with our intuitive token management dashboard.
                    </p>
                    <ConnectWallet />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold mb-4">Everything you need to:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Create and mint new Solana tokens</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Send tokens to any Solana address</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Track token balances and portfolio</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Monitor transaction history</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Manage Your Tokens</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and mint custom SPL tokens on the Solana blockchain.
                </p>
                <Link to="/explore">
                  <Button variant="outline" size="sm" className="mt-auto">
                    Explore Tokens
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Send SOL & Tokens</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Transfer SOL and SPL tokens to any wallet address quickly and easily.
                </p>
                <Button variant="outline" size="sm" className="mt-auto" disabled>
                  Connect Wallet First
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Track Transactions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor your transaction history and track your portfolio performance.
                </p>
                <Link to="/transactions">
                  <Button variant="outline" size="sm" className="mt-auto">
                    View Transactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ for the Solana ecosystem</p>
          <p className="mt-1">Running on Solana Devnet</p>
        </footer>
      </div>
    </>
  );
};

const Index = () => {
  return (
    <SolanaProvider>
      <AppContent />
    </SolanaProvider>
  );
};

export default Index;
