import { create } from "zustand";
import axios from "axios";
import { baseurl } from "../config/baseUrl";
import { useAuthPersist } from "./authPersist";

export const usePenerimaanStore = create((set) => ({
  dataPenerimaan: [],
  dataPenerimaanDetail: {},
  dataExport: {},
  total: '',
  loading: false,
  hasErrors: false,
  pesan: "Berhasil",
  fetch: async (accessToken) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.get(baseurl + "/penerimaan", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await set((state) => ({
        dataPenerimaan: (state.dataPenerimaan = request.data.data),
        loading: false,
        total: (state.total = request.data.total),
      }));
    } catch (err) {
      console.log(err);
      set((state) => ({ hasErrors: (state.hasErrors = err), loading: false }));
    }
  },
  fetchById: async (id, accessToken) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(baseurl + `/penerimaan/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await set((state) => ({
        dataPenerimaanDetail: (state.dataPenerimaanDetail = response.data.data),
        loading: false,
      }));
      // await set((state) => ({
      //   pager: (state.pager = response.data.pager),
      //   loading: false,
      // }));
    } catch (err) {
      console.log(err);
      set((state) => ({ hasErrors: (state.hasErrors = err), loading: false }));
    }
  },
  deletePenerimaan: async (id, accessToken) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.delete(
        baseurl + `/penerimaan/${id}`,
        // appendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const res = request.status;
      if (res.status == 200 || res.status == 201) {
        await set((state) => ({
          pesan: (state.pesan = res.data.message),
          loading: (state.loading = false),
          hasErrors: (state.hasErrors = false),
        }));
      } else {
        await set((state) => ({
          hasErrors: (state.hasErrors = true),
        }));
      }
    } catch (err) {
      await set((state) => ({
        hasErrors: (state.hasErrors = true),
        pesan: (state.pesan = err.response.data.errors),
        loading: false,
      }));
    }
  },
  putPenerimaan: async (appendData, id, accessToken) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.put(
        baseurl + `/penerimaan/${id}`,
        appendData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const res = request.status;
      if (res.status == 200 || res.status == 201) {
        await set((state) => ({
          pesan: (state.pesan = res.data),
          loading: (state.loading = false),
          hasErrors: (state.hasErrors = false),
        }));
      } else {
        await set((state) => ({
          hasErrors: true,
        }));
      }
    } catch (err) {
      console.log(err, "ini state management");
      await set((state) => ({
        hasErrors: true,
        pesan: (state.pesan = err.response.data),
        loading: false,
      }));
    }
  },
  export: async (accessToken) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.get(baseurl + "/penerimaan/export", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          responseType: 'blob', // Set the response type to 'blob'
        },
      })
      await set((state) => ({
        dataExport: (state.dataExport = request.data),
        loading: false,
      }));
    } catch (err) {
      console.log(err);
      set((state) => ({ hasErrors: (state.hasErrors = err), loading: false }));
    }
  },
  resetState: () =>
    set({ hasErrors: false, loading: false, pesan: "Berhasil" }),
}));
