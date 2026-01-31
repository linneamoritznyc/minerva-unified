'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({
    schools: 0,
    counselors: 0,
    students: 0,
    visits: 0,
    upcomingVisits: 0,
    followUps: 0,
  });

  useEffect(() => {
    const schools = storage.schools.getAll();
    const counselors = storage.counselors.getAll();
    const students = storage.students.getAll();
    const visits = storage.visits.getAll();
    
    const today = new Date();
    const upcomingVisits = visits.filter(v => {
      const visitDate = new Date(v.date);
      return visitDate >= today && v.status !== 'Completed' && v.status !== 'Cancelled';
    }).length;

    const followUps = [
      ...counselors.filter(c => c.nextFollowUpDate && new Date(c.nextFollowUpDate) <= today),
      ...students.filter(s => s.nextFollowUpDate && new Date(s.nextFollowUpDate) <= today),
    ].length;

    setStats({
      schools: schools.length,
      counselors: counselors.length,
      students: students.length,
      visits: visits.length,
      upcomingVisits,
      followUps,
    });
  }, []);

  const cards = [
    { title: 'Schools', count: stats.schools, href: '/schools', color: 'bg-blue-500' },
    { title: 'Counselors', count: stats.counselors, href: '/counselors', color: 'bg-green-500' },
    { title: 'Students', count: stats.students, href: '/students', color: 'bg-purple-500' },
    { title: 'Visits', count: stats.visits, href: '/visits', color: 'bg-orange-500' },
    { title: 'Upcoming Visits', count: stats.upcomingVisits, href: '/visits', color: 'bg-red-500' },
    { title: 'Follow-ups Due', count: stats.followUps, href: '/follow-ups', color: 'bg-yellow-500' },
  ];

  const quickLinks = [
    { title: 'Email Templates', href: '/email-templates', description: 'Access pre-written email templates for outreach' },
    { title: 'Workshop Materials', href: '/workshops', description: 'View and download workshop presentations' },
    { title: 'Travel Planning', href: '/travel', description: 'Plan and track your travel across Europe' },
    { title: 'Research Tools', href: '/research', description: 'Find talented students and top schools' },
    { title: 'Analytics', href: '/analytics', description: 'View performance metrics and insights' },
    { title: 'Export Data', href: '/export', description: 'Export all data for backup or reporting' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Minerva Ambassador Portal
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Welcome, Linnea Moritz
          </p>
          <p className="text-gray-500">
            Alumni Ambassador - Western Europe & Nordic Region
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Link key={card.title} href={card.href}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{card.count}</p>
                    </div>
                    <div className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                      <span className="text-white text-2xl font-bold">{card.count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h3>
                  <p className="text-gray-600 text-sm">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About Your Role</h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Region:</strong> Western Europe & Nordic Region (30+ countries)
            </p>
            <p>
              <strong>Primary Goals:</strong> Increase brand awareness, conduct school visits, 
              build counselor relationships, and support prospective students through the application process.
            </p>
            <p>
              <strong>Calendly:</strong>{' '}
              <a 
                href="https://calendly.com/linnea-moritz-uni" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://calendly.com/linnea-moritz-uni
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
