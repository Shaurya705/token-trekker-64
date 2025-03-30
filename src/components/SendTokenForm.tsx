
import { useState} from 'react';
import { TokenInfo, useSolana} from '@/context/SolanaProvider';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface SendTokenFormProps {
  token: TokenInfo;
  onClose: () => void;
}

export const SendTokenForm = ({ token, onClose }: SendTokenFormProps) => {
  const { transferToken } = useSolana();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (parseFloat(amount) > token.balance) {
      toast.error(`Insufficient ${token.symbol} balance`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await transferToken(
        token.address,
        parseFloat(amount),
        recipient
      );
      
      if (success) {
        setAmount('');
        setRecipient('');
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-2">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Recipient Address"
          className="input-solana"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Amount"
            className="input-solana"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSubmitting}
            min="0"
            step="any"
          />
          <span className="font-medium w-16">{token.symbol}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
