'use client';

import { useAppStore, getRandomEncouragement } from '@/lib/store';
import {
  Phone,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin
} from 'lucide-react';

// Mock data for initial display
const mockUpcomingEvents = [
  {
    id: '1',
    name: 'Paris CIS Education Fair',
    date: '2026-02-10',
    city: 'Paris',
    country: 'France',
    daysUntil: 9,
  },
  {
    id: '2',
    name: 'Helsinki University Fair',
    date: '2026-03-15',
    city: 'Helsinki',
    country: 'Finland',
    daysUntil: 42,
  },
];

const mockRecentWins = [
  { text: 'Called International School of Paris', time: '2 hours ago' },
  { text: 'Confirmed visit with Lycée International', time: 'Yesterday' },
  { text: 'Booked flight to Paris', time: '2 days ago' },
];

export function Dashboard() {
  const { completedTasks, setCurrentTab, triggerConfetti } = useAppStore();

  const handleStartCalling = () => {
    setCurrentTab('calls');
  };

  const stats = {
    schoolsThisWeek: 8,
    confirmedVisits: 3,
    streak: 4,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Good morning, Linnea! <span className="wave">👋</span>
        </h2>
        <p className="text-lg text-slate-600">
          Let&apos;s make today amazing. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Priority Action Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-2">YOUR PRIORITY TODAY</p>
            <h3 className="text-2xl font-bold mb-3">
              Call schools near Paris before your trip
            </h3>
            <p className="text-primary-100 mb-4">
              You&apos;re going to Paris on Feb 10. I&apos;ve found 8 schools within 50km
              that you should reach out to this week.
            </p>
            <button
              onClick={handleStartCalling}
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold
                       hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              View Call List
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center">
              <Phone className="w-16 h-16 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Your Progress</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Schools contacted this week</span>
                <span className="font-semibold text-slate-900">{stats.schoolsThisWeek}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full"
                  style={{ width: `${(stats.schoolsThisWeek / 10) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Visits confirmed</span>
                <span className="font-semibold text-slate-900">{stats.confirmedVisits}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
                  style={{ width: `${(stats.confirmedVisits / 5) * 100}%` }}
                />
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{stats.streak} day streak!</p>
                  <p className="text-xs text-slate-500">Keep it going!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-warm-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-warm-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Upcoming Events</h3>
          </div>
          <div className="space-y-3">
            {mockUpcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{event.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span>{event.city}, {event.country}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${
                      event.daysUntil <= 14 ? 'text-warm-600' : 'text-slate-500'
                    }`}>
                      {event.daysUntil} days
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCurrentTab('events')}
            className="w-full mt-4 text-sm text-primary-600 font-medium hover:text-primary-700
                     flex items-center justify-center gap-1"
          >
            View all events
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Wins */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Recent Wins</h3>
          </div>
          <div className="space-y-3">
            {mockRecentWins.map((win, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-success-50 rounded-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{win.text}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {win.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 text-center">
        <p className="text-lg text-slate-600">
          Every call you make helps a brilliant student discover Minerva.
          <span className="font-medium text-slate-900"> You&apos;re making a difference!</span>
        </p>
      </div>
    </div>
  );
}
