
import { useSolana} from '@/context/SolanaProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';
import CreateTokenForm from './CreateTokenForm';
import SendSolForm from './SendSolForm';
import { useWallet } from '@solana/wallet-adapter-react';

const TokenActions = () => {
  const { connected } = useWallet();
  const { isLoading } = useSolana();
  
  if (!connected) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Actions</h3>
      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="send">Send SOL</TabsTrigger>
          <TabsTrigger value="create">Create Token</TabsTrigger>
        </TabsList>
        <TabsContent value="send" className="mt-4">
          <SendSolForm />
        </TabsContent>
        <TabsContent value="create" className="mt-4">
          <CreateTokenForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenActions;
