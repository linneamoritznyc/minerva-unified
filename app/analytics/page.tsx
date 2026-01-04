'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const schools = storage.schools.getAll();
    const counselors = storage.counselors.getAll();
    const students = storage.students.getAll();
    const visits = storage.visits.getAll();

    const schoolsByCountry = schools.reduce((acc: any, school) => {
      acc[school.country] = (acc[school.country] || 0) + 1;
      return acc;
    }, {});

    const studentsByCountry = students.reduce((acc: any, student) => {
      acc[student.country] = (acc[student.country] || 0) + 1;
      return acc;
    }, {});

    const studentsByEngagement = students.reduce((acc: any, student) => {
      acc[student.engagementLevel] = (acc[student.engagementLevel] || 0) + 1;
      return acc;
    }, {});

    const visitsByType = visits.reduce((acc: any, visit) => {
      acc[visit.type] = (acc[visit.type] || 0) + 1;
      return acc;
    }, {});

    setStats({
      totalSchools: schools.length,
      totalCounselors: counselors.length,
      totalStudents: students.length,
      totalVisits: visits.length,
      schoolsByCountry: Object.entries(schoolsByCountry).map(([name, value]) => ({ name, value })),
      studentsByCountry: Object.entries(studentsByCountry).map(([name, value]) => ({ name, value })),
      studentsByEngagement: Object.entries(studentsByEngagement).map(([name, value]) => ({ name, value })),
      visitsByType: Object.entries(visitsByType).map(([name, value]) => ({ name, value })),
    });
  }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600 mt-2">
            Track your outreach performance and engagement metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 text-sm">Total Schools</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalSchools || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 text-sm">Total Counselors</p>
            <p className="text-3xl font-bold text-green-600">{stats.totalCounselors || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 text-sm">Total Students</p>
            <p className="text-3xl font-bold text-purple-600">{stats.totalStudents || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 text-sm">Total Visits</p>
            <p className="text-3xl font-bold text-orange-600">{stats.totalVisits || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Schools by Country</h2>
            {stats.schoolsByCountry && stats.schoolsByCountry.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.schoolsByCountry.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-12">No data available</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Student Engagement Levels</h2>
            {stats.studentsByEngagement && stats.studentsByEngagement.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.studentsByEngagement}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.studentsByEngagement.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-12">No data available</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Students by Country</h2>
            {stats.studentsByCountry && stats.studentsByCountry.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.studentsByCountry.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-12">No data available</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Visits by Type</h2>
            {stats.visitsByType && stats.visitsByType.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.visitsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.visitsByType.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-12">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
