import { useState } from 'react';
import { useRouter } from 'next/router';
import CreateForm from '../components/CreateForm';

export default function Create() {
  const router = useRouter();

  const handleCreate = (botData: { name: string; persona: string; image: string }) => {
    const botId = Date.now().toString(); // ID unik sederhana
    const bots = JSON.parse(localStorage.getItem('bots') || '{}');
    bots[botId] = botData;
    localStorage.setItem('bots', JSON.stringify(bots));
    router.push(`/chat/${botId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create Your AI Bot</h1>
      <CreateForm onCreate={handleCreate} />
    </div>
  );
}
