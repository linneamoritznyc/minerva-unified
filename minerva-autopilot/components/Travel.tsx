'use client';

import {
  Plane,
  Building,
  Calendar,
  MapPin,
  Clock,
  Euro,
  Star,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

// Mock travel suggestions
const mockTripPlan = {
  event: {
    name: 'Paris CIS Education Fair',
    date: '2026-02-10',
    endDate: '2026-02-12',
    city: 'Paris',
    country: 'France',
    daysUntil: 9,
  },
  flights: [
    {
      id: 'f1',
      provider: 'SAS',
      price: 110,
      currency: 'EUR',
      outbound: {
        date: '2026-02-09',
        departure: '06:00',
        arrival: '08:30',
        duration: '2h 30m',
        from: 'Stockholm ARN',
        to: 'Paris CDG',
      },
      return: {
        date: '2026-02-12',
        departure: '20:00',
        arrival: '22:30',
        duration: '2h 30m',
        from: 'Paris CDG',
        to: 'Stockholm ARN',
      },
      recommended: true,
      reason: 'Cheapest option, good timing',
    },
    {
      id: 'f2',
      provider: 'Norwegian',
      price: 132,
      currency: 'EUR',
      outbound: {
        date: '2026-02-09',
        departure: '10:00',
        arrival: '12:30',
        duration: '2h 30m',
        from: 'Stockholm ARN',
        to: 'Paris CDG',
      },
      return: {
        date: '2026-02-12',
        departure: '18:00',
        arrival: '20:30',
        duration: '2h 30m',
        from: 'Paris CDG',
        to: 'Stockholm ARN',
      },
      recommended: false,
      reason: 'Better times (no 6 AM departure)',
    },
  ],
  hotels: [
    {
      id: 'h1',
      name: 'Hotel Arc La Rambla',
      price: 75,
      currency: 'EUR',
      perNight: true,
      nights: 3,
      rating: 8.2,
      distance: '10 min walk to venue',
      recommended: true,
      reason: 'Best value, close to venue',
    },
    {
      id: 'h2',
      name: 'Ibis Paris Expo',
      price: 68,
      currency: 'EUR',
      perNight: true,
      nights: 3,
      rating: 7.9,
      distance: '15 min walk to venue',
      recommended: false,
      reason: 'Cheapest, slightly further',
    },
  ],
  schoolVisits: [
    {
      school: 'International School of Paris',
      date: '2026-02-10',
      time: '14:00',
      confirmed: true,
    },
    {
      school: 'British School of Paris',
      date: '2026-02-11',
      time: '10:00',
      confirmed: true,
    },
    {
      school: 'Lycée International',
      date: '2026-02-11',
      time: '14:00',
      confirmed: false,
    },
  ],
};

export function Travel() {
  const recommendedFlight = mockTripPlan.flights.find(f => f.recommended);
  const recommendedHotel = mockTripPlan.hotels.find(h => h.recommended);
  const totalCost = (recommendedFlight?.price || 0) + ((recommendedHotel?.price || 0) * (recommendedHotel?.nights || 0));

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
            <p className="text-slate-600">Flight and hotel suggestions for your trips</p>
          </div>
        </div>
      </div>

      {/* Trip Overview Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-1">UPCOMING TRIP</p>
            <h3 className="text-2xl font-bold mb-2">{mockTripPlan.event.name}</h3>
            <div className="flex items-center gap-4 text-primary-100 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Feb 10-12, 2026
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {mockTripPlan.event.city}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{mockTripPlan.event.daysUntil}</p>
            <p className="text-primary-100 text-sm">days away</p>
          </div>
        </div>

        {/* Urgency Alert */}
        <div className="mt-4 bg-white/10 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-warm-300" />
          <p className="text-sm">
            <span className="font-medium">Heads up:</span> Flight prices typically increase 7 days before departure.
            Book soon to save money!
          </p>
        </div>
      </div>

      {/* Recommendation Summary */}
      <div className="bg-success-50 border border-success-200 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-success-600" />
          <h4 className="font-semibold text-success-800">My Recommendation</h4>
        </div>
        <p className="text-success-700 mb-3">
          Book <strong>{recommendedFlight?.provider}</strong> flight + <strong>{recommendedHotel?.name}</strong> =
          <strong> €{totalCost}</strong> total
        </p>
        <p className="text-sm text-success-600">
          This gives you the best balance of price and convenience. You&apos;ll arrive Feb 9 with time to prepare,
          and you have 2 school visits confirmed for Feb 10-11.
        </p>
      </div>

      {/* Flight Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Plane className="w-5 h-5 text-slate-400" />
          Flight Options
        </h3>
        <div className="space-y-4">
          {mockTripPlan.flights.map((flight) => (
            <div
              key={flight.id}
              className={`bg-white rounded-xl p-5 border-2 transition-colors ${
                flight.recommended
                  ? 'border-success-300 bg-success-50'
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600">
                    {flight.provider.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{flight.provider}</p>
                    {flight.recommended && (
                      <span className="inline-flex items-center gap-1 text-xs text-success-600 font-medium">
                        <Star className="w-3 h-3 fill-success-500" />
                        Recommended
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">€{flight.price}</p>
                  <p className="text-xs text-slate-500">round trip</p>
                </div>
              </div>

              {/* Flight Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">OUTBOUND • {flight.outbound.date}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{flight.outbound.departure}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-medium">{flight.outbound.arrival}</span>
                    <span className="text-xs text-slate-500">({flight.outbound.duration})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{flight.outbound.from} → {flight.outbound.to}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">RETURN • {flight.return.date}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{flight.return.departure}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-medium">{flight.return.arrival}</span>
                    <span className="text-xs text-slate-500">({flight.return.duration})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{flight.return.from} → {flight.return.to}</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-3">{flight.reason}</p>

              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg
                             transition-colors flex items-center justify-center gap-2">
                Book on {flight.provider}
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-slate-400" />
          Hotel Options (Budget: €80/night)
        </h3>
        <div className="space-y-4">
          {mockTripPlan.hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={`bg-white rounded-xl p-5 border-2 transition-colors ${
                hotel.recommended
                  ? 'border-success-300 bg-success-50'
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{hotel.name}</p>
                    {hotel.recommended && (
                      <span className="inline-flex items-center gap-1 text-xs text-success-600 font-medium">
                        <Star className="w-3 h-3 fill-success-500" />
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warm-500 fill-warm-500" />
                      {hotel.rating}/10
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {hotel.distance}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">€{hotel.price}</p>
                  <p className="text-xs text-slate-500">per night</p>
                  <p className="text-sm font-medium text-slate-600 mt-1">
                    €{hotel.price * hotel.nights} total ({hotel.nights} nights)
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-3">{hotel.reason}</p>

              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg
                             transition-colors flex items-center justify-center gap-2">
                View on Booking.com
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* School Visits */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-slate-400" />
          School Visits During This Trip
        </h3>
        <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100">
          {mockTripPlan.schoolVisits.map((visit, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{visit.school}</p>
                <p className="text-sm text-slate-500">
                  {new Date(visit.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  {' • '}{visit.time}
                </p>
              </div>
              {visit.confirmed ? (
                <span className="px-3 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Confirmed
                </span>
              ) : (
                <span className="px-3 py-1 bg-warm-100 text-warm-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
