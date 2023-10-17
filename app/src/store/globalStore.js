import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: undefined,
  userType: undefined,
  userName: undefined,
  previousPath: null,
  reset: () =>
    set({ userId: undefined, userType: undefined, userName: undefined, previousPath: null }),
  setPreviousPath: previousPath => set({ previousPath })
}));

export default useGlobalStore;
