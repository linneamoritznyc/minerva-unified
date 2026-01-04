'use client';

import { useState } from 'react';
import { COUNTRIES, OLYMPIADS } from '@/types';
import Link from 'next/link';

export default function ResearchPage() {
  const [selectedCountry, setSelectedCountry] = useState('');

  const topSchoolsByCountry: Record<string, string[]> = {
    'United Kingdom': [
      'Eton College', 'Westminster School', 'St Paul\'s School', 'Winchester College',
      'Sevenoaks School', 'Brighton College', 'Dulwich College', 'King\'s College School'
    ],
    'Germany': [
      'Salem International College', 'Schule Schloss Salem', 'St. George\'s School',
      'Louisenlund', 'Birklehof', 'Schule Birklehof'
    ],
    'France': [
      'Lycée Louis-le-Grand', 'Lycée Henri-IV', 'Lycée Saint-Louis',
      'École Alsacienne', 'Lycée International de Saint-Germain-en-Laye'
    ],
    'Sweden': [
      'Katedralskolan Uppsala', 'Norra Real', 'Östra Real', 'Viktor Rydberg Gymnasium',
      'Hvitfeldtska gymnasiet', 'Polhemskolan'
    ],
    'Switzerland': [
      'Institut Le Rosey', 'Institut auf dem Rosenberg', 'Aiglon College',
      'Collège du Léman', 'International School of Geneva'
    ],
    'Netherlands': [
      'Gymnasium Haganum', 'Stedelijk Gymnasium Leiden', 'Erasmiaans Gymnasium',
      'Gymnasium Celeanum', 'Christelijk Gymnasium Utrecht'
    ],
    'Spain': [
      'Colegio Estudio', 'Liceo Europeo', 'SEK International Schools',
      'American School of Barcelona', 'King\'s College Madrid'
    ],
    'Italy': [
      'Liceo Classico Ennio Quirino Visconti', 'Liceo Classico Massimo D\'Azeglio',
      'International School of Milan', 'American School of Milan'
    ],
    'Norway': [
      'Oslo Katedralskole', 'Bergen Katedralskole', 'Trondheim Katedralskole',
      'Stavanger Katedralskole', 'Nissen videregående skole'
    ],
    'Denmark': [
      'Metropolitanskolen', 'Ordrup Gymnasium', 'Copenhagen International School',
      'Rysensteen Gymnasium', 'Gammel Hellerup Gymnasium'
    ],
    'Finland': [
      'Helsinki International School', 'Ressun lukio', 'Helsingin normaalilyseo',
      'Kuopion Lyseon lukio', 'Turun normaalikoulu'
    ],
    'Austria': [
      'Theresianum', 'Schottengymnasium', 'American International School Vienna',
      'Vienna International School', 'Akademisches Gymnasium Wien'
    ],
    'Belgium': [
      'International School of Brussels', 'British School of Brussels',
      'European School Brussels', 'St. John\'s International School'
    ],
    'Ireland': [
      'St. Andrew\'s College', 'Blackrock College', 'Gonzaga College',
      'Wesley College', 'The High School Dublin'
    ],
    'Portugal': [
      'St. Julian\'s School', 'Carlucci American International School',
      'International School of Lisbon', 'Oporto British School'
    ]
  };

  const competitionResources = [
    {
      name: 'International Mathematical Olympiad (IMO)',
      website: 'https://www.imo-official.org/',
      description: 'Find top mathematics students from each country',
      searchTips: 'Look for national team members and medal winners'
    },
    {
      name: 'International Physics Olympiad (IPhO)',
      website: 'https://www.ipho-new.org/',
      description: 'Identify exceptional physics students',
      searchTips: 'Check country delegations and results'
    },
    {
      name: 'International Chemistry Olympiad (IChO)',
      website: 'https://www.icho-official.org/',
      description: 'Find talented chemistry students',
      searchTips: 'Review medal winners and honorable mentions'
    },
    {
      name: 'International Olympiad in Informatics (IOI)',
      website: 'https://ioinformatics.org/',
      description: 'Discover computer science prodigies',
      searchTips: 'Look for contestants with multiple participations'
    },
    {
      name: 'International Biology Olympiad (IBO)',
      website: 'https://www.ibo-info.org/',
      description: 'Identify biology and life sciences talent',
      searchTips: 'Check national teams and practical exam winners'
    },
    {
      name: 'International Science and Engineering Fair (ISEF)',
      website: 'https://www.societyforscience.org/isef/',
      description: 'Find students with research experience',
      searchTips: 'Look for category winners and special awards'
    },
    {
      name: 'World Schools Debating Championships',
      website: 'https://www.schoolsdebate.com/',
      description: 'Identify articulate critical thinkers',
      searchTips: 'Check team rosters and speaker awards'
    }
  ];

  const onlineResources = [
    {
      name: 'Art of Problem Solving (AoPS)',
      website: 'https://artofproblemsolving.com/',
      description: 'Online community for mathematically talented students',
      usage: 'Browse forums and competition results'
    },
    {
      name: 'Codeforces',
      website: 'https://codeforces.com/',
      description: 'Competitive programming platform',
      usage: 'Search for top-rated users by country'
    },
    {
      name: 'GitHub',
      website: 'https://github.com/',
      description: 'Find students with impressive coding projects',
      usage: 'Search for young developers with notable repositories'
    },
    {
      name: 'Kaggle',
      website: 'https://www.kaggle.com/',
      description: 'Data science competition platform',
      usage: 'Look for young competitors with high rankings'
    },
    {
      name: 'LinkedIn',
      website: 'https://www.linkedin.com/',
      description: 'Professional networking platform',
      usage: 'Search for high school students with impressive profiles'
    }
  ];

  const idealStudentProfile = {
    academic: [
      'Strong academic performance (top 5-10% of class)',
      'Demonstrated intellectual curiosity beyond classroom',
      'Participation in academic competitions or olympiads',
      'Independent research projects or publications',
      'Advanced coursework (AP, IB, A-Levels, etc.)'
    ],
    extracurricular: [
      'Leadership roles in school or community organizations',
      'Entrepreneurial ventures or startups',
      'Significant community service or social impact projects',
      'Excellence in arts, music, or athletics',
      'Debate, Model UN, or public speaking experience'
    ],
    personal: [
      'Global mindset and cultural awareness',
      'Adaptability and resilience',
      'Strong communication skills',
      'Collaborative and team-oriented',
      'Passion for learning and personal growth'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">Research Tools</h1>
          <p className="text-gray-600 mt-2">
            Resources for finding talented students and top schools across Western Europe
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ideal Student Profile</h2>
          <p className="text-gray-700 mb-6">
            Minerva seeks high school students (18-19 years old) with high intellectual capacity and genuine love for learning. 
            The ideal candidate demonstrates both depth (focused passion) and breadth (diverse interests).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Academic Excellence</h3>
              <ul className="space-y-2">
                {idealStudentProfile.academic.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-3">Extracurricular Impact</h3>
              <ul className="space-y-2">
                {idealStudentProfile.extracurricular.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Personal Qualities</h3>
              <ul className="space-y-2">
                {idealStudentProfile.personal.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Top Schools by Country</h2>
          <p className="text-gray-600 mb-4">
            Research and reach out to these high-performing schools known for producing exceptional students
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Choose a country...</option>
              {Object.keys(topSchoolsByCountry).sort().map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {selectedCountry && topSchoolsByCountry[selectedCountry] && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {topSchoolsByCountry[selectedCountry].map((school, idx) => (
                <div key={idx} className="p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm font-medium text-gray-800">{school}</p>
                </div>
              ))}
            </div>
          )}

          {!selectedCountry && (
            <div className="text-center text-gray-500 py-8">
              Select a country to view top schools
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Academic Competitions & Olympiads</h2>
          <p className="text-gray-600 mb-6">
            Find exceptional students through international academic competitions
          </p>

          <div className="space-y-4">
            {competitionResources.map((comp, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{comp.name}</h3>
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Visit Website →
                  </a>
                </div>
                <p className="text-sm text-gray-700 mb-2">{comp.description}</p>
                <p className="text-xs text-gray-600">
                  <strong>Search Tips:</strong> {comp.searchTips}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Online Communities & Platforms</h2>
          <p className="text-gray-600 mb-6">
            Discover talented students through online forums and platforms
          </p>

          <div className="space-y-4">
            {onlineResources.map((resource, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Visit Website →
                  </a>
                </div>
                <p className="text-sm text-gray-700 mb-2">{resource.description}</p>
                <p className="text-xs text-gray-600">
                  <strong>How to Use:</strong> {resource.usage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Research Best Practices</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• <strong>Document Everything:</strong> Add promising students to the database immediately</li>
            <li>• <strong>Personalize Outreach:</strong> Reference specific achievements when contacting students</li>
            <li>• <strong>Build Relationships:</strong> Connect with competition organizers and coaches</li>
            <li>• <strong>Follow Up:</strong> Stay in touch with talented students throughout their application journey</li>
            <li>• <strong>Respect Privacy:</strong> Only use publicly available information and respect data protection laws</li>
            <li>• <strong>Track Sources:</strong> Note where you found each student for future reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
