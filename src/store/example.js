import { create } from 'zustand'
import axios from 'axios';
export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  decreasePopulation: () => set((state) => ({ bears: state.bears - 1})),
  removeAllBears: () => set({ bears: 0 }),
  increaseByAmount: (payload) => set((state) => ({ bears: state.bears + payload })),
}))

export const useStore = create((set) => ({
  data: [],
  loading: false,
  hasErrors: false,
  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      set((state) => ({ data: (state.data = response.data), loading: false }));
    } catch (err) {
      console.log(err)
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
}));

