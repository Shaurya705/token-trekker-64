
import { useState } from 'react';
import { useSolana } from '@/context/SolanaProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Banknote } from 'lucide-react';
import { toast } from 'sonner';

export const SendSolForm = () => {
  const { transferSol, balance, isLoading } = useSolana();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient) {
      toast.error('Please enter a recipient address');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    const amountNum = parseFloat(amount);
    
    if (amountNum > balance) {
      toast.error('Insufficient SOL balance');
      return;
    }
    
    const success = await transferSol(amountNum, recipient);
    
    if (success) {
      setAmount('');
      setRecipient('');
    }
  };
  
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Banknote className="h-5 w-5" />
          Send SOL
        </CardTitle>
        <CardDescription>
          Send SOL to another wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="Enter Solana address"
              className="input-solana"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="amount">Amount (SOL)</Label>
              <span className="text-xs text-muted-foreground">
                Balance: {balance.toFixed(4)} SOL
              </span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.05"
              className="input-solana"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
            {isLoading ? 'Sending...' : 'Send SOL'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SendSolForm;
