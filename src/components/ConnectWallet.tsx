
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { useSolana } from '@/context/SolanaProvider';

const ConnectWallet = () => {
  const { publicKey } = useWallet();
  const { balance } = useSolana();
  
  const copyAddress = async () => {
    if (!publicKey) return;
    
    try {
      await navigator.clipboard.writeText(publicKey.toString());
      toast.success("Address copied to clipboard");
    } catch (error) {
      console.error("Failed to copy address", error);
      toast.error("Failed to copy address");
    }
  };
  
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  return (
    <div className="flex flex-col gap-4 md:items-center md:flex-row md:justify-between w-full">
      <div>
        {publicKey ? (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Connected Wallet</h3>
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-secondary/50 px-2 py-1 rounded text-sm">
                {shortenAddress(publicKey.toString())}
              </span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8" 
                onClick={copyAddress}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Balance: </span>
              <span className="font-semibold">{balance.toFixed(4)} SOL</span>
            </div>
          </div>
        ) : (
          <h3 className="text-lg font-medium">Connect your wallet to continue</h3>
        )}
      </div>
      
      <div className="wallet-adapter-button-wrapper">
        <WalletMultiButton className="wallet-adapter-button" />
      </div>
    </div>
  );
};

export default ConnectWallet;
