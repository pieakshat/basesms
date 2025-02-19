import { Header } from '../app/components/layout/Header';
import { ChatInterface } from '../app/components/messenger/ChatInterface';
import { Providers } from './providers';

export default function Home() {
  return (
    <Providers>
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <ChatInterface />
        </div>
      </main>
    </Providers>
  );
}