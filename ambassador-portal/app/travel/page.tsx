'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { TravelPlan, COUNTRIES } from '@/types';
import Link from 'next/link';

export default function TravelPage() {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<TravelPlan>>({
    destination: '',
    country: '',
    startDate: '',
    endDate: '',
    purpose: '',
    visits: [],
    transportation: [],
    accommodation: [],
    status: 'Planning',
    notes: '',
  });

  useEffect(() => {
    loadTravelPlans();
  }, []);

  const loadTravelPlans = () => {
    setTravelPlans(storage.travelPlans.getAll());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storage.travelPlans.add(formData as any);
    loadTravelPlans();
    setShowForm(false);
    setFormData({
      destination: '',
      country: '',
      startDate: '',
      endDate: '',
      purpose: '',
      visits: [],
      transportation: [],
      accommodation: [],
      status: 'Planning',
      notes: '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this travel plan?')) {
      storage.travelPlans.delete(id);
      loadTravelPlans();
    }
  };

  const addTransportation = () => {
    setFormData({
      ...formData,
      transportation: [
        ...(formData.transportation || []),
        { type: 'Flight', details: '', cost: 0, bookingReference: '' }
      ]
    });
  };

  const addAccommodation = () => {
    setFormData({
      ...formData,
      accommodation: [
        ...(formData.accommodation || []),
        { name: '', address: '', checkIn: '', checkOut: '', cost: 0, bookingReference: '' }
      ]
    });
  };

  const exportToCSV = () => {
    const headers = ['Destination', 'Country', 'Start Date', 'End Date', 'Purpose', 'Status', 'Total Budget', 'Actual Cost', 'Notes'];
    const rows = travelPlans.map(t => [
      t.destination, t.country, t.startDate, t.endDate, t.purpose, t.status,
      t.totalBudget || '', t.actualCost || '', t.notes
    ]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minerva-travel-plans-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getUpcomingTrips = () => {
    const today = new Date();
    return travelPlans.filter(t => {
      const startDate = new Date(t.startDate);
      return startDate >= today && t.status !== 'Completed';
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  };

  const upcomingTrips = getUpcomingTrips();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900">Travel Planning</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Export CSV
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Plan New Trip'}
            </button>
          </div>
        </div>

        {upcomingTrips.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Upcoming Trips</h2>
            <div className="space-y-3">
              {upcomingTrips.slice(0, 3).map((trip) => (
                <div key={trip.id} className="flex justify-between items-center p-4 bg-white rounded border border-blue-100">
                  <div>
                    <p className="font-medium text-gray-900">{trip.destination}, {trip.country}</p>
                    <p className="text-sm text-gray-600">{trip.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-900">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{trip.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Plan New Trip</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g., London, Paris, Berlin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose *</label>
                  <input
                    type="text"
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="e.g., School visits in London area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget (€)</label>
                  <input
                    type="number"
                    value={formData.totalBudget || ''}
                    onChange={(e) => setFormData({ ...formData, totalBudget: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Booked">Booked</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Travel Plan
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {travelPlans.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">No travel plans yet. Create your first trip to get started!</p>
            </div>
          ) : (
            travelPlans.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {plan.destination}, {plan.country}
                    </h3>
                    <p className="text-gray-600">{plan.purpose}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      plan.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      plan.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      plan.status === 'Booked' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {plan.status}
                    </span>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Dates</p>
                    <p className="font-medium">
                      {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  {plan.totalBudget && (
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">€{plan.totalBudget.toFixed(2)}</p>
                    </div>
                  )}
                  {plan.actualCost && (
                    <div>
                      <p className="text-sm text-gray-500">Actual Cost</p>
                      <p className="font-medium">€{plan.actualCost.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                {plan.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">{plan.notes}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Travel Planning Tips</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• <strong>Book Early:</strong> Reserve flights and accommodation 4-6 weeks in advance for best prices</li>
            <li>• <strong>Train Travel:</strong> Consider rail passes for multi-city trips within Europe</li>
            <li>• <strong>Accommodation:</strong> Look for hotels near schools or with good public transport access</li>
            <li>• <strong>Budget:</strong> Track all expenses for accurate reporting and future planning</li>
            <li>• <strong>Flexibility:</strong> Build buffer time between visits for travel delays</li>
            <li>• <strong>Documentation:</strong> Keep all booking confirmations and receipts organized</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
