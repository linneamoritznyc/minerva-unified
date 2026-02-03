'use client';

import { useState, useMemo } from 'react';
import { useAppStore, getRandomEncouragement } from '@/lib/store';
import { getCallList, getUpcomingEvents } from '@/lib/data';
import {
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  Calendar,
  Building2,
  MessageSquare,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import type { CallListItem, TaskCompletion } from '@/types';

interface CallCardProps {
  item: CallListItem;
  onComplete: () => void;
}

function CallCard({ item, onComplete }: CallCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);

  const copyScript = async () => {
    await navigator.clipboard.writeText(item.script);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Responded':
      case 'Visited':
        return 'bg-success-100 text-success-700';
      case 'Contacted':
        return 'bg-warm-100 text-warm-700';
      case 'Not Contacted':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const phoneNumber = item.school.phone || item.school.email;
  const contactDisplay = item.school.contactName || item.school.contactTitle || 'School office';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-bold text-lg flex-shrink-0">
              #{item.priority}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{item.school.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                <span>{item.school.city}, {item.school.country}</span>
                {item.school.curriculum && (
                  <>
                    <span className="mx-1">·</span>
                    <Building2 className="w-4 h-4" />
                    <span>{item.school.curriculum}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.school.relationshipStatus)}`}>
            {item.school.relationshipStatus}
          </span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-medium">{contactDisplay}</span>
          </div>
          {item.school.phone && (
            <a
              href={`tel:${item.school.phone}`}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Phone className="w-4 h-4" />
              {item.school.phone}
            </a>
          )}
          {!item.school.phone && item.school.email && (
            <span className="text-sm text-slate-500">{item.school.email}</span>
          )}
          {item.bestTimeToCall && (
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Clock className="w-4 h-4" />
              Best time: {item.bestTimeToCall} ({item.timezone})
            </div>
          )}
        </div>

        {/* Priority Reason */}
        <div className="bg-primary-50 rounded-xl p-3 mb-4">
          <p className="text-sm text-primary-700">
            <span className="font-medium">Why call now:</span> {item.priorityReason}
          </p>
        </div>

        {/* Related Event Badge */}
        {item.relatedEvent && (
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-warm-500" />
            <span className="text-sm text-slate-600">
              Related to: <span className="font-medium">{item.relatedEvent.name}</span>
              {item.relatedEvent.date && (
                <> ({item.relatedEvent.date})</>
              )}
            </span>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide call script
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show call script & talking points
            </>
          )}
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-slate-100 p-5 bg-slate-50">
          {/* Previous Contact Info */}
          {item.school.lastContactDate && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Previous Contact
              </h4>
              <div className="bg-white rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <span className="font-medium">{item.school.lastContactType || 'Outreach'}</span>
                  <span>·</span>
                  <span>{item.school.lastContactDate}</span>
                </div>
                {item.school.activityNotes && (
                  <p className="text-slate-700">{item.school.activityNotes}</p>
                )}
              </div>
            </div>
          )}

          {/* Call Script */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-700">Call Script</h4>
              <button
                onClick={copyScript}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
                  scriptCopied
                    ? 'bg-success-100 text-success-700'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {scriptCopied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-white rounded-xl p-4 text-slate-700 text-sm leading-relaxed border border-slate-200">
              {item.script}
            </div>
          </div>

          {/* Talking Points */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Talking Points</h4>
            <ul className="space-y-2">
              {item.talkingPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-primary-500 mt-0.5">·</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={onComplete}
            className="w-full bg-success-500 hover:bg-success-600 text-white font-medium py-3 px-4 rounded-xl
                     transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Mark Call Complete
          </button>
        </div>
      )}
    </div>
  );
}

export function CallList() {
  const { addCompletedTask, triggerConfetti } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');

  const allCallItems = useMemo(() => getCallList(), []);
  const upcomingEvents = useMemo(() => getUpcomingEvents().filter(e => e.daysUntil > 0), []);
  const nextEvent = upcomingEvents[0];

  // Get unique countries from call list
  const countries = useMemo(() => {
    const set = new Set(allCallItems.map(i => i.school.country));
    return Array.from(set).sort();
  }, [allCallItems]);

  // Filter call items
  const callItems = useMemo(() => {
    return allCallItems.filter(item => {
      if (filterCountry !== 'all' && item.school.country !== filterCountry) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.school.name.toLowerCase().includes(q) ||
          item.school.city.toLowerCase().includes(q) ||
          item.school.country.toLowerCase().includes(q) ||
          (item.school.contactName && item.school.contactName.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [allCallItems, filterCountry, searchQuery]);

  const handleComplete = (item: CallListItem) => {
    const encouragement = getRandomEncouragement();
    const task: TaskCompletion = {
      taskId: `call-${item.school.id}-${Date.now()}`,
      taskDescription: `Called ${item.school.name}`,
      completedAt: new Date().toISOString(),
      celebration: encouragement,
    };
    addCompletedTask(task);
    triggerConfetti();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Call List</h2>
            <p className="text-slate-600">
              {allCallItems.length} schools prioritized by upcoming events
            </p>
          </div>
        </div>
      </div>

      {/* Event Context */}
      {nextEvent && (
        <div className="bg-gradient-to-r from-warm-50 to-warm-100 rounded-2xl p-5 mb-6 border border-warm-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-warm-600" />
            <div>
              <p className="font-semibold text-warm-800">{nextEvent.name}</p>
              <p className="text-sm text-warm-600">
                {nextEvent.date} · {nextEvent.city}, {nextEvent.country} · {nextEvent.daysUntil} days away
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-warm-700">
            Schools in {nextEvent.country} are prioritized first. Calling now gives you the
            best chance to book school visits during your trip!
          </p>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="pl-10 pr-8 py-2 rounded-xl border border-slate-200 text-sm appearance-none
                     focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 bg-white"
          >
            <option value="all">All countries</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Call List */}
      <div className="space-y-4">
        {callItems.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Phone className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No schools match your current filters.</p>
          </div>
        ) : (
          callItems.slice(0, 20).map((item) => (
            <CallCard
              key={item.school.id}
              item={item}
              onComplete={() => handleComplete(item)}
            />
          ))
        )}
        {callItems.length > 20 && (
          <p className="text-center text-sm text-slate-500 py-4">
            Showing 20 of {callItems.length} schools. Use search or country filter to find specific schools.
          </p>
        )}
      </div>

      {/* Encouragement Footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
          <Sparkles className="w-5 h-5 text-warm-500" />
          <p className="text-slate-600 text-sm">
            Each call gets you closer to helping amazing students discover Minerva!
          </p>
        </div>
      </div>
    </div>
  );
}
