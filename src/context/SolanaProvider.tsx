import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  CloverWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { toast } from "sonner";

// Import the CSS for the wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css';

// Define the type for our Solana context
type SolanaContextType = {
  balance: number;
  tokens: TokenInfo[];
  transactions: Transaction[];
  isLoading: boolean;
  refreshBalance: () => Promise<void>;
  createToken: (name: string, symbol: string, decimals: number) => Promise<string | null>;
  mintToken: (mintAddress: string, amount: number, recipientAddress?: string) => Promise<boolean>;
  transferToken: (mintAddress: string, amount: number, recipientAddress: string) => Promise<boolean>;
  transferSol: (amount: number, recipient: string) => Promise<boolean>;
};

// Define types for tokens and transactions
export type TokenInfo = {
  address: string;
  symbol: string;
  name: string;
  balance: number;
  decimals: number;
};

export type Transaction = {
  signature: string;
  type: 'send' | 'receive' | 'create' | 'mint';
  amount?: number;
  token?: string;
  timestamp: number;
  status: 'confirmed' | 'pending' | 'failed';
  to?: string;
  from?: string;
};

// Create context with default values
const SolanaContext = createContext<SolanaContextType>({
  balance: 0,
  tokens: [],
  transactions: [],
  isLoading: false,
  refreshBalance: async () => {},
  createToken: async () => null,
  mintToken: async () => false,
  transferToken: async () => false,
  transferSol: async () => false,
});

// Custom hook to use Solana context
export const useSolana = () => useContext(SolanaContext);

