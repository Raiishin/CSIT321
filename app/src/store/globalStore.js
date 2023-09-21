import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: 'rzGXmlC15rbKndUyyRIz',
  userType: undefined,
  reset: () => set({ userId: undefined, userType: undefined })
}));

export default useGlobalStore;
