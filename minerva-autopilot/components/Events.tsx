'use client';

import { useMemo } from 'react';
import { getUpcomingEvents, fairs } from '@/lib/data';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Plane,
  Building2,
  ChevronRight,
  Globe,
} from 'lucide-react';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-4 h-4 text-success-500" />;
    case 'in_progress':
      return <Clock className="w-4 h-4 text-primary-500 animate-pulse" />;
    case 'waiting':
      return <Clock className="w-4 h-4 text-warm-500" />;
    default:
      return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
  }
};

const getUrgencyColor = (daysUntil: number) => {
  if (daysUntil <= 14) return 'border-l-warm-500 bg-warm-50';
  if (daysUntil <= 30) return 'border-l-primary-500 bg-primary-50';
  return 'border-l-slate-300 bg-white';
};

export function Events() {
  const confirmedEvents = useMemo(() => getUpcomingEvents(), []);

  // Get future fairs that haven't passed yet
  const upcomingFairs = useMemo(() => {
    const now = new Date();
    return fairs
      .filter(f => {
        if (!f.date) return false;
        // Try parsing the date
        const d = new Date(f.date);
        if (!isNaN(d.getTime()) && f.date.match(/^\d{4}-/)) return d > now;
        // Text dates like "Sep 16-19, 2025"
        const match = f.date.match(/(\w+)\s+(\d+).*?(\d{4})/);
        if (match) {
          const parsed = new Date(`${match[1]} ${match[2]}, ${match[3]}`);
          return !isNaN(parsed.getTime()) && parsed > now;
        }
        return false;
      })
      .slice(0, 10);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-warm-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Events & Fairs</h2>
            <p className="text-slate-600">
              {confirmedEvents.length} confirmed events, {upcomingFairs.length} upcoming fairs
            </p>
          </div>
        </div>
      </div>

      {/* Confirmed Events */}
      {confirmedEvents.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Confirmed Events</h3>
          <div className="space-y-6 mb-10">
            {confirmedEvents.map((event) => (
              <div
                key={event.id}
                className={`rounded-2xl border-l-4 shadow-sm overflow-hidden ${getUrgencyColor(event.daysUntil)}`}
              >
                <div className="p-6">
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-slate-900">{event.name}</h3>
                        {event.daysUntil <= 14 && event.daysUntil > 0 && (
                          <span className="px-2 py-0.5 bg-warm-100 text-warm-700 text-xs font-medium rounded-full">
                            Soon!
                          </span>
                        )}
                        {event.daysUntil <= 0 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                            Past
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.city}, {event.country}
                        </span>
                      </div>
                    </div>
                    {event.daysUntil > 0 && (
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          event.daysUntil <= 14 ? 'text-warm-600' : 'text-slate-400'
                        }`}>
                          {event.daysUntil}
                        </p>
                        <p className="text-xs text-slate-500">days away</p>
                      </div>
                    )}
                  </div>

                  {/* Personal Notes */}
                  {event.personalNotes && (
                    <div className="bg-white/80 rounded-xl p-3 mb-4 text-sm text-slate-600 border border-slate-200">
                      <p className="font-medium text-slate-700 mb-1">Your notes:</p>
                      <p>{event.personalNotes}</p>
                    </div>
                  )}

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Confirmed
                    </span>
                    {event.travelBooked ? (
                      <span className="px-3 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full flex items-center gap-1">
                        <Plane className="w-3 h-3" />
                        Travel booked
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full flex items-center gap-1">
                        <Plane className="w-3 h-3" />
                        Travel pending
                      </span>
                    )}
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {event.schoolsContacted}/{event.schoolsInArea} schools in {event.country}
                    </span>
                  </div>

                  {/* Hotels */}
                  {event.hotels && event.hotels.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-slate-500 mb-1">Hotel options:</p>
                      <div className="flex flex-wrap gap-2">
                        {event.hotels.map((hotel, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                            {hotel}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Preparation Timeline</h4>
                    <div className="space-y-2">
                      {event.timeline.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-sm"
                        >
                          {getStatusIcon(item.status)}
                          <span className={
                            item.status === 'completed' ? 'text-slate-400 line-through' :
                            item.status === 'in_progress' ? 'text-slate-900 font-medium' :
                            'text-slate-600'
                          }>
                            {item.task}
                          </span>
                          {item.status === 'in_progress' && (
                            <span className="ml-auto text-primary-600 text-xs font-medium flex items-center gap-1">
                              In progress
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Upcoming Fairs */}
      {upcomingFairs.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-400" />
            Upcoming University Fairs (FY26)
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
            {upcomingFairs.map((fair, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{fair.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {fair.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {fair.city}, {fair.country}
                      </span>
                    </div>
                    {fair.organization && (
                      <p className="text-xs text-slate-400 mt-1">by {fair.organization}</p>
                    )}
                    {fair.venue && (
                      <p className="text-xs text-slate-400">{fair.venue}</p>
                    )}
                  </div>
                  {fair.cost && (
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {fair.cost.substring(0, 30)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {confirmedEvents.length === 0 && upcomingFairs.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>No upcoming events found in the data.</p>
          <p className="text-sm mt-1">Events will appear here once the Google Sheets data is synced.</p>
        </div>
      )}
    </div>
  );
}
