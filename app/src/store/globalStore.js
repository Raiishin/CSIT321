import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: undefined,
  userType: undefined,
  userName: undefined,
  reset: () => set({ userId: undefined, userType: undefined, userName: undefined })
}));

export default useGlobalStore;
