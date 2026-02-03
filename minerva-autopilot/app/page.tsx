'use client';

import { useAppStore } from '@/lib/store';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { CallList } from '@/components/CallList';
import { Events } from '@/components/Events';
import { Travel } from '@/components/Travel';
import { Confetti } from '@/components/Confetti';

export default function Home() {
  const currentTab = useAppStore((state) => state.currentTab);

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'calls':
        return <CallList />;
      case 'events':
        return <Events />;
      case 'travel':
        return <Travel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />
      {renderContent()}
      <Confetti />
    </main>
  );
}
