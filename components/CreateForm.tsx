import { useState } from 'react';

interface Props {
  onCreate: (data: { name: string; persona: string; image: string }) => void;
}

export default function CreateForm({ onCreate }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const persona = `You are an AI bot with this persona: ${description}. Respond helpfully and in character.`;
    onCreate({ name, persona, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Bot Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description (Persona):</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Profile Image URL:</label>
        <input type="url" value={image} onChange={(e) => setImage(e.target.value)} required />
      </div>
      <button type="submit">Create Bot</button>
    </form>
  );
}
