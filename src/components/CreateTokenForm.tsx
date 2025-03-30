
import { useState} from 'react';
import { useSolana} from '@/context/SolanaProvider';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Coins, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const CreateTokenForm = () => {
  const { createToken, mintToken, isLoading } = useSolana();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('9');
  const [mintAmount, setMintAmount] = useState('');
  const [createdTokenMint, setCreatedTokenMint] = useState<string | null>(null);
  
  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !symbol || !decimals) {
      toast.error('Please fill in all token details');
      return;
    }
    
    const tokenMint = await createToken(
      name,
      symbol.toUpperCase(),
      parseInt(decimals)
    );
    
    if (tokenMint) {
      setCreatedTokenMint(tokenMint);
    }
  };
  
  const handleMintToken = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!createdTokenMint) {
      toast.error('No token created yet');
      return;
    }
    
    if (!mintAmount || parseFloat(mintAmount) <= 0) {
      toast.error('Please enter a valid amount to mint');
      return;
    }
    
    const success = await mintToken(
      createdTokenMint,
      parseFloat(mintAmount)
    );
    
    if (success) {
      setMintAmount('');
      setCreatedTokenMint(null);
      setName('');
      setSymbol('');
      setDecimals('9');
    }
  };
  
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          {createdTokenMint ? 'Mint Tokens' : 'Create New Token'}
        </CardTitle>
        <CardDescription>
          {createdTokenMint 
            ? 'Mint your newly created tokens' 
            : 'Create your own SPL token on Solana'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!createdTokenMint ? (
          <form onSubmit={handleCreateToken} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Token Name</Label>
              <Input
                id="name"
                placeholder="My Token"
                className="input-solana"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="symbol">Token Symbol</Label>
              <Input
                id="symbol"
                placeholder="MTK"
                className="input-solana"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                maxLength={5}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="decimals">Decimals</Label>
              <Input
                id="decimals"
                type="number"
                placeholder="9"
                className="input-solana"
                value={decimals}
                onChange={(e) => setDecimals(e.target.value)}
                min="0"
                max="9"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Token'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleMintToken} className="space-y-4">
            <div className="rounded-md bg-secondary/70 p-3 text-sm">
              <p className="font-medium">Token created successfully!</p>
              <p className="font-mono text-xs mt-1 break-all">{createdTokenMint}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mintAmount">Amount to Mint</Label>
              <Input
                id="mintAmount"
                type="number"
                placeholder="1000"
                className="input-solana"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                min="0"
                step="any"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isLoading ? 'Minting...' : `Mint ${symbol || 'Tokens'}`}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateTokenForm;
