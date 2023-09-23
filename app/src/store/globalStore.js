import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: 'rzGXmlC15rbKndUyyRIz',
  userType: 0,
  reset: () => set({ userId: undefined, userType: undefined })
}));

export default useGlobalStore;
