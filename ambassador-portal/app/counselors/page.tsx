'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { Counselor, COUNTRIES } from '@/types';
import Link from 'next/link';

export default function CounselorsPage() {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [filteredCounselors, setFilteredCounselors] = useState<Counselor[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterRelationship, setFilterRelationship] = useState('');
  const [formData, setFormData] = useState<Partial<Counselor>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    schoolId: '',
    schoolName: '',
    country: '',
    linkedIn: '',
    notes: '',
    relationshipStrength: 'Cold',
    preferredContactMethod: 'Email',
  });

  useEffect(() => {
    loadCounselors();
    setSchools(storage.schools.getAll());
  }, []);

  useEffect(() => {
    let filtered = counselors;

    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCountry) {
      filtered = filtered.filter(c => c.country === filterCountry);
    }

    if (filterRelationship) {
      filtered = filtered.filter(c => c.relationshipStrength === filterRelationship);
    }

    setFilteredCounselors(filtered);
  }, [counselors, searchTerm, filterCountry, filterRelationship]);

  const loadCounselors = () => {
    setCounselors(storage.counselors.getAll());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.schoolId) {
      const school = schools.find(s => s.id === formData.schoolId);
      if (school) {
        formData.schoolName = school.name;
        formData.country = school.country;
      }
    }
    
    storage.counselors.add(formData as any);
    loadCounselors();
    setShowForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      schoolId: '',
      schoolName: '',
      country: '',
      linkedIn: '',
      notes: '',
      relationshipStrength: 'Cold',
      preferredContactMethod: 'Email',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this counselor?')) {
      storage.counselors.delete(id);
      loadCounselors();
    }
  };

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Position', 'School', 'Country', 'LinkedIn', 'Relationship', 'Preferred Contact', 'Notes'];
    const rows = counselors.map(c => [
      c.firstName, c.lastName, c.email, c.phone || '', c.position, c.schoolName, c.country, 
      c.linkedIn || '', c.relationshipStrength, c.preferredContactMethod, c.notes
    ]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minerva-counselors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900">Counselors Database</h1>
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
              {showForm ? 'Cancel' : 'Add Counselor'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Counselor</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., College Counselor, Career Advisor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                <select
                  value={formData.schoolId}
                  onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select School (or enter manually below)</option>
                  {schools.map(s => <option key={s.id} value={s.id}>{s.name} - {s.country}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Name (if not in list) *</label>
                <input
                  type="text"
                  required={!formData.schoolId}
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <select
                  required={!formData.schoolId}
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.linkedIn}
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship Strength</label>
                <select
                  value={formData.relationshipStrength}
                  onChange={(e) => setFormData({ ...formData, relationshipStrength: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Cold">Cold</option>
                  <option value="Warm">Warm</option>
                  <option value="Strong">Strong</option>
                  <option value="Champion">Champion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                <select
                  value={formData.preferredContactMethod}
                  onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="In-Person">In-Person</option>
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
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Counselor
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Countries</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={filterRelationship}
              onChange={(e) => setFilterRelationship(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Relationships</option>
              <option value="Cold">Cold</option>
              <option value="Warm">Warm</option>
              <option value="Strong">Strong</option>
              <option value="Champion">Champion</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Relationship</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCounselors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No counselors found. Add your first counselor to get started!
                    </td>
                  </tr>
                ) : (
                  filteredCounselors.map((counselor) => (
                    <tr key={counselor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {counselor.firstName} {counselor.lastName}
                        </div>
                        {counselor.linkedIn && (
                          <a href={counselor.linkedIn} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                            LinkedIn
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`mailto:${counselor.email}`} className="text-sm text-blue-600 hover:underline">
                          {counselor.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{counselor.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{counselor.schoolName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{counselor.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          counselor.relationshipStrength === 'Champion' ? 'bg-green-100 text-green-800' :
                          counselor.relationshipStrength === 'Strong' ? 'bg-blue-100 text-blue-800' :
                          counselor.relationshipStrength === 'Warm' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {counselor.relationshipStrength}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(counselor.id)}
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
          Showing {filteredCounselors.length} of {counselors.length} counselors
        </div>
      </div>
    </div>
  );
}
