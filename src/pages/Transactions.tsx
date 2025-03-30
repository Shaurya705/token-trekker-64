
import React from 'react';
import { useSolana } from '@/context/SolanaProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft, Filter, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock transaction data
const mockTransactions = [
  {
    id: 'tx1',
    type: 'send',
    amount: '1.25 SOL',
    recipient: '8YLKAv...7gFhZ',
    date: '2023-07-22T14:30:00Z',
    status: 'confirmed',
    signature: '4WN91FT2Nbwv6mryUTaNiXoJh5KwZf1xQQYGBqfTjnxjA6Qp6UJ17QrUUB1qfhQDS9CM5ij3yP9WNFwxmUyjnKkR',
  },
  {
    id: 'tx2',
    type: 'receive',
    amount: '10.5 BONK',
    sender: '3dKaUA...9uXvV',
    date: '2023-07-21T09:15:00Z',
    status: 'confirmed',
    signature: '2JQm91D7NTNnWvwRDpSU1KgVLod3VFNrABPEKcNMFJdT4KKpZYZH8vNHieP5h9GGGMQUMxJ4aNH1b9HFb3S6ftgS',
  },
  {
    id: 'tx3',
    type: 'send',
    amount: '0.5 SOL',
    recipient: '5rTkJb...8nQwL',
    date: '2023-07-20T18:45:00Z',
    status: 'confirmed',
    signature: '5BqTQn8JFMxzN1xGSyT9VU7kbKKDQDRvLXvFMHkUhNVNpD5QJ8FrSH1XDHqvqHW9oR1sTK3K3TBFnKQ7K6Hkghq4',
  },
  {
    id: 'tx4',
    type: 'receive',
    amount: '25 USDC',
    sender: '7gHzTm...2pVrT',
    date: '2023-07-19T11:20:00Z',
    status: 'confirmed',
    signature: '3uQJyyKZyvfZjUhfP2K5jvRQ1AjqFJg6MzRTvJ1RjTLHJY1LHQdQWBKZJZjT5XQ9hxjgxpPKcAr8y5K1VmJwJRNP',
  },
  {
    id: 'tx5',
    type: 'send',
    amount: '5 RAY',
    recipient: '9hJksV...4mNbR',
    date: '2023-07-18T15:10:00Z',
    status: 'confirmed',
    signature: '2d6K1JdKTPZHBLL7eGHVSDwDL9ngCwZkyVQnYKph3Mj58pdnMnMQ9VT5pNpXvdrjZhvMXbjnLHtXKUNQ6P2HHLTW',
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' at ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TransactionRow = ({ transaction }: { transaction: typeof mockTransactions[0] }) => {
  return (
    <div className="p-4 border-b last:border-b-0 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'send' ? 'bg-amber-100' : 'bg-green-100'}`}>
            {transaction.type === 'send' ? (
              <ArrowUpRight className="h-5 w-5 text-amber-600" />
            ) : (
              <ArrowDownLeft className="h-5 w-5 text-green-600" />
            )}
          </div>
          <div>
            <p className="font-medium">{transaction.type === 'send' ? 'Sent' : 'Received'} {transaction.amount}</p>
            <p className="text-sm text-muted-foreground">
              {transaction.type === 'send' ? `To: ${transaction.recipient}` : `From: ${transaction.sender}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatDate(transaction.date)}</p>
          <a 
            href={`https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary flex items-center gap-1 justify-end hover:underline"
          >
            View <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { connected } = useWallet();
  const { isLoading } = useSolana();
  
  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl text-center">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your wallet to view your transaction history.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Transaction History</h1>
          <p className="text-muted-foreground">
            View and track all your Solana transactions
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList className="w-full max-w-md grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="token">Token</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="ml-2">Loading transactions...</span>
                </div>
              ) : mockTransactions.length > 0 ? (
                mockTransactions.map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sent" className="mt-6">
          <Card>
            <CardContent className="p-0">
              {mockTransactions
                .filter(tx => tx.type === 'send')
                .map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="received" className="mt-6">
          <Card>
            <CardContent className="p-0">
              {mockTransactions
                .filter(tx => tx.type === 'receive')
                .map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="token" className="mt-6">
          <Card>
            <CardContent className="p-0">
              {mockTransactions
                .filter(tx => !tx.amount.includes('SOL'))
                .map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Transaction Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockTransactions.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockTransactions.filter(tx => tx.type === 'send').length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Received</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockTransactions.filter(tx => tx.type === 'receive').length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Token Types</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {new Set(mockTransactions.map(tx => tx.amount.split(' ')[1])).size}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
