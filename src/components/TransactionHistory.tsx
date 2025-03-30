
import { useSolana, Transaction} from '@/context/SolanaProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowDownLeft, ArrowUpRight, Clock, Coins, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'send':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'create':
        return <Coins className="h-4 w-4 text-purple-500" />;
      case 'mint':
        return <Sparkles className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  const getTitle = () => {
    switch (transaction.type) {
      case 'send':
        return `Sent ${transaction.amount} ${transaction.token}`;
      case 'receive':
        return `Received ${transaction.amount} ${transaction.token}`;
      case 'create':
        return `Created ${transaction.token} Token`;
      case 'mint':
        return `Minted ${transaction.amount} ${transaction.token}`;
      default:
        return 'Transaction';
    }
  };
  
  const getDetails = () => {
    if (transaction.type === 'send' && transaction.to) {
      return `To: ${transaction.to.slice(0, 4)}...${transaction.to.slice(-4)}`;
    }
    if (transaction.type === 'receive' && transaction.from) {
      return `From: ${transaction.from.slice(0, 4)}...${transaction.from.slice(-4)}`;
    }
    if (transaction.type === 'mint' && transaction.to) {
      return `To: ${transaction.to.slice(0, 4)}...${transaction.to.slice(-4)}`;
    }
    return new Date(transaction.timestamp).toLocaleString();
  };
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-secondary/50">
          {getIcon()}
        </div>
        <div>
          <div className="font-medium">{getTitle()}</div>
          <div className="text-xs text-muted-foreground">{getDetails()}</div>
        </div>
      </div>
      <div className="text-right">
        <Badge
          variant={transaction.status === 'confirmed' ? 'default' : 'outline'}
          className={
            transaction.status === 'confirmed'
              ? 'bg-green-500/20 text-green-600 hover:bg-green-500/20'
              : transaction.status === 'pending'
              ? 'bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/20'
              : 'bg-red-500/20 text-red-600 hover:bg-red-500/20'
          }
        >
          {transaction.status}
        </Badge>
        <div className="text-xs mt-1 font-mono">
          {transaction.signature.slice(0, 8)}...
        </div>
      </div>
    </div>
  );
};

const TransactionHistory = () => {
  const { transactions } = useSolana();
  
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">Transaction History</CardTitle>
        <CardDescription>
          Your recent transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No transactions yet. Start using your wallet!
            </div>
          ) : (
            <div>
              {transactions.map((tx) => (
                <TransactionItem key={tx.signature} transaction={tx} />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
