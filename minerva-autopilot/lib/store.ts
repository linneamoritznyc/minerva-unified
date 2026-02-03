import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, TaskCompletion } from '@/types';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      completedTasks: [],
      isLoading: false,
      error: null,
      showConfetti: false,
      currentTab: 'dashboard',

      addCompletedTask: (task: TaskCompletion) =>
        set((state) => ({
          completedTasks: [task, ...state.completedTasks].slice(0, 50),
          showConfetti: true,
        })),

      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),

      triggerConfetti: () => {
        set({ showConfetti: true });
        setTimeout(() => set({ showConfetti: false }), 3000);
      },

      setCurrentTab: (currentTab: AppState['currentTab']) => set({ currentTab }),
    }),
    {
      name: 'minerva-autopilot-storage',
      partialize: (state) => ({
        completedTasks: state.completedTasks,
        currentTab: state.currentTab,
      }),
    }
  )
);

export const encouragementMessages = [
  { text: "Amazing work!", emoji: "✨" },
  { text: "You're crushing it!", emoji: "💪" },
  { text: "Another one done!", emoji: "🎉" },
  { text: "Look at you go!", emoji: "🚀" },
  { text: "That's the way!", emoji: "⭐" },
  { text: "Fantastic!", emoji: "🌟" },
  { text: "You're on fire!", emoji: "🔥" },
  { text: "Keep it up!", emoji: "💫" },
  { text: "Brilliant work!", emoji: "🌈" },
  { text: "You did it!", emoji: "🎊" },
];

export const getRandomEncouragement = () => {
  return encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
};
