import { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../utils/api';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface Props {
  bot: { name: string; persona: string; image: string };
}

export default function ChatInterface({ bot }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateResponse(bot.persona, input);
      const botMessage: Message = { text: response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: 'Error: Could not get response.', sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '10px', background: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
        <img src={bot.image} alt={bot.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <h2>{bot.name}</h2>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <div style={{
              display: 'inline-block',
              padding: '10px',
              borderRadius: '10px',
              background: msg.sender === 'user' ? '#007bff' : '#e9ecef',
              color: msg.sender === 'user' ? 'white' : 'black'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && <div>Bot is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ padding: '10px', display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, padding: '10px' }}
        />
        <button onClick={handleSend} style={{ padding: '10px' }}>Send</button>
      </div>
    </div>
  );
}
