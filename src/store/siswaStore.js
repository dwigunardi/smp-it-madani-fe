import { create } from "zustand";
import axios from "axios";
import { baseurl } from "../config/baseUrl";

export const useSiswaStore = create((set, get) => ({
  dataAllSiswa: [],
  findedSiswa: {},
  dataTotal: '',
  pager: [],
  loading: false,
  hasErrors: false,
  pesan: "Berhasil",
  fetch: async (token) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(baseurl + '/students', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      await set((state) => ({
        dataAllSiswa: (state.dataAllSiswa = response.data.data),
        dataTotal: (state.dataTotal = response.data.data.length),
        loading: false,
      }));
      await set((state) => ({
        pager: (state.pager = response.data.pager),
        loading: false,
      }));
    } catch (err) {
      console.log(err);
      set((state) => ({ hasErrors: (state.hasErrors = err), loading: false }));
    }
  },
  findSiswa: (username) => {
    const data = get().dataAllSiswa;
    const foundSiswa = data.find((siswa) => siswa.nisn === username);
    set(() => ({ findedSiswa: foundSiswa }));
  },
  resetState: () =>
    set({ hasErrors: false, loading: false, pesan: "Berhasil" }),
}));
