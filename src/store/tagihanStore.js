import axios from "axios";
import { create } from "zustand";
import { baseurl } from "../config/baseUrl";

export const useTagihanStore = create((set) => ({
  dataTagihan: [],
  dataTagihanSiswa: [],
  lengthData: "",
  dataTagihanDetail: {},
  dataExport: {},
  total: [],
  loading: false,
  hasErrors: false,
  pesan: " ",
  fetch: async (accessToken) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.get(baseurl + "/tagihan", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await set((state) => ({
        dataTagihan: (state.dataTagihan = request.data.data),
        loading: false,
        total: (state.total = request.data.total),
        lengthData: (state.lengthData = request.data.data?.length),
      }));
    } catch (err) {
      console.log(err);
      set((state) => ({ hasErrors: (state.hasErrors = err), loading: false }));
    }
  },
  fetchSiswa: async (accessToken) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.get(
        baseurl + "/tagihan/student?status=pending|failed",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await set((state) => ({
        dataTagihanSiswa: (state.dataTagihanSiswa = request.data),
        loading: false,
        lengthData: (state.lengthData = request.data.data?.length),
      }));
    } catch (error) {
      console.log("error state management =>", error);
      set((state) => ({
        hasErrors: (state.hasErrors = error),
        loading: false,
      }));
    }
  },
  postTagihan: async (data, accessToken) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.post(baseurl + "/tagihan", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await set((state) => ({
        dataTagihan: (state.dataTagihan = request.data),
        loading: false,
        total: (state.total = request.data.total),
        pesan: (state.pesan = request.data),
      }));
    } catch (err) {
      console.log(err);
      await set((state) => ({
        hasErrors: (state.hasErrors = err),
        pesan: (state.pesan =
          err.response.data.message ||
          err.response.data.errors.nama ||
          err.response.data.errors.kode ||
          err.response.data.errors.deskripsi),
        loading: false,
      }));
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
}));
