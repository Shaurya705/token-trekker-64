
import ConnectWallet from "@/components/ConnectWallet";
import TokenList from "@/components/TokenList";
import TokenActions from "@/components/TokenActions";
import TransactionHistory from "@/components/TransactionHistory";
import { Wallet } from "lucide-react";
import { SolanaProvider } from "@/context/SolanaProvider";
import { useWallet } from "@solana/wallet-adapter-react";

const AppContent = () => {
  const { connected } = useWallet();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Wallet className="h-8 w-8 text-solana-purple" />
          <h1 className="text-3xl font-bold solana-gradient-text">Solana Token Trekker</h1>
        </div>
        <ConnectWallet />
      </header>
      
      {connected && (
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <TokenList />
            <TransactionHistory />
          </div>
          <div className="lg:col-span-4">
            <TokenActions />
          </div>
        </main>
      )}
      
      {!connected && (
        <div className="flex flex-col items-center justify-center my-20 p-8 glass-card max-w-xl mx-auto rounded-xl">
          <img 
            src="https://solana.com/src/img/branding/solanaLogoMark.svg" 
            alt="Solana Logo" 
            className="w-24 h-24 mb-6 animate-pulse-slow"
          />
          <h2 className="text-2xl font-bold mb-2 text-center">Welcome to Solana Token Trekker</h2>
          <p className="text-center text-muted-foreground mb-6">
            Connect your wallet to create tokens, send transactions, and track your assets on Solana.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <h3 className="font-semibold mb-1">Create Tokens</h3>
              <p className="text-xs text-muted-foreground">Mint your own SPL tokens</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <h3 className="font-semibold mb-1">Send Assets</h3>
              <p className="text-xs text-muted-foreground">Transfer SOL & tokens</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg text-center">
              <h3 className="font-semibold mb-1">Track History</h3>
              <p className="text-xs text-muted-foreground">View your transactions</p>
            </div>
          </div>
        </div>
      )}
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>Built with ❤️ for the Solana ecosystem</p>
        <p className="mt-1">Running on Solana Devnet</p>
      </footer>
    </div>
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