// SolanaContextProvider component to wrap around children
export const SolanaContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to refresh SOL balance
  const refreshBalance = async () => {
    if (!wallet.publicKey) return;
    
    try {
      setIsLoading(true);
      const lamports = await connection.getBalance(wallet.publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
      
      // In a real app, you would fetch token balances here using @solana/spl-token
      // For now, we'll just mock some sample tokens
      setTokens([
        { 
          address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", 
          name: "Samo", 
          symbol: "SAMO", 
          balance: 1000, 
          decimals: 9 
        },
        { 
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", 
          name: "USD Coin", 
          symbol: "USDC", 
          balance: 500, 
          decimals: 6 
        }
      ]);
      
      // Mock transactions
      setTransactions([
        {
          signature: "5xoTQ1XyJDqtRiwN7k3mW3U1x16A9Jni2YEGYf3EbYeP5MyR4wNjXZ4EvN9!ffiQ8tQxZ8YfEpLc5mRQq1yS1L6txL",
          type: 'receive',
          amount: 1,
          token: 'SOL',
          timestamp: Date.now() - 86400000,
          status: 'confirmed',
          from: '8ezpz1s1YmrCuCxzLUdKpEDeWs4tH5xAMbZc6bL4hYEb',
        },
        {
          signature: "4NQkT9sMJeL53zUWBJvkQy5QR2QMrKMNXKwmJpw7rrrBVEWQbH5hfej77yD!8t4oVFKr85D89xpYv38Mr2Df78cM",
          type: 'send',
          amount: 0.5,
          token: 'SOL',
          timestamp: Date.now() - 172800000,
          status: 'confirmed',
          to: '7iAZfkr5gWTa9xJqNsXQXnbZmgPZRfny3ABF6TJ5Xjef',
        }
      ]);
      
    } catch (error) {
      console.error("Error refreshing balance:", error);
      toast.error("Failed to fetch balance");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new SPL token (mocked for now)
  const createToken = async (name: string, symbol: string, decimals: number) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("Please connect your wallet");
      return null;
    }
    
    try {
      setIsLoading(true);
      // In a real app, you would create a token using @solana/spl-token
      console.log(`Creating token ${name} (${symbol}) with ${decimals} decimals`);
      
      // Mock token creation by adding to list after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock token address
      const tokenAddress = `Token${Math.floor(Math.random() * 1000000)}`;
      
      // Add new token to list
      setTokens(prev => [
        ...prev, 
        { 
          address: tokenAddress, 
          name, 
          symbol, 
          balance: 0, 
          decimals 
        }
      ]);
      
      // Add transaction
      setTransactions(prev => [
        {
          signature: `Create${Math.floor(Math.random() * 1000000)}`,
          type: 'create',
          token: symbol,
          timestamp: Date.now(),
          status: 'confirmed',
        },
        ...prev
      ]);
      
      toast.success(`Created token: ${name} (${symbol})`);
      return tokenAddress;
    } catch (error) {
      console.error("Error creating token:", error);
      toast.error("Failed to create token");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to mint tokens (mocked for now)
  const mintToken = async (mintAddress: string, amount: number, recipientAddress?: string) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("Please connect your wallet");
      return false;
    }
    
    try {
      setIsLoading(true);
      // In a real app, you would mint tokens using @solana/spl-token
      console.log(`Minting ${amount} tokens to ${recipientAddress || wallet.publicKey.toString()}`);
      
      // Mock minting by updating token balance after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update token balance
      setTokens(prev => prev.map(token => 
        token.address === mintAddress 
          ? { ...token, balance: token.balance + amount } 
          : token
      ));
      
      // Add transaction
      const tokenInfo = tokens.find(t => t.address === mintAddress);
      setTransactions(prev => [
        {
          signature: `Mint${Math.floor(Math.random() * 1000000)}`,
          type: 'mint',
          amount,
          token: tokenInfo?.symbol || mintAddress,
          timestamp: Date.now(),
          status: 'confirmed',
          to: recipientAddress || wallet.publicKey?.toString(),
        },
        ...prev
      ]);
      
      toast.success(`Minted ${amount} ${tokenInfo?.symbol || 'tokens'}`);
      return true;
    } catch (error) {
      console.error("Error minting tokens:", error);
      toast.error("Failed to mint tokens");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to transfer tokens (mocked for now)
  const transferToken = async (mintAddress: string, amount: number, recipientAddress: string) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("Please connect your wallet");
      return false;
    }
    
    try {
      setIsLoading(true);
      // In a real app, you would transfer tokens using @solana/spl-token
      console.log(`Transferring ${amount} tokens to ${recipientAddress}`);
      
      // Mock transfer by updating token balance after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update token balance
      setTokens(prev => prev.map(token => 
        token.address === mintAddress 
          ? { ...token, balance: token.balance - amount } 
          : token
      ));
      
      // Add transaction
      const tokenInfo = tokens.find(t => t.address === mintAddress);
      setTransactions(prev => [
        {
          signature: `Transfer${Math.floor(Math.random() * 1000000)}`,
          type: 'send',
          amount,
          token: tokenInfo?.symbol || mintAddress,
          timestamp: Date.now(),
          status: 'confirmed',
          from: wallet.publicKey?.toString(),
          to: recipientAddress,
        },
        ...prev
      ]);
      
      toast.success(`Sent ${amount} ${tokenInfo?.symbol || 'tokens'} to ${recipientAddress.slice(0, 4)}...${recipientAddress.slice(-4)}`);
      return true;
    } catch (error) {
      console.error("Error transferring tokens:", error);
      toast.error("Failed to transfer tokens");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to transfer SOL (mocked for now)
  const transferSol = async (amount: number, recipient: string) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("Please connect your wallet");
      return false;
    }
    
    try {
      setIsLoading(true);
      // In a real app, you would transfer SOL using @solana/web3.js
      console.log(`Transferring ${amount} SOL to ${recipient}`);
      
      // Mock transfer by updating balance after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update SOL balance
      setBalance(prev => prev - amount);
      
      // Add transaction
      setTransactions(prev => [
        {
          signature: `Sol${Math.floor(Math.random() * 1000000)}`,
          type: 'send',
          amount,
          token: 'SOL',
          timestamp: Date.now(),
          status: 'confirmed',
          from: wallet.publicKey?.toString(),
          to: recipient,
        },
        ...prev
      ]);
      
      toast.success(`Sent ${amount} SOL to ${recipient.slice(0, 4)}...${recipient.slice(-4)}`);
      return true;
    } catch (error) {
      console.error("Error transferring SOL:", error);
      toast.error("Failed to transfer SOL");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to update balance when wallet changes
  useEffect(() => {
    if (wallet.publicKey) {
      refreshBalance();
    } else {
      setBalance(0);
      setTokens([]);
    }
  }, [wallet.publicKey, connection]);

  // Provide context values
  const contextValue: SolanaContextType = {
    balance,
    tokens,
    transactions,
    isLoading,
    refreshBalance,
    createToken,
    mintToken,
    transferToken,
    transferSol,
  };

  return (
    <SolanaContext.Provider value={contextValue}>
      {children}
    </SolanaContext.Provider>
  );
};

// Main provider component
export const SolanaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up network and wallet configuration
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  // Set up supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new CloverWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaContextProvider>
            {children}
          </SolanaContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
