import schoolsData from '@/data/schools.json';
import eventsData from '@/data/events.json';
import contactsData from '@/data/contacts.json';
import type {
  School,
  ConfirmedEvent,
  Fair,
  CRMContact,
  CallListItem,
  EventWithTimeline,
  DashboardStats,
} from '@/types';

// Type the imported data
export const schools: School[] = schoolsData as School[];

export const confirmedEvents: ConfirmedEvent[] = (eventsData as Record<string, unknown>).confirmed as ConfirmedEvent[];
export const fairs: Fair[] = (eventsData as Record<string, unknown>).fairs as Fair[];
export const pastEventsFY26 = (eventsData as Record<string, unknown>).pastFY26 as Array<{
  name: string; month: string; year: string; country: string; city: string;
}>;

export const crmContacts: CRMContact[] = (contactsData as Record<string, unknown>).crmContacts as CRMContact[];
export const warmContacts = (contactsData as Record<string, unknown>).warmContacts as Array<{
  name: string; school: string; country: string; notes: string;
}>;

// Helper: parse a date string that might be ISO or text like "Sep 16-19, 2025"
function parseEventDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  // Try ISO date
  const iso = new Date(dateStr);
  if (!isNaN(iso.getTime()) && dateStr.match(/^\d{4}-/)) return iso;
  // Try "Month Day, Year" or "Month Day-Day, Year"
  const match = dateStr.match(/(\w+)\s+(\d+)[\s\-–]+\d*,?\s*(\d{4})/);
  if (match) {
    const parsed = new Date(`${match[1]} ${match[2]}, ${match[3]}`);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  // Try just month + year
  const monthYear = dateStr.match(/(\w+)\s+(\d{4})/);
  if (monthYear) {
    const parsed = new Date(`${monthYear[1]} 1, ${monthYear[2]}`);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return null;
}

function daysUntil(dateStr: string): number {
  const d = parseEventDate(dateStr);
  if (!d) return 999;
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// Get dashboard stats from real data
export function getDashboardStats(): DashboardStats {
  const contacted = schools.filter(s =>
    s.relationshipStatus === 'Contacted'
  ).length;
  const responded = schools.filter(s =>
    s.relationshipStatus === 'Responded'
  ).length;
  const visited = schools.filter(s =>
    s.relationshipStatus === 'Visited'
  ).length;
  const notContacted = schools.filter(s =>
    s.relationshipStatus === 'Not Contacted'
  ).length;

  const countries = new Set(schools.map(s => s.country).filter(Boolean));

  const futureEvents = [...confirmedEvents, ...fairs].filter(e => {
    const days = daysUntil(e.date);
    return days > 0 && days < 365;
  });

  return {
    totalSchools: schools.length,
    schoolsContacted: contacted,
    schoolsResponded: responded,
    schoolsVisited: visited,
    schoolsNotContacted: notContacted,
    upcomingEvents: futureEvents.length,
    countriesCovered: countries.size,
  };
}

// Get upcoming confirmed events sorted by date
export function getUpcomingEvents(): EventWithTimeline[] {
  const now = new Date();

  const events: EventWithTimeline[] = confirmedEvents
    .filter(e => {
      const days = daysUntil(e.date);
      return days > -7; // Include events from the last week too
    })
    .map((e, i) => {
      const days = daysUntil(e.date);
      const schoolsInCountry = schools.filter(
        s => s.country.toLowerCase() === e.country.toLowerCase()
      );
      const contactedInCountry = schoolsInCountry.filter(
        s => s.relationshipStatus !== 'Not Contacted'
      );

      const hasTravel = !!(e.flightsHotels && e.flightsHotels.trim());
      const hotels = [e.hotel1, e.hotel2, e.hotel3, e.hotel4].filter(h => h && h.trim());

      return {
        id: `confirmed-${i}`,
        name: e.name,
        date: e.date,
        city: e.city,
        country: e.country,
        venue: e.address,
        type: 'confirmed' as const,
        registered: true,
        travelBooked: hasTravel,
        schoolsInArea: schoolsInCountry.length,
        schoolsContacted: contactedInCountry.length,
        daysUntil: days,
        personalNotes: e.personalNotes,
        flightsHotels: e.flightsHotels,
        hotels,
        timeline: [
          { task: 'Register for event', status: 'completed' as const },
          {
            task: `Contact schools in ${e.country}`,
            status: contactedInCountry.length > 0 ? 'in_progress' as const : 'pending' as const,
          },
          {
            task: 'Book flights & hotel',
            status: hasTravel ? 'completed' as const : (days <= 14 ? 'in_progress' as const : 'pending' as const),
          },
          {
            task: 'Confirm school visits',
            status: 'pending' as const,
          },
          {
            task: 'Prepare presentation materials',
            status: e.presentation ? 'completed' as const : 'pending' as const,
          },
        ],
      };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return events;
}

// Get schools to call, prioritized by upcoming events (working backwards from events)
export function getCallList(): CallListItem[] {
  const upcomingEvents = getUpcomingEvents().filter(e => e.daysUntil > 0 && e.daysUntil < 90);

  const callItems: CallListItem[] = [];
  const addedSchoolIds = new Set<string>();
  let priorityCounter = 1;

  // For each upcoming event, find schools in that country to call
  for (const event of upcomingEvents) {
    const schoolsInCountry = schools.filter(
      s => s.country.toLowerCase() === event.country.toLowerCase() && !addedSchoolIds.has(s.id)
    );

    // Sort: Responded first (warm leads), then Contacted, then Not Contacted
    // Within each group, sort by priority tier (A > B > C)
    const sorted = schoolsInCountry.sort((a, b) => {
      const statusOrder: Record<string, number> = {
        'Responded': 0,
        'Visited': 1,
        'Contacted': 2,
        'Not Contacted': 3,
      };
      const aStatus = statusOrder[a.relationshipStatus] ?? 3;
      const bStatus = statusOrder[b.relationshipStatus] ?? 3;
      if (aStatus !== bStatus) return aStatus - bStatus;

      const priorityOrder: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2 };
      const aPriority = priorityOrder[a.priority] ?? 2;
      const bPriority = priorityOrder[b.priority] ?? 2;
      return aPriority - bPriority;
    });

    for (const school of sorted) {
      addedSchoolIds.add(school.id);

      const contactPerson = school.contactName || 'the counselor';
      const hasHistory = school.relationshipStatus !== 'Not Contacted';
      const daysText = event.daysUntil <= 14
        ? `in ${event.daysUntil} days`
        : `in ${Math.ceil(event.daysUntil / 7)} weeks`;

      let reason = '';
      if (school.relationshipStatus === 'Responded') {
        reason = `Warm lead - previously responded. ${event.name} in ${event.city} is ${daysText}`;
      } else if (school.relationshipStatus === 'Visited') {
        reason = `Previously visited. Follow up before ${event.name} (${daysText})`;
      } else if (school.relationshipStatus === 'Contacted') {
        reason = `Previously contacted, no response yet. ${event.name} is ${daysText}`;
      } else {
        reason = `Not yet contacted. ${event.name} in ${event.city} is ${daysText} - good time to reach out`;
      }

      let script = '';
      if (school.relationshipStatus === 'Responded' || school.relationshipStatus === 'Visited') {
        script = `Hi${school.contactName ? ` ${school.contactName.split(' ')[0]}` : ''}, this is Linnea from Minerva University. We've been in touch before${school.lastContactDate ? ` - last time was ${school.lastContactType ? 'via ' + school.lastContactType : 'a while back'}` : ''}. I'm reaching out because I'll be in ${event.city} for ${event.name}${event.date ? ' on ' + event.date : ''}, and I'd love to visit ${school.name} while I'm in the area. Would you have 15-20 minutes for me to meet with your students interested in studying at a global university?`;
      } else if (school.relationshipStatus === 'Contacted') {
        script = `Hi${school.contactName ? ` ${school.contactName.split(' ')[0]}` : ''}, this is Linnea from Minerva University. I reached out${school.lastContactType ? ' via ' + school.lastContactType : ''} previously${school.lastContactDate ? ' back in ' + new Date(school.lastContactDate).toLocaleDateString('en-US', { month: 'long' }) : ''} - I know you're probably busy, so I thought I'd try calling directly. I'll be in ${event.city} for ${event.name} and wondered if I could visit ${school.name} while I'm nearby. We're a US university where students live in 7 global cities over 4 years - it's a great fit for internationally-minded students.`;
      } else {
        script = `Hi${school.contactName ? ` ${school.contactName.split(' ')[0]}` : ''}, this is Linnea Moritz from Minerva University. I'm calling because I'll be in ${event.city} for ${event.name}, and I noticed ${school.name} is in the area. I'd love to visit and tell your students about Minerva - we're a US-accredited university where students live and study in 7 global cities over 4 years, including Berlin, Seoul, Taipei, and Buenos Aires. Would you have 20 minutes for me to visit while I'm nearby?`;
      }

      const talkingPoints: string[] = [];
      if (event.date) talkingPoints.push(`You'll be in ${event.city} for ${event.name} (${event.date})`);
      if (hasHistory && school.lastContactDate) talkingPoints.push(`Last contact: ${school.lastContactType || 'outreach'} on ${school.lastContactDate}`);
      if (school.curriculum) talkingPoints.push(`Their curriculum: ${school.curriculum}`);
      if (school.ibStatus === 'Yes') talkingPoints.push('IB school - great fit for Minerva\'s interdisciplinary approach');
      if (school.studentCount) talkingPoints.push(`Student body: ${school.studentCount}`);
      if (school.activityNotes) talkingPoints.push(`Notes: ${school.activityNotes}`);
      if (!hasHistory) talkingPoints.push('First contact - introduce Minerva clearly (7 cities, active learning, interdisciplinary)');

      callItems.push({
        school,
        priority: priorityCounter++,
        priorityReason: reason,
        relatedEvent: {
          name: event.name,
          date: event.date,
          city: event.city,
          country: event.country,
        },
        script,
        talkingPoints,
        bestTimeToCall: '09:00 - 12:00',
        timezone: getTimezone(school.country),
      });
    }
  }

  return callItems;
}

function getTimezone(country: string): string {
  const timezones: Record<string, string> = {
    'France': 'CET (Paris)',
    'Denmark': 'CET (Copenhagen)',
    'Finland': 'EET (Helsinki)',
    'Norway': 'CET (Oslo)',
    'Belgium': 'CET (Brussels)',
    'Austria': 'CET (Vienna)',
    'Germany': 'CET (Berlin)',
    'Spain': 'CET (Madrid)',
    'Andorra': 'CET',
    'Faroe Islands': 'WET',
  };
  return timezones[country] || 'CET';
}

// Get country-level summary for dashboard
export function getCountryBreakdown(): { country: string; total: number; contacted: number }[] {
  const countries: Record<string, { total: number; contacted: number }> = {};
  for (const s of schools) {
    if (!s.country) continue;
    if (!countries[s.country]) countries[s.country] = { total: 0, contacted: 0 };
    countries[s.country].total++;
    if (s.relationshipStatus !== 'Not Contacted') {
      countries[s.country].contacted++;
    }
  }
  return Object.entries(countries)
    .map(([country, data]) => ({ country, ...data }))
    .sort((a, b) => b.total - a.total);
}
