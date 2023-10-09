import { create } from "zustand";

export const useGetTextEditor = create((set) => ({
    isiBerita: "<p>Silahkan Memasukan Isi Berita</p>",
    modeText: "",
    removeIsi: () => set({ isiBerita: "<p>Silahkan Memasukan Isi Berita</p>" }),
    setIsiBerita: (payload) => set((state) => ({ isiBerita: payload })),
    setUpdateMode: () => set((state) => ({modeText:'update'})),
    setTambahMode: () => set((state) => ({modeText:'tambah'})),
  }))