'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { Visit, COUNTRIES } from '@/types';
import Link from 'next/link';

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [filteredVisits, setFilteredVisits] = useState<Visit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [formData, setFormData] = useState<Partial<Visit>>({
    type: 'School Visit',
    schoolName: '',
    country: '',
    city: '',
    date: '',
    time: '',
    duration: '',
    status: 'Planned',
    notes: '',
    followUpRequired: false,
  });

  useEffect(() => {
    loadVisits();
  }, []);

  useEffect(() => {
    let filtered = visits;

    if (filterStatus) {
      filtered = filtered.filter(v => v.status === filterStatus);
    }

    if (filterCountry) {
      filtered = filtered.filter(v => v.country === filterCountry);
    }

    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredVisits(filtered);
  }, [visits, filterStatus, filterCountry]);

  const loadVisits = () => {
    setVisits(storage.visits.getAll());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storage.visits.add(formData as any);
    loadVisits();
    setShowForm(false);
    setFormData({
      type: 'School Visit',
      schoolName: '',
      country: '',
      city: '',
      date: '',
      time: '',
      duration: '',
      status: 'Planned',
      notes: '',
      followUpRequired: false,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this visit?')) {
      storage.visits.delete(id);
      loadVisits();
    }
  };

  const handleStatusUpdate = (id: string, newStatus: Visit['status']) => {
    storage.visits.update(id, { status: newStatus });
    loadVisits();
  };

  const exportToCSV = () => {
    const headers = ['Type', 'School', 'Country', 'City', 'Date', 'Time', 'Duration', 'Status', 'Attendees', 'Leads Generated', 'Notes'];
    const rows = visits.map(v => [
      v.type, v.schoolName, v.country, v.city, v.date, v.time || '', v.duration || '',
      v.status, v.attendees || '', v.leadsGenerated || '', v.notes
    ]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minerva-visits-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getUpcomingVisits = () => {
    const today = new Date();
    return visits.filter(v => {
      const visitDate = new Date(v.date);
      return visitDate >= today && v.status !== 'Completed' && v.status !== 'Cancelled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const upcomingVisits = getUpcomingVisits();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900">Visits & Events</h1>
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
              {showForm ? 'Cancel' : 'Schedule Visit'}
            </button>
          </div>
        </div>

        {upcomingVisits.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Upcoming Visits</h2>
            <div className="space-y-3">
              {upcomingVisits.slice(0, 5).map((visit) => (
                <div key={visit.id} className="flex justify-between items-center p-3 bg-white rounded border border-blue-100">
                  <div>
                    <p className="font-medium text-gray-900">{visit.schoolName}</p>
                    <p className="text-sm text-gray-600">{visit.city}, {visit.country} • {visit.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-900">{new Date(visit.date).toLocaleDateString()}</p>
                    {visit.time && <p className="text-sm text-gray-600">{visit.time}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Schedule New Visit</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="School Visit">School Visit</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Coffee Chat">Coffee Chat</option>
                  <option value="Information Session">Information Session</option>
                  <option value="Fair">Fair</option>
                  <option value="Family Discussion">Family Discussion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School/Organization Name *</label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 60 minutes, 1.5 hours"
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
                  <option value="Planned">Planned</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
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
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.followUpRequired}
                    onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Follow-up required after visit</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Schedule Visit
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Countries</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="Planned">Planned</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School/Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVisits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No visits scheduled. Add your first visit to get started!
                    </td>
                  </tr>
                ) : (
                  filteredVisits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(visit.date).toLocaleDateString()}
                        </div>
                        {visit.time && <div className="text-xs text-gray-500">{visit.time}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.schoolName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visit.city}, {visit.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={visit.status}
                          onChange={(e) => handleStatusUpdate(visit.id, e.target.value as any)}
                          className={`px-2 py-1 text-xs rounded-full border-0 ${
                            visit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            visit.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                            visit.status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="Planned">Planned</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(visit.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredVisits.length} of {visits.length} visits
        </div>
      </div>
    </div>
  );
}
