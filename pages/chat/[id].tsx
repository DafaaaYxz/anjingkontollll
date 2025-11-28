import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatInterface from '../../components/ChatInterface';

interface BotData {
  name: string;
  persona: string;
  image: string;
}

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [bot, setBot] = useState<BotData | null>(null);

  useEffect(() => {
    if (id) {
      const bots = JSON.parse(localStorage.getItem('bots') || '{}');
      setBot(bots[id as string] || null);
    }
  }, [id]);

  if (!bot) return <div>Loading...</div>;

  return (
    <div>
      <ChatInterface bot={bot} />
    </div>
  );
}
