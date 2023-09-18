import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: undefined,
  userType: undefined,
  reset: () => set({ userId: undefined, userType: undefined })
}));

export default useGlobalStore;
