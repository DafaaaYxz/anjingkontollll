const API_KEY = 'AIzaSyBywyuARVnFRcSMDerQJ2PZ_DZWHt5XaxA';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${API_KEY}&alt=sse`;

export async function generateResponse(persona: string, userMessage: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: `${persona}\n\nUser: ${userMessage}\nBot:` }
          ]
        }
      ]
    })
  });

  if (!response.ok) throw new Error('API Error');

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            result += data.candidates[0].content.parts[0].text;
          }
        } catch {}
      }
    }
  }

  return result || 'No response';
}
