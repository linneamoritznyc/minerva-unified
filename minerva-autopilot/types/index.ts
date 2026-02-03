// School data from CRM spreadsheet
export interface School {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  address: string;
  priority: string;
  website: string;
  phone: string;
  email: string;
  ibStatus: string;
  curriculum: string;
  studentCount: string;
  socioeconomicContext: string;
  tuitionFees: string;
  specialFocus: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  relationshipStatus: string;
  lastContactType: string;
  lastContactDate: string;
  repliedStatus: string;
  activityNotes: string;
  emailStrength: string;
  mergeStatus: string;
  nextStep: string;
}

// CRM Contact (from CONTACT Master tab)
export interface CRMContact {
  type: string;
  name: string;
  title: string;
  school: string;
  location: string;
  email: string;
  phone: string;
  relationshipStatus: string;
  lastEmailReceived: string;
  notes: string;
  lastContactDate: string;
}

// Confirmed event from CRM
export interface ConfirmedEvent {
  name: string;
  date: string;
  personalNotes: string;
  time: string;
  address: string;
  country: string;
  city: string;
  organizerNotes: string;
  presentation: string;
  fairMaterials: string;
  flightsHotels: string;
  latestUpdate: string;
  hotel1: string;
  hotel2: string;
  hotel3: string;
  hotel4: string;
  mainPoints: string;
  type: 'confirmed';
}

// Fair from European University Fairs FY26
export interface Fair {
  date: string;
  duration: string;
  country: string;
  city: string;
  name: string;
  organization: string;
  venue: string;
  cost: string;
  registrationDeadline: string;
  website: string;
  details: string;
  type: 'fair';
}

// Call list item with generated script
export interface CallListItem {
  school: School;
  priority: number;
  priorityReason: string;
  relatedEvent?: { name: string; date: string; city: string; country: string };
  script: string;
  talkingPoints: string[];
  bestTimeToCall?: string;
  timezone?: string;
}

// Timeline item for event preparation
export interface TimelineItem {
  task: string;
  status: 'completed' | 'in_progress' | 'pending' | 'waiting';
}

// Event with timeline (for display)
export interface EventWithTimeline {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  city: string;
  country: string;
  venue?: string;
  type: 'confirmed' | 'fair';
  registered: boolean;
  travelBooked: boolean;
  schoolsInArea: number;
  schoolsContacted: number;
  daysUntil: number;
  timeline: TimelineItem[];
  personalNotes?: string;
  flightsHotels?: string;
  hotels?: string[];
}

// Dashboard stats
export interface DashboardStats {
  totalSchools: number;
  schoolsContacted: number;
  schoolsResponded: number;
  schoolsVisited: number;
  schoolsNotContacted: number;
  upcomingEvents: number;
  countriesCovered: number;
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

// Store state
export interface AppState {
  completedTasks: TaskCompletion[];
  isLoading: boolean;
  error: string | null;
  showConfetti: boolean;
  currentTab: 'dashboard' | 'calls' | 'events' | 'travel';

  addCompletedTask: (task: TaskCompletion) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  triggerConfetti: () => void;
  setCurrentTab: (tab: AppState['currentTab']) => void;
}
