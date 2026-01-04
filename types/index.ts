export interface School {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  website: string;
  type: 'Public' | 'Private' | 'International' | 'Charter';
  studentCount?: number;
  ranking?: string;
  notes: string;
  priority: 'High' | 'Medium' | 'Low';
  lastContactDate?: string;
  nextFollowUpDate?: string;
  status: 'Not Contacted' | 'Contacted' | 'Visit Scheduled' | 'Visit Completed' | 'Partnership Established';
  createdAt: string;
  updatedAt: string;
}

export interface Counselor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  schoolId: string;
  schoolName: string;
  country: string;
  linkedIn?: string;
  notes: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  relationshipStrength: 'Cold' | 'Warm' | 'Strong' | 'Champion';
  preferredContactMethod: 'Email' | 'Phone' | 'LinkedIn' | 'In-Person';
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  schoolName: string;
  graduationYear: number;
  interests: string[];
  achievements: string[];
  olympiads?: string[];
  source: 'School Visit' | 'Fair' | 'Online' | 'Referral' | 'Competition' | 'Other';
  interestedMajors: string[];
  engagementLevel: 'Cold' | 'Interested' | 'Highly Interested' | 'Applied' | 'Admitted';
  lastContactDate?: string;
  nextFollowUpDate?: string;
  notes: string;
  applicationStatus?: 'Not Started' | 'In Progress' | 'Submitted' | 'Admitted' | 'Enrolled' | 'Declined';
  createdAt: string;
  updatedAt: string;
}

export interface Visit {
  id: string;
  type: 'School Visit' | 'Workshop' | 'Coffee Chat' | 'Information Session' | 'Fair' | 'Family Discussion';
  schoolId?: string;
  schoolName: string;
  country: string;
  city: string;
  date: string;
  time?: string;
  duration?: string;
  attendees?: number;
  status: 'Planned' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes: string;
  followUpRequired: boolean;
  leadsGenerated?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TravelPlan {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  purpose: string;
  visits: string[];
  transportation: {
    type: 'Flight' | 'Train' | 'Bus' | 'Car';
    details: string;
    cost?: number;
    bookingReference?: string;
  }[];
  accommodation: {
    name: string;
    address: string;
    checkIn: string;
    checkOut: string;
    cost?: number;
    bookingReference?: string;
  }[];
  totalBudget?: number;
  actualCost?: number;
  status: 'Planning' | 'Booked' | 'In Progress' | 'Completed';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interaction {
  id: string;
  type: 'Email' | 'Phone Call' | 'Meeting' | 'LinkedIn Message' | 'Other';
  contactType: 'Counselor' | 'Student' | 'School Admin' | 'Other';
  contactId?: string;
  contactName: string;
  date: string;
  subject: string;
  notes: string;
  outcome: string;
  followUpRequired: boolean;
  followUpDate?: string;
  createdAt: string;
}

export const COUNTRIES = [
  'Andorra', 'Austria', 'Belgium', 'Denmark', 'Finland', 'France', 'Germany',
  'Gibraltar', 'Greenland', 'Guernsey', 'Iceland', 'Ireland', 'Italy', 'Jersey',
  'Liechtenstein', 'Luxembourg', 'Malta', 'Monaco', 'Netherlands', 'Norway',
  'Portugal', 'San Marino', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom',
  'Vatican City'
];

export const MINERVA_MAJORS = [
  'Arts & Humanities',
  'Business',
  'Computational Sciences',
  'Natural Sciences',
  'Social Sciences'
];

export const CONCENTRATIONS = {
  'Arts & Humanities': [
    'Arts and Literature',
    'Design Across the Humanities',
    'Global and Comparative Humanities',
    'Historical Forces',
    'Interpretation and Meaning',
    'Philosophy, Ethics, and the Law'
  ],
  'Business': [
    'Accounting',
    'Business Analytics',
    'Brand Management',
    'Entrepreneurship',
    'Finance',
    'Health Innovation',
    'Human Resource Management',
    'International Business',
    'Management',
    'Management Consulting',
    'Marketing',
    'Supply Chain Management'
  ],
  'Computational Sciences': [
    'Applied Problem Solving',
    'Computational Finance',
    'Computational Modeling and Simulation',
    'Data Science',
    'Mathematical Foundations of Computation',
    'Theory of Computation'
  ],
  'Natural Sciences': [
    'Biochemistry',
    'Biology',
    'Cells and Organisms',
    'Chemistry',
    'Chemistry Across Scales',
    'Earth Sciences',
    'Environmental Science',
    'Mathematics',
    'Neuroscience',
    'Physics'
  ],
  'Social Sciences': [
    'Behavioral Economics',
    'Cognition, Brain, and Behavior',
    'Human Rights and Social Justice',
    'International Relations',
    'Political Science',
    'Psychology',
    'Public Policy and Governance',
    'Sociology'
  ]
};

export const OLYMPIADS = [
  'International Mathematical Olympiad (IMO)',
  'International Physics Olympiad (IPhO)',
  'International Chemistry Olympiad (IChO)',
  'International Olympiad in Informatics (IOI)',
  'International Biology Olympiad (IBO)',
  'International Science and Engineering Fair (ISEF)',
  'World Schools Debating Championships'
];
