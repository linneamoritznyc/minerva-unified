'use client';

import { useState } from 'react';
import { MINERVA_MAJORS, CONCENTRATIONS } from '@/types';
import Link from 'next/link';

export default function WorkshopsPage() {
  const [selectedMajor, setSelectedMajor] = useState<string>('Arts & Humanities');

  const majorDescriptions: Record<string, { description: string; skills: string[]; careers: string[] }> = {
    'Arts & Humanities': {
      description: 'The Arts & Humanities major develops critical thinking, creative expression, and cultural understanding. Students explore literature, philosophy, history, design, and the arts while learning to analyze complex texts, construct compelling arguments, and communicate ideas effectively across cultures.',
      skills: ['Critical Analysis', 'Creative Problem-Solving', 'Cross-Cultural Communication', 'Ethical Reasoning', 'Research & Writing'],
      careers: ['Publishing & Journalism', 'Cultural Consulting', 'Education & Academia', 'Arts Administration', 'Policy Analysis', 'Content Strategy']
    },
    'Business': {
      description: 'The Business major prepares students to lead organizations and drive innovation in a global economy. Through case studies, simulations, and real-world projects, students develop strategic thinking, financial acumen, and leadership skills applicable across industries.',
      skills: ['Strategic Thinking', 'Financial Analysis', 'Leadership & Management', 'Data-Driven Decision Making', 'Entrepreneurship'],
      careers: ['Management Consulting', 'Investment Banking', 'Entrepreneurship', 'Marketing & Brand Management', 'Operations Management', 'Business Analytics']
    },
    'Computational Sciences': {
      description: 'The Computational Sciences major combines computer science, mathematics, and applied problem-solving. Students learn to design algorithms, build software systems, analyze data, and apply computational thinking to solve complex real-world problems.',
      skills: ['Programming & Software Development', 'Algorithm Design', 'Data Science & Machine Learning', 'Mathematical Modeling', 'Systems Thinking'],
      careers: ['Software Engineering', 'Data Science', 'AI/Machine Learning', 'Quantitative Finance', 'Research & Development', 'Technology Consulting']
    },
    'Natural Sciences': {
      description: 'The Natural Sciences major explores the fundamental principles governing the natural world. Students engage in scientific inquiry, experimental design, and quantitative analysis while studying biology, chemistry, physics, mathematics, and environmental science.',
      skills: ['Scientific Method', 'Experimental Design', 'Quantitative Analysis', 'Research & Lab Techniques', 'Systems Thinking'],
      careers: ['Research Scientist', 'Healthcare & Medicine', 'Environmental Consulting', 'Biotechnology', 'Data Analysis', 'Science Communication']
    },
    'Social Sciences': {
      description: 'The Social Sciences major examines human behavior, societies, and institutions. Students learn to analyze social phenomena, conduct research, and develop evidence-based solutions to complex social challenges using insights from psychology, economics, political science, and sociology.',
      skills: ['Research Methods', 'Statistical Analysis', 'Policy Analysis', 'Behavioral Science', 'Social Impact Assessment'],
      careers: ['Public Policy', 'International Development', 'Social Research', 'Human Resources', 'Behavioral Economics', 'NGO/Nonprofit Leadership']
    }
  };

  const workshopOutline = {
    introduction: [
      'Welcome and introduction to Minerva University',
      'Overview of the global rotation experience (7 cities)',
      'The Active Learning Forum and seminar-based curriculum',
      'Minerva\'s unique approach to developing practical wisdom'
    ],
    majorsOverview: [
      'Introduction to the five majors',
      'Deep dive into each major\'s focus and concentrations',
      'Real-world applications and career pathways',
      'Student success stories and alumni outcomes'
    ],
    interactiveActivity: [
      'Self-assessment: Which major aligns with your interests?',
      'Group discussion: Interdisciplinary problem-solving',
      'Q&A with current students or alumni (if available)',
      'Exploration of concentration options'
    ],
    applicationProcess: [
      'Application timeline and requirements',
      'Tips for a strong application',
      'Financial aid and scholarship opportunities',
      'Next steps and resources'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">Workshop Materials</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive materials for presenting Minerva University to students and counselors
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Workshop Outline (60-90 minutes)</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">1. Introduction (10-15 minutes)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {workshopOutline.introduction.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">2. Majors Overview (25-30 minutes)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {workshopOutline.majorsOverview.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">3. Interactive Activity (15-20 minutes)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {workshopOutline.interactiveActivity.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">4. Application Process (10-15 minutes)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {workshopOutline.applicationProcess.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Minerva's Five Majors</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Major to Explore</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            >
              {MINERVA_MAJORS.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{selectedMajor}</h3>
              <p className="text-gray-700 leading-relaxed">
                {majorDescriptions[selectedMajor].description}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Key Skills Developed</h4>
              <div className="flex flex-wrap gap-2">
                {majorDescriptions[selectedMajor].skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Career Pathways</h4>
              <div className="flex flex-wrap gap-2">
                {majorDescriptions[selectedMajor].careers.map((career, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Concentrations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {CONCENTRATIONS[selectedMajor as keyof typeof CONCENTRATIONS].map((conc, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="text-sm font-medium text-gray-800">{conc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Talking Points</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Global Rotation Experience</h3>
              <p className="text-sm text-blue-800">
                Students live and study in seven world cities: San Francisco, Seoul, Hyderabad, Berlin, Buenos Aires, London, and Taipei. 
                This immersive experience develops cultural intelligence, adaptability, and a global network.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Active Learning Forum</h3>
              <p className="text-sm text-green-800">
                Small, seminar-based classes (average 15 students) conducted entirely online through Minerva's proprietary platform. 
                This ensures active participation, immediate feedback, and development of critical thinking skills.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Practical Wisdom</h3>
              <p className="text-sm text-purple-800">
                Minerva's curriculum focuses on developing transferable cognitive skills and habits of mind that apply across disciplines. 
                Students learn how to think, not just what to think.
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Career Outcomes</h3>
              <p className="text-sm text-orange-800">
                Minerva graduates work at leading companies like Google, McKinsey, and Goldman Sachs, pursue graduate studies at top universities, 
                and launch successful startups. The global network and practical skills prepare students for diverse career paths.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Interactive Activities</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity 1: Major Matching Exercise</h3>
              <p className="text-gray-700 mb-3">
                Have students consider their interests and strengths, then match them to potential majors:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>If you love analyzing texts and understanding different perspectives → Arts & Humanities</li>
                <li>If you're interested in how organizations work and want to lead teams → Business</li>
                <li>If you enjoy coding, math, and solving technical problems → Computational Sciences</li>
                <li>If you're curious about how the natural world works → Natural Sciences</li>
                <li>If you want to understand human behavior and social systems → Social Sciences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity 2: Interdisciplinary Problem-Solving</h3>
              <p className="text-gray-700 mb-3">
                Present a real-world challenge (e.g., climate change, urban poverty, healthcare access) and discuss how each major 
                would approach the problem differently. This demonstrates Minerva's interdisciplinary approach.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity 3: Q&A Session</h3>
              <p className="text-gray-700 mb-3">
                Open the floor for questions. Common topics include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Application requirements and timeline</li>
                <li>Financial aid and scholarships</li>
                <li>Daily life in different cities</li>
                <li>Class structure and workload</li>
                <li>Career support and outcomes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
