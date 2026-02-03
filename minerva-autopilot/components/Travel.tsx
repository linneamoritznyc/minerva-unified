'use client';

import { useMemo } from 'react';
import { getUpcomingEvents, schools } from '@/lib/data';
import {
  Plane,
  Building,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Globe,
} from 'lucide-react';

export function Travel() {
  const upcomingEvents = useMemo(() => getUpcomingEvents().filter(e => e.daysUntil > 0), []);
  const nextEvent = upcomingEvents[0];

  // Get schools in the same country as the next event
  const schoolsForTrip = useMemo(() => {
    if (!nextEvent) return [];
    return schools
      .filter(s => s.country.toLowerCase() === nextEvent.country.toLowerCase())
      .sort((a, b) => {
        // Sort by relationship status (warm leads first)
        const order: Record<string, number> = { 'Visited': 0, 'Responded': 1, 'Contacted': 2, 'Not Contacted': 3 };
        return (order[a.relationshipStatus] ?? 3) - (order[b.relationshipStatus] ?? 3);
      })
      .slice(0, 8);
  }, [nextEvent]);

  if (!nextEvent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Travel Planning</h2>
              <p className="text-slate-600">Flight and hotel suggestions for your trips</p>
            </div>
          </div>
        </div>
        <div className="text-center py-12 text-slate-500">
          <Plane className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>No upcoming trips to plan yet.</p>
          <p className="text-sm mt-1">Travel suggestions will appear when you have confirmed events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Travel Planning</h2>
            <p className="text-slate-600">Plan your trip to {nextEvent.city}, {nextEvent.country}</p>
          </div>
        </div>
      </div>

      {/* Trip Overview Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-1">NEXT TRIP</p>
            <h3 className="text-2xl font-bold mb-2">{nextEvent.name}</h3>
            <div className="flex items-center gap-4 text-primary-100 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {nextEvent.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {nextEvent.city}, {nextEvent.country}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{nextEvent.daysUntil}</p>
            <p className="text-primary-100 text-sm">days away</p>
          </div>
        </div>

        {/* Urgency Alert */}
        {nextEvent.daysUntil <= 21 && !nextEvent.travelBooked && (
          <div className="mt-4 bg-white/10 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-warm-300" />
            <p className="text-sm">
              <span className="font-medium">Heads up:</span> Flight prices typically increase closer to departure.
              Book soon to save money!
            </p>
          </div>
        )}

        {/* Travel Status */}
        {nextEvent.travelBooked && nextEvent.flightsHotels && (
          <div className="mt-4 bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">Travel booked</span>
            </div>
            <p className="text-sm text-primary-100">{nextEvent.flightsHotels}</p>
          </div>
        )}
      </div>

      {/* Hotels from CRM data */}
      {nextEvent.hotels && nextEvent.hotels.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-slate-400" />
            Hotel Options (from your notes)
          </h3>
          <div className="space-y-3">
            {nextEvent.hotels.map((hotel, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-slate-100">
                <p className="font-medium text-slate-900">{hotel}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personal Notes */}
      {nextEvent.personalNotes && (
        <div className="bg-warm-50 border border-warm-200 rounded-2xl p-5 mb-6">
          <h4 className="font-semibold text-warm-800 mb-2">Your Travel Notes</h4>
          <p className="text-sm text-warm-700">{nextEvent.personalNotes}</p>
        </div>
      )}

      {/* School Visits During Trip */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-slate-400" />
          Schools in {nextEvent.country} to Visit ({schoolsForTrip.length})
        </h3>
        {schoolsForTrip.length === 0 ? (
          <p className="text-sm text-slate-500">No schools found in {nextEvent.country}.</p>
        ) : (
          <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100">
            {schoolsForTrip.map((school) => (
              <div key={school.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{school.name}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {school.city}
                    </span>
                    {school.contactName && (
                      <span>{school.contactName}</span>
                    )}
                    {school.phone && (
                      <span className="text-primary-600">{school.phone}</span>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  school.relationshipStatus === 'Responded' || school.relationshipStatus === 'Visited'
                    ? 'bg-success-100 text-success-700'
                    : school.relationshipStatus === 'Contacted'
                    ? 'bg-warm-100 text-warm-700'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {school.relationshipStatus}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Upcoming Trips */}
      {upcomingEvents.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-400" />
            Other Upcoming Trips
          </h3>
          <div className="space-y-3">
            {upcomingEvents.slice(1, 5).map((event) => (
              <div key={event.id} className="bg-white rounded-xl p-4 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{event.name}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.city}, {event.country}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-600">{event.daysUntil}</p>
                  <p className="text-xs text-slate-400">days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
