
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TokenInfo, useSolana } from '@/context/SolanaProvider';
import { Copy, RefreshCw, Send } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { SendTokenForm } from './SendTokenForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const TokenCard = ({ token }: { token: TokenInfo }) => {
  const [showSendForm, setShowSendForm] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(token.address);
      toast.success("Token address copied to clipboard");
    } catch (error) {
      console.error("Failed to copy address", error);
      toast.error("Failed to copy address");
    }
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{token.name}</CardTitle>
            <CardDescription className="font-mono text-xs">
              {token.address.slice(0, 4)}...{token.address.slice(-4)}
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 ml-1"
                onClick={copyAddress}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="font-mono text-lg font-bold">
              {token.balance.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: token.decimals
              })}
            </div>
            <CardDescription className="text-xs">{token.symbol}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {showSendForm ? (
          <>
            <SendTokenForm
              token={token}
              onClose={() => setShowSendForm(false)}
            />
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-2"
            onClick={() => setShowSendForm(true)}
          >
            <Send className="h-4 w-4 mr-2" />
            Send {token.symbol}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const TokenList = () => {
  const { tokens, refreshBalance, isLoading } = useSolana();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Tokens</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={refreshBalance}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {tokens.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No tokens found. Create or mint some tokens to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tokens.map((token) => (
            <TokenCard key={token.address} token={token} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenList;
