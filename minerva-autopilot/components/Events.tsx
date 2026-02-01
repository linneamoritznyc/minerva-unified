'use client';

import {
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Plane,
  Building2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

// Mock events data
const mockEvents = [
  {
    id: '1',
    name: 'Paris CIS Education Fair',
    type: 'fair',
    date: '2026-02-10',
    endDate: '2026-02-12',
    city: 'Paris',
    country: 'France',
    venue: 'Paris Expo Porte de Versailles',
    registered: true,
    travelBooked: false,
    schoolsContacted: 8,
    schoolsConfirmed: 2,
    daysUntil: 9,
    timeline: [
      { task: 'Register for fair', status: 'completed' },
      { task: 'Contact schools within 50km', status: 'in_progress' },
      { task: 'Book flights', status: 'pending' },
      { task: 'Book hotel', status: 'pending' },
      { task: 'Confirm school visits', status: 'waiting' },
    ],
  },
  {
    id: '2',
    name: 'Helsinki University Fair',
    type: 'fair',
    date: '2026-03-15',
    city: 'Helsinki',
    country: 'Finland',
    venue: 'Messukeskus Helsinki',
    registered: true,
    travelBooked: false,
    schoolsContacted: 0,
    schoolsConfirmed: 0,
    daysUntil: 42,
    timeline: [
      { task: 'Register for fair', status: 'completed' },
      { task: 'Contact schools within 50km', status: 'pending' },
      { task: 'Book flights', status: 'pending' },
      { task: 'Book hotel', status: 'pending' },
      { task: 'Confirm school visits', status: 'pending' },
    ],
  },
  {
    id: '3',
    name: 'Barcelona Education Expo',
    type: 'fair',
    date: '2026-04-20',
    city: 'Barcelona',
    country: 'Spain',
    venue: 'Fira Barcelona',
    registered: false,
    travelBooked: false,
    schoolsContacted: 0,
    schoolsConfirmed: 0,
    daysUntil: 78,
    timeline: [
      { task: 'Decide if attending', status: 'pending' },
      { task: 'Register for fair', status: 'pending' },
      { task: 'Contact schools within 50km', status: 'pending' },
    ],
  },
];

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
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-warm-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
            <p className="text-slate-600">Your fairs, trips, and school visits</p>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {mockEvents.map((event) => (
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
                    {event.daysUntil <= 14 && (
                      <span className="px-2 py-0.5 bg-warm-100 text-warm-700 text-xs font-medium rounded-full">
                        Soon!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      })}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.city}, {event.country}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    event.daysUntil <= 14 ? 'text-warm-600' : 'text-slate-400'
                  }`}>
                    {event.daysUntil}
                  </p>
                  <p className="text-xs text-slate-500">days away</p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.registered ? (
                  <span className="px-3 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Registered
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Not registered
                  </span>
                )}
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
                  {event.schoolsConfirmed}/{event.schoolsContacted} schools confirmed
                </span>
              </div>

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

      {/* Add Event Button (placeholder) */}
      <div className="mt-8 text-center">
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2 mx-auto">
          <span className="text-xl">+</span>
          Add new event
        </button>
      </div>
    </div>
  );
}
