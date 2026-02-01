'use client';

import { useAppStore } from '@/lib/store';
import { Home, Phone, Calendar, Plane, Sparkles } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'calls', label: 'Call List', icon: Phone },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'travel', label: 'Travel', icon: Plane },
] as const;

export function Navigation() {
  const { currentTab, setCurrentTab } = useAppStore();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Minerva Autopilot</h1>
              <p className="text-xs text-slate-500">Your AI Executive Assistant</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                    ${isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* User info */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">Linnea Moritz</p>
              <p className="text-xs text-slate-500">Western Europe</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-warm-400 to-warm-500 rounded-full flex items-center justify-center text-white font-bold">
              LM
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
