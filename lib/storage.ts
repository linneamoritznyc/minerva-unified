import { School, Counselor, Student, Visit, TravelPlan, Interaction } from '@/types';

const STORAGE_KEYS = {
  SCHOOLS: 'minerva_schools',
  COUNSELORS: 'minerva_counselors',
  STUDENTS: 'minerva_students',
  VISITS: 'minerva_visits',
  TRAVEL_PLANS: 'minerva_travel_plans',
  INTERACTIONS: 'minerva_interactions',
};

export const storage = {
  schools: {
    getAll: (): School[] => {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.SCHOOLS);
      return data ? JSON.parse(data) : [];
    },
    save: (schools: School[]) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(schools));
    },
    add: (school: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) => {
      const schools = storage.schools.getAll();
      const newSchool: School = {
        ...school,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      schools.push(newSchool);
      storage.schools.save(schools);
      return newSchool;
    },
    update: (id: string, updates: Partial<School>) => {
      const schools = storage.schools.getAll();
      const index = schools.findIndex(s => s.id === id);
      if (index !== -1) {
        schools[index] = { ...schools[index], ...updates, updatedAt: new Date().toISOString() };
        storage.schools.save(schools);
        return schools[index];
      }
      return null;
    },
    delete: (id: string) => {
      const schools = storage.schools.getAll().filter(s => s.id !== id);
      storage.schools.save(schools);
    },
  },
  counselors: {
    getAll: (): Counselor[] => {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.COUNSELORS);
      return data ? JSON.parse(data) : [];
    },
    save: (counselors: Counselor[]) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.COUNSELORS, JSON.stringify(counselors));
    },
    add: (counselor: Omit<Counselor, 'id' | 'createdAt' | 'updatedAt'>) => {
      const counselors = storage.counselors.getAll();
      const newCounselor: Counselor = {
        ...counselor,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      counselors.push(newCounselor);
      storage.counselors.save(counselors);
      return newCounselor;
    },
    update: (id: string, updates: Partial<Counselor>) => {
      const counselors = storage.counselors.getAll();
      const index = counselors.findIndex(c => c.id === id);
      if (index !== -1) {
        counselors[index] = { ...counselors[index], ...updates, updatedAt: new Date().toISOString() };
        storage.counselors.save(counselors);
        return counselors[index];
      }
      return null;
    },
    delete: (id: string) => {
      const counselors = storage.counselors.getAll().filter(c => c.id !== id);
      storage.counselors.save(counselors);
    },
  },
  students: {
    getAll: (): Student[] => {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return data ? JSON.parse(data) : [];
    },
    save: (students: Student[]) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    },
    add: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
      const students = storage.students.getAll();
      const newStudent: Student = {
        ...student,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      students.push(newStudent);
      storage.students.save(students);
      return newStudent;
    },
    update: (id: string, updates: Partial<Student>) => {
      const students = storage.students.getAll();
      const index = students.findIndex(s => s.id === id);
      if (index !== -1) {
        students[index] = { ...students[index], ...updates, updatedAt: new Date().toISOString() };
        storage.students.save(students);
        return students[index];
      }
      return null;
    },
    delete: (id: string) => {
      const students = storage.students.getAll().filter(s => s.id !== id);
      storage.students.save(students);
    },
  },
  visits: {
    getAll: (): Visit[] => {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.VISITS);
      return data ? JSON.parse(data) : [];
    },
    save: (visits: Visit[]) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(visits));
    },
    add: (visit: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'>) => {
      const visits = storage.visits.getAll();
      const newVisit: Visit = {
        ...visit,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      visits.push(newVisit);
      storage.visits.save(visits);
      return newVisit;
    },
    update: (id: string, updates: Partial<Visit>) => {
      const visits = storage.visits.getAll();
      const index = visits.findIndex(v => v.id === id);
      if (index !== -1) {
        visits[index] = { ...visits[index], ...updates, updatedAt: new Date().toISOString() };
        storage.visits.save(visits);
        return visits[index];
      }
      return null;
    },
    delete: (id: string) => {
      const visits = storage.visits.getAll().filter(v => v.id !== id);
      storage.visits.save(visits);
    },
  },
  travelPlans: {
    getAll: (): TravelPlan[] => {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.TRAVEL_PLANS);
      return data ? JSON.parse(data) : [];
    },
    save: (plans: TravelPlan[]) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.TRAVEL_PLANS, JSON.stringify(plans));
    },
    add: (plan: Omit<TravelPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
      const plans = storage.travelPlans.getAll();
      const newPlan: TravelPlan = {
        ...plan,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      plans.push(newPlan);
      storage.travelPlans.save(plans);
      return newPlan;
    },
    update: (id: string, updates: Partial<TravelPlan>) => {
      const plans = storage.travelPlans.getAll();
      const index = plans.findIndex(p => p.id === id);
      if (index !== -1) {
        plans[index] = { ...plans[index], ...updates, updatedAt: new Date().toISOString() };
        storage.travelPlans.save(plans);
        return plans[index];
      }
      return null;
    },
    delete: (id: string) => {
      const plans = storage.travelPlans.getAll().filter(p => p.id !== id);
      storage.travelPlans.save(plans);
    },
  },
  interactions: {
    getAll: (): Interaction[] => {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.INTERACTIONS);
      return data ? JSON.parse(data) : [];
    },
    save: (interactions: Interaction[]) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(interactions));
    },
    add: (interaction: Omit<Interaction, 'id' | 'createdAt'>) => {
      const interactions = storage.interactions.getAll();
      const newInteraction: Interaction = {
        ...interaction,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      interactions.push(newInteraction);
      storage.interactions.save(interactions);
      return newInteraction;
    },
    delete: (id: string) => {
      const interactions = storage.interactions.getAll().filter(i => i.id !== id);
      storage.interactions.save(interactions);
    },
  },
  exportAll: () => {
    return {
      schools: storage.schools.getAll(),
      counselors: storage.counselors.getAll(),
      students: storage.students.getAll(),
      visits: storage.visits.getAll(),
      travelPlans: storage.travelPlans.getAll(),
      interactions: storage.interactions.getAll(),
      exportDate: new Date().toISOString(),
    };
  },
  importAll: (data: any) => {
    if (data.schools) storage.schools.save(data.schools);
    if (data.counselors) storage.counselors.save(data.counselors);
    if (data.students) storage.students.save(data.students);
    if (data.visits) storage.visits.save(data.visits);
    if (data.travelPlans) storage.travelPlans.save(data.travelPlans);
    if (data.interactions) storage.interactions.save(data.interactions);
  },
};
