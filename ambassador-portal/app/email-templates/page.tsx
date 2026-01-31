'use client';

import { useState } from 'react';
import { emailTemplates, generateEmail } from '@/lib/emailTemplates';
import Link from 'next/link';

export default function EmailTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof emailTemplates>('counselorIntroduction');
  const [replacements, setReplacements] = useState<Record<string, string>>({});
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);

  const templateOptions = [
    { key: 'counselorIntroduction', label: 'Counselor Introduction' },
    { key: 'counselorFollowUp', label: 'Counselor Follow-Up' },
    { key: 'studentReconnection', label: 'Student Reconnection (After Fair/Event)' },
    { key: 'workshopInvitation', label: 'Workshop Invitation' },
    { key: 'familyDiscussion', label: 'Family Discussion Invitation' },
    { key: 'olympiadWinner', label: 'Olympiad Winner Outreach' },
    { key: 'applicationSupport', label: 'Application Support' },
  ];

  const placeholderFields: Record<keyof typeof emailTemplates, string[]> = {
    counselorIntroduction: ['Counselor Name'],
    counselorFollowUp: ['Counselor Name', 'Country/City'],
    studentReconnection: ['Student Name', 'Event Name', 'Location', 'specific topic discussed'],
    workshopInvitation: ['Counselor Name', 'School Name', 'Suggest 2-3 date ranges'],
    familyDiscussion: ['Student/Family Name', 'Student Name'],
    olympiadWinner: ['Student Name', 'Olympiad Name', 'subject area', 'relevant major/concentration'],
    applicationSupport: ['Student Name', 'Date'],
  };

  const handleGenerate = () => {
    const email = generateEmail(selectedTemplate, replacements);
    setGeneratedEmail(email);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleCopyAll = () => {
    if (generatedEmail) {
      const fullEmail = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
      navigator.clipboard.writeText(fullEmail);
      alert('Full email copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-600 mt-2">
            Professional email templates for counselor outreach, student engagement, and follow-ups
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Select Template</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
              <select
                value={selectedTemplate}
                onChange={(e) => {
                  setSelectedTemplate(e.target.value as keyof typeof emailTemplates);
                  setReplacements({});
                  setGeneratedEmail(null);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {templateOptions.map(opt => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Customize Template</h3>
              <p className="text-sm text-gray-600 mb-4">
                Fill in the placeholders below to personalize your email:
              </p>
              
              {placeholderFields[selectedTemplate].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={replacements[field] || ''}
                    onChange={(e) => setReplacements({ ...replacements, [field]: e.target.value })}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Email
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Email</h2>
              {generatedEmail && (
                <button
                  onClick={handleCopyAll}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Copy All
                </button>
              )}
            </div>

            {!generatedEmail ? (
              <div className="text-center text-gray-500 py-12">
                <p>Fill in the fields and click "Generate Email" to see your personalized email here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                    <button
                      onClick={() => handleCopy(generatedEmail.subject)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="text-sm font-medium">{generatedEmail.subject}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Email Body</label>
                    <button
                      onClick={() => handleCopy(generatedEmail.body)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded border border-gray-200 max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-sans">{generatedEmail.body}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Effective Outreach</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Personalize:</strong> Always customize the template with specific details about the recipient</li>
            <li>• <strong>Be Concise:</strong> Keep emails brief and focused on one clear call-to-action</li>
            <li>• <strong>Follow Up:</strong> Send a follow-up email 5-7 days after initial contact if no response</li>
            <li>• <strong>Timing:</strong> Send emails on Tuesday-Thursday mornings for best response rates</li>
            <li>• <strong>Calendly Link:</strong> Always include your Calendly link to make scheduling easy</li>
            <li>• <strong>Track:</strong> Log all outreach in the database to maintain relationship history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
