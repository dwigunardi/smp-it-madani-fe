import { create } from "zustand";
import axios from "axios";
import { beritaRepository } from "../repository/beritaRepository";

export const useBeritaStore = create((set) => ({
  dataBerita: [],
  dataBeritaDetail: {},
  pager: [],
  loading: false,
  hasErrors: false,
  pesan: "",
  status: "gagal  ",
  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(beritaRepository.url.getNews());
      await set((state) => ({
        dataBerita: (state.dataBerita = response.data.data),
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
  fetchBySlug: async (slug) => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(beritaRepository.url.getNewsById(slug));
      await set((state) => ({
        dataBeritaDetail: (state.dataBeritaDetail = response.data.data),
        loading: false,
      }));
      if (response.status == 200 || response.status == 201) {
        return response.data;
      }

      // await set((state) => ({
      //   pager: (state.pager = response.data.pager),
      //   loading: false,
      // }));
    } catch (err) {
      console.log(err);
      set((state) => ({ hasErrors: (state.hasErrors = err), loading: false }));
      return err;
    }
  },
  post: async (appendData, token) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.post(
        beritaRepository.url.getNews(),
        appendData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = request.status;
      if (res.status == 200 || res.status == 201) {
        set((state) => ({
          pesan: (state.pesan = res.data),
          loading: (state.loading = false),
          hasErrors: (state.hasErrors = false),
          status: (state.status = "berhasil"),
        }));
      } else {
        set((state) => ({
          pesan: (state.pesan = res.data),
          loading: (state.loading = false),
          hasErrors: (state.hasErrors = true),
          status: (state.status = "gagal"),
        }));
      }
    } catch (err) {
      console.log(err);
      set((state) => ({
        hasErrors: (state.hasErrors = true),
        pesan: (state.pesan = err.response.data.errors),
        loading: false,
        status: (state.status = "gagal"),
      }));
    }
  },
  deleteNews: async (slug, token) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.delete(
        beritaRepository.url.delNews(slug),
        // appendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  putNews: async (appendData, token, slug) => {
    set(() => ({ loading: true }));
    try {
      const request = await axios.post(
        beritaRepository.url.putNews(slug),
        appendData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
  resetState: () =>
    set({ hasErrors: false, loading: false, pesan: "Berhasil" }),
}));
