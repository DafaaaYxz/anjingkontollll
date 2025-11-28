export interface BotData {
  name: string;
  persona: string;
  image: string;
}

export interface Message {
  text: string;
  sender: 'user' | 'bot';
}
