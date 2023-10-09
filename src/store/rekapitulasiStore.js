import { create } from "zustand";
import axios from "axios";
import { baseurl } from "../config/baseUrl";

export const useRekapStore = create((set, get) => ({
  dataAllRekap: [],
  dataLunas: {},
  dataPending: {},
  dataTotalLunas: {},
  pager: [],
  loading: false,
  hasErrors: false,
  pesan: "Berhasil",
  getAllRekap: async (payload) => {
    set(() => ({ loading: true }));
    try {
      await set((state) => ({
        dataAllRekap: (state.dataAllRekap = payload),
        loading: false,
      }));
    } catch (err) {
      console.log(err);
      set((state) => ({ hasErrors: (state.hasErrors = err), loading: false }));
    }
  },
  getDataLunas: (payload) => {
    const data = get().dataAllRekap;
    const foundData = data.filter((value) => value.status == payload);
    const totalLunas = data.reduce(function (acc, obj) {
      return acc + parseInt(obj.jumlah);
    }, 0);
    set(() => ({ dataLunas: foundData }));
    set(() => ({ dataTotalLunas: totalLunas }));
  },
  getDataPending: (payload) => {
    const data = get().dataAllRekap;
    const foundData = data.filter((value) => value.status == payload);
    set(() => ({ dataPending: foundData }));
  },
  resetState: () =>
    set({ hasErrors: false, loading: false, pesan: "Berhasil" }),
}));
