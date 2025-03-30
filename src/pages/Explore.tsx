
import React, { useState } from 'react';
import { useSolana } from '@/context/SolanaProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Coins, TrendingUp, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button} from '@/components/ui/button';
import { useWallet} from '@solana/wallet-adapter-react';

const popularTokens = [
  { symbol: 'SOL', name: 'Solana', price: '$150.23', change: '+5.2%', volume: '$1.2B' },
  { symbol: 'BONK', name: 'Bonk', price: '$0.00002341', change: '+12.4%', volume: '$456M' },
  { symbol: 'RAY', name: 'Raydium', price: '$2.78', change: '-1.3%', volume: '$89M' },
  { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '0.0%', volume: '$890M' },
  { symbol: 'PYTH', name: 'Pyth Network', price: '$0.74', change: '+3.8%', volume: '$123M' },
  { symbol: 'JTO', name: 'Jito', price: '$3.15', change: '+8.2%', volume: '$76M' },
];

const Explore = () => {
  const { connected } = useWallet();
  const { isLoading } = useSolana();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTokens = popularTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Explore Tokens</h1>
        <p className="text-muted-foreground">
          Discover popular tokens on the Solana network or search for specific tokens.
        </p>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input 
          type="text"
          placeholder="Search tokens by name or symbol..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-solana-purple" />
              Trending
            </CardTitle>
            <CardDescription>Most popular tokens this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {popularTokens.slice(0, 3).map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-2 hover:bg-secondary rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-purple to-solana-green flex items-center justify-center text-white text-xs font-bold">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-xs text-muted-foreground">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{token.price}</p>
                    <p className={`text-xs ${token.change.startsWith('+') ? 'text-green-500' : token.change.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>
                      {token.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-solana-green" />
              Volume Leaders
            </CardTitle>
            <CardDescription>Tokens with highest trading volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...popularTokens].sort((a, b) => parseFloat(b.volume.slice(1, -1)) - parseFloat(a.volume.slice(1, -1))).slice(0, 3).map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-2 hover:bg-secondary rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-purple to-solana-green flex items-center justify-center text-white text-xs font-bold">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-xs text-muted-foreground">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{token.price}</p>
                    <p className="text-xs text-muted-foreground">Vol: {token.volume}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              New Listings
            </CardTitle>
            <CardDescription>Recently added tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {popularTokens.slice(3, 6).map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-2 hover:bg-secondary rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-purple to-solana-green flex items-center justify-center text-white text-xs font-bold">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-xs text-muted-foreground">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{token.price}</p>
                    <p className="text-xs text-muted-foreground">New</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">All Tokens</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Token</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Price</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 hidden md:table-cell">24h Change</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 hidden lg:table-cell">Volume</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token, index) => (
              <tr key={token.symbol} className={`${index % 2 === 0 ? 'bg-white' : 'bg-secondary/30'} border-t border-gray-200`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-purple to-solana-green flex items-center justify-center text-white text-xs font-bold">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-xs text-muted-foreground">{token.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium">{token.price}</td>
                <td className={`px-4 py-3 text-right hidden md:table-cell ${token.change.startsWith('+') ? 'text-green-500' : token.change.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>
                  {token.change}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden lg:table-cell">{token.volume}</td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="outline">Trade</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Explore;
