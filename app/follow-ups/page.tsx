'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import Link from 'next/link';

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<any[]>([]);

  useEffect(() => {
    const counselors = storage.counselors.getAll();
    const students = storage.students.getAll();
    const today = new Date();

    const counselorFollowUps = counselors
      .filter(c => c.nextFollowUpDate && new Date(c.nextFollowUpDate) <= today)
      .map(c => ({
        type: 'Counselor',
        name: `${c.firstName} ${c.lastName}`,
        email: c.email,
        organization: c.schoolName,
        date: c.nextFollowUpDate,
        notes: c.notes,
      }));

    const studentFollowUps = students
      .filter(s => s.nextFollowUpDate && new Date(s.nextFollowUpDate) <= today)
      .map(s => ({
        type: 'Student',
        name: `${s.firstName} ${s.lastName}`,
        email: s.email,
        organization: s.schoolName,
        date: s.nextFollowUpDate,
        notes: s.notes,
      }));

    setFollowUps([...counselorFollowUps, ...studentFollowUps].sort((a, b) => 
      new Date(a.date || '').getTime() - new Date(b.date || '').getTime()
    ));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">Follow-ups Due</h1>
          <p className="text-gray-600 mt-2">
            Contacts that require follow-up attention
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {followUps.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>No follow-ups due at this time. Great job staying on top of your contacts!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {followUps.map((item, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.type === 'Counselor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{item.organization}</p>
                      <a href={`mailto:${item.email}`} className="text-sm text-blue-600 hover:underline">
                        {item.email}
                      </a>
                      {item.notes && (
                        <p className="mt-2 text-sm text-gray-700">{item.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="font-medium text-red-600">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
