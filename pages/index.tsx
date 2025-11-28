import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Create AI and Share</h1>
      <p>Buat bot AI Anda sendiri dan share ke teman-teman!</p>
      <Link href="/create">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Create AI Bot</button>
      </Link>
    </div>
  );
}
