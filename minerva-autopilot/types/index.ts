// School data from CRM
export interface School {
  id: string;
  rowNumber: number;
  name: string;
  city: string;
  country: string;
  curriculum: 'IB' | 'American' | 'British' | 'French' | 'German' | 'Other' | string;
  counselorName: string | null;
  counselorEmail: string | null;
  counselorPhone: string | null;
  generalEmail: string | null;
  generalPhone: string | null;
  relationshipStatus: 'Not Contacted' | 'Contacted' | 'Responded' | 'Partnership' | 'Not Interested' | string;
  lastContactType: 'Email' | 'Phone' | 'Meeting' | 'Fair' | null;
  lastContactDate: string | null;
  notes: string | null;
  priorityTier: 'A' | 'B' | 'C' | null;
}

// Event/Fair data
export interface Event {
  id: string;
  name: string;
  type: 'fair' | 'school_visit' | 'workshop' | 'coffee_chat' | 'trip';
  date: string;
  endDate?: string;
  city: string;
  country: string;
  venue?: string;
  cost?: number;
  registered: boolean;
  travelBooked: boolean;
  notes?: string;
}

// Call list item with generated script
export interface CallListItem {
  school: School;
  priority: number;
  priorityReason: string;
  relatedEvent?: Event;
  script: string;
  talkingPoints: string[];
  contactHistory: ContactHistoryItem[];
  bestTimeToCall?: string;
  timezone?: string;
}

// Contact history entry
export interface ContactHistoryItem {
  date: string;
  type: 'Email' | 'Phone' | 'Meeting' | 'Fair' | 'Visit';
  summary: string;
  outcome?: string;
}

// Travel option
export interface TravelOption {
  type: 'flight' | 'hotel';
  provider: string;
  price: number;
  currency: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  checkIn?: string;
  checkOut?: string;
  rating?: number;
  distanceToVenue?: string;
  bookingUrl?: string;
  recommended: boolean;
  reason?: string;
}

// Trip plan
export interface TripPlan {
  event: Event;
  flights: TravelOption[];
  hotels: TravelOption[];
  schoolVisits: {
    school: School;
    date: string;
    time: string;
    confirmed: boolean;
  }[];
  totalEstimatedCost: number;
  recommendation: string;
}

// Timeline item for event preparation
export interface TimelineItem {
  id: string;
  eventId: string;
  task: string;
  dueDate: string;
  status: 'completed' | 'in_progress' | 'pending' | 'waiting';
  dependsOn?: string[];
  notes?: string;
}

// Dashboard stats
export interface DashboardStats {
  schoolsContacted: number;
  schoolsThisWeek: number;
  upcomingEvents: number;
  confirmedVisits: number;
  pendingResponses: number;
  streak: number;
}

// Encouragement message
export interface EncouragementMessage {
  text: string;
  emoji?: string;
}

// Task completion
export interface TaskCompletion {
  taskId: string;
  taskDescription: string;
  completedAt: string;
  celebration: EncouragementMessage;
}

// AI Manager response
export interface AIManagerResponse {
  priority: 'high' | 'medium' | 'low';
  message: string;
  suggestedAction: string;
  callList?: CallListItem[];
  travelSuggestions?: TripPlan;
  timeline?: TimelineItem[];
}

// Store state
export interface AppState {
  // Data
  schools: School[];
  events: Event[];
  callList: CallListItem[];
  completedTasks: TaskCompletion[];

  // UI state
  isLoading: boolean;
  error: string | null;
  showConfetti: boolean;
  currentTab: 'dashboard' | 'calls' | 'events' | 'travel';

  // Actions
  setSchools: (schools: School[]) => void;
  setEvents: (events: Event[]) => void;
  setCallList: (callList: CallListItem[]) => void;
  addCompletedTask: (task: TaskCompletion) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  triggerConfetti: () => void;
  setCurrentTab: (tab: AppState['currentTab']) => void;
}
