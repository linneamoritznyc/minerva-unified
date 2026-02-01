'use client';

import { useState } from 'react';
import { useAppStore, getRandomEncouragement } from '@/lib/store';
import {
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  Calendar,
  Building2,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import type { CallListItem, TaskCompletion } from '@/types';

// Mock data for call list
const mockCallList: CallListItem[] = [
  {
    school: {
      id: '1',
      rowNumber: 5,
      name: 'International School of Paris',
      city: 'Paris',
      country: 'France',
      curriculum: 'IB',
      counselorName: 'Marie Dubois',
      counselorEmail: 'mdubois@isparis.edu',
      counselorPhone: '+33 1 42 24 09 54',
      generalEmail: 'admissions@isparis.edu',
      generalPhone: '+33 1 42 24 09 50',
      relationshipStatus: 'Contacted',
      lastContactType: 'Email',
      lastContactDate: '2025-09-15',
      notes: 'Strong IB program, sends 2-3 students to US universities annually',
      priorityTier: 'A',
    },
    priority: 1,
    priorityReason: 'Near your Paris trip (Feb 10-12), previously contacted via email',
    relatedEvent: {
      id: 'ev1',
      name: 'Paris CIS Education Fair',
      type: 'fair',
      date: '2026-02-10',
      city: 'Paris',
      country: 'France',
      registered: true,
      travelBooked: false,
    },
    script: `Hi Marie, this is Linnea from Minerva University. I actually reached out via email back in September - I know you're probably swamped, so thought I'd try calling directly. I'll be in Paris on February 10-12 for the CIS Education Fair and wanted to see if I could visit your school while I'm in the area. Would you have 15 minutes for me to meet with your IB students interested in US universities?`,
    talkingPoints: [
      'Mention the CIS Fair on Feb 10-12',
      'Reference previous email from September',
      'IB students are great fit for Minerva\'s interdisciplinary approach',
      'Offer to send more info via email after the call',
    ],
    contactHistory: [
      {
        date: '2025-09-15',
        type: 'Email',
        summary: 'Initial outreach email sent, no response',
      },
    ],
    bestTimeToCall: '10:00 - 12:00',
    timezone: 'CET (Paris)',
  },
  {
    school: {
      id: '2',
      rowNumber: 12,
      name: 'Lycée International de Saint-Germain-en-Laye',
      city: 'Saint-Germain-en-Laye',
      country: 'France',
      curriculum: 'French/IB',
      counselorName: 'Jean-Pierre Martin',
      counselorEmail: 'jpmartin@licsgl.fr',
      counselorPhone: '+33 1 39 10 94 11',
      generalEmail: 'contact@licsgl.fr',
      generalPhone: '+33 1 39 10 94 00',
      relationshipStatus: 'Not Contacted',
      lastContactType: null,
      lastContactDate: null,
      notes: 'Large international sections, 30km from Paris',
      priorityTier: 'A',
    },
    priority: 2,
    priorityReason: '30km from Paris, never contacted before',
    relatedEvent: {
      id: 'ev1',
      name: 'Paris CIS Education Fair',
      type: 'fair',
      date: '2026-02-10',
      city: 'Paris',
      country: 'France',
      registered: true,
      travelBooked: false,
    },
    script: `Hi Jean-Pierre, this is Linnea Moritz from Minerva University. I'm calling because I'll be in Paris on February 10-12 for the CIS Education Fair, and I noticed your school is just 30 kilometers away. I'd love to visit and tell your international section students about Minerva - we're a US-accredited university where students live in 7 global cities over 4 years. Would you have 20 minutes for me to visit while I'm in the area?`,
    talkingPoints: [
      'First contact - introduce Minerva clearly',
      'Emphasize global rotation (7 cities)',
      'Their international sections would be a great fit',
      'Offer flexible timing during Feb 10-12',
    ],
    contactHistory: [],
    bestTimeToCall: '14:00 - 16:00',
    timezone: 'CET (Paris)',
  },
  {
    school: {
      id: '3',
      rowNumber: 18,
      name: 'British School of Paris',
      city: 'Paris',
      country: 'France',
      curriculum: 'British',
      counselorName: 'Sarah Thompson',
      counselorEmail: 'sthompson@britishschool.fr',
      counselorPhone: '+33 1 34 80 45 90',
      generalEmail: 'info@britishschool.fr',
      generalPhone: '+33 1 34 80 45 00',
      relationshipStatus: 'Responded',
      lastContactType: 'Fair',
      lastContactDate: '2025-11-20',
      notes: 'Met Sarah at London Fair 2025, very interested in Minerva',
      priorityTier: 'A',
    },
    priority: 3,
    priorityReason: 'Warm lead - met at London Fair, showed interest',
    relatedEvent: {
      id: 'ev1',
      name: 'Paris CIS Education Fair',
      type: 'fair',
      date: '2026-02-10',
      city: 'Paris',
      country: 'France',
      registered: true,
      travelBooked: false,
    },
    script: `Hi Sarah! It's Linnea from Minerva University - we met at the London University Fair back in November. You mentioned you'd be interested in having me visit your school sometime. Well, I'll be in Paris on February 10-12 for the CIS Fair, and I thought this would be perfect timing! Would you be available for me to come by and do a session with your A-Level students?`,
    talkingPoints: [
      'Reference meeting at London Fair (November 2025)',
      'She expressed interest - this is a warm call',
      'A-Level students are strong candidates',
      'Could do a workshop or info session',
    ],
    contactHistory: [
      {
        date: '2025-11-20',
        type: 'Fair',
        summary: 'Met at London University Fair, exchanged contacts, she showed interest in a school visit',
      },
    ],
    bestTimeToCall: '09:00 - 11:00',
    timezone: 'CET (Paris)',
  },
];

interface CallCardProps {
  item: CallListItem;
  onComplete: () => void;
}

function CallCard({ item, onComplete }: CallCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);

  const copyScript = async () => {
    await navigator.clipboard.writeText(item.script);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Responded':
        return 'bg-success-100 text-success-700';
      case 'Contacted':
        return 'bg-warm-100 text-warm-700';
      case 'Not Contacted':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-bold text-lg flex-shrink-0">
              #{item.priority}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{item.school.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                <span>{item.school.city}, {item.school.country}</span>
                <span className="mx-1">•</span>
                <Building2 className="w-4 h-4" />
                <span>{item.school.curriculum}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.school.relationshipStatus)}`}>
            {item.school.relationshipStatus}
          </span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-medium">{item.school.counselorName}</span>
          </div>
          {item.school.counselorPhone && (
            <a
              href={`tel:${item.school.counselorPhone}`}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Phone className="w-4 h-4" />
              {item.school.counselorPhone}
            </a>
          )}
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Clock className="w-4 h-4" />
            Best time: {item.bestTimeToCall} ({item.timezone})
          </div>
        </div>

        {/* Priority Reason */}
        <div className="bg-primary-50 rounded-xl p-3 mb-4">
          <p className="text-sm text-primary-700">
            <span className="font-medium">Why call now:</span> {item.priorityReason}
          </p>
        </div>

        {/* Related Event Badge */}
        {item.relatedEvent && (
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-warm-500" />
            <span className="text-sm text-slate-600">
              Related to: <span className="font-medium">{item.relatedEvent.name}</span>
              ({new Date(item.relatedEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
            </span>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide call script
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show call script & talking points
            </>
          )}
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-slate-100 p-5 bg-slate-50">
          {/* Contact History */}
          {item.contactHistory.length > 0 && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Previous Contact
              </h4>
              <div className="space-y-2">
                {item.contactHistory.map((history, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <span className="font-medium">{history.type}</span>
                      <span>•</span>
                      <span>{new Date(history.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-700">{history.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call Script */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-700">Call Script</h4>
              <button
                onClick={copyScript}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
                  scriptCopied
                    ? 'bg-success-100 text-success-700'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {scriptCopied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-white rounded-xl p-4 text-slate-700 text-sm leading-relaxed border border-slate-200">
              {item.script}
            </div>
          </div>

          {/* Talking Points */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Talking Points</h4>
            <ul className="space-y-2">
              {item.talkingPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-primary-500 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={onComplete}
            className="w-full bg-success-500 hover:bg-success-600 text-white font-medium py-3 px-4 rounded-xl
                     transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Mark Call Complete
          </button>
        </div>
      )}
    </div>
  );
}

export function CallList() {
  const { addCompletedTask, triggerConfetti } = useAppStore();

  const handleComplete = (item: CallListItem) => {
    const encouragement = getRandomEncouragement();
    const task: TaskCompletion = {
      taskId: `call-${item.school.id}-${Date.now()}`,
      taskDescription: `Called ${item.school.name}`,
      completedAt: new Date().toISOString(),
      celebration: encouragement,
    };
    addCompletedTask(task);
    triggerConfetti();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Call List</h2>
            <p className="text-slate-600">Schools to call before your Paris trip</p>
          </div>
        </div>
      </div>

      {/* Event Context */}
      <div className="bg-gradient-to-r from-warm-50 to-warm-100 rounded-2xl p-5 mb-6 border border-warm-200">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-warm-600" />
          <div>
            <p className="font-semibold text-warm-800">Paris CIS Education Fair</p>
            <p className="text-sm text-warm-600">February 10-12, 2026 • 9 days away</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-warm-700">
          I&apos;ve prioritized these 8 schools within 50km of Paris. Calling now gives you the
          best chance to book school visits during your trip!
        </p>
      </div>

      {/* Call List */}
      <div className="space-y-4">
        {mockCallList.map((item) => (
          <CallCard
            key={item.school.id}
            item={item}
            onComplete={() => handleComplete(item)}
          />
        ))}
      </div>

      {/* Encouragement Footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
          <Sparkles className="w-5 h-5 text-warm-500" />
          <p className="text-slate-600 text-sm">
            Each call gets you closer to helping amazing students discover Minerva!
          </p>
        </div>
      </div>
    </div>
  );
}
