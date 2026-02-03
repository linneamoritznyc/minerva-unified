'use client';

import { useAppStore } from '@/lib/store';
import { getDashboardStats, getUpcomingEvents, getCountryBreakdown } from '@/lib/data';
import {
  Phone,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  MapPin,
  Globe,
} from 'lucide-react';

export function Dashboard() {
  const { completedTasks, setCurrentTab } = useAppStore();
  const stats = getDashboardStats();
  const upcomingEvents = getUpcomingEvents().filter(e => e.daysUntil > 0).slice(0, 3);
  const countries = getCountryBreakdown().slice(0, 6);

  const nextEvent = upcomingEvents[0];
  const totalContacted = stats.schoolsContacted + stats.schoolsResponded + stats.schoolsVisited;
  const contactProgress = Math.round((totalContacted / stats.totalSchools) * 100);

  const handleStartCalling = () => {
    setCurrentTab('calls');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Hey Linnea! <span className="wave">👋</span>
        </h2>
        <p className="text-lg text-slate-600">
          Here&apos;s your overview. You&apos;ve got {stats.totalSchools} schools across {stats.countriesCovered} countries.
        </p>
      </div>

      {/* Priority Action Card */}
      {nextEvent && (
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-100 text-sm font-medium mb-2">YOUR PRIORITY</p>
              <h3 className="text-2xl font-bold mb-3">
                {nextEvent.daysUntil <= 14
                  ? `Call schools in ${nextEvent.country} before ${nextEvent.name}`
                  : `Prepare for ${nextEvent.name} in ${nextEvent.city}`
                }
              </h3>
              <p className="text-primary-100 mb-4">
                {nextEvent.name} is in {nextEvent.daysUntil} days.
                {nextEvent.schoolsInArea > 0 && (
                  <> You have {nextEvent.schoolsInArea} schools in {nextEvent.country} — {nextEvent.schoolsContacted} already contacted.</>
                )}
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
                <div className="text-center">
                  <p className="text-4xl font-bold">{nextEvent.daysUntil}</p>
                  <p className="text-primary-200 text-sm">days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* CRM Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">School Outreach</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Overall progress</span>
                <span className="font-semibold text-slate-900">{totalContacted}/{stats.totalSchools} ({contactProgress}%)</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full transition-all"
                  style={{ width: `${contactProgress}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-500">Contacted</p>
                <p className="font-bold text-lg text-slate-900">{stats.schoolsContacted}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-500">Responded</p>
                <p className="font-bold text-lg text-success-600">{stats.schoolsResponded}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-500">Visited</p>
                <p className="font-bold text-lg text-primary-600">{stats.schoolsVisited}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-500">Not yet</p>
                <p className="font-bold text-lg text-slate-400">{stats.schoolsNotContacted}</p>
              </div>
            </div>
            {completedTasks.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{completedTasks.length} calls completed!</p>
                    <p className="text-xs text-slate-500">Keep going!</p>
                  </div>
                </div>
              </div>
            )}
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
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No upcoming events in the data yet.</p>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  onClick={() => setCurrentTab('events')}
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
              ))
            )}
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

        {/* Countries Coverage */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Countries</h3>
          </div>
          <div className="space-y-2">
            {countries.map((c) => (
              <div key={c.country} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">{c.country}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{c.contacted}/{c.total}</span>
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-400 rounded-full"
                      style={{ width: `${c.total > 0 ? (c.contacted / c.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {stats.countriesCovered} countries total
          </p>
        </div>
      </div>

      {/* Recent Wins */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Recent Wins</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {completedTasks.slice(0, 6).map((task, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-success-50 rounded-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{task.taskDescription}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {task.celebration.emoji} {task.celebration.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
