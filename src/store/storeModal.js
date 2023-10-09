import { create } from "zustand";

export const useModalTambahStore = create((set) => ({
  isOpen: false,
  mode: "berita",
  isLoading: false,
  isReset: false,
  setOpenModal: () => set((state) => ({ isOpen: true })),
  setCloseModal: () => set((state) => ({ isOpen: false })),
  setModeModal: (payload) => set((state) => ({ mode: payload })),
  setResetModal: (payload) => set((state) => ({ isReset: payload })),
  setLoading: (payload) => set((state) => ({ isLoading: payload })),
}));

export const useModalDeleteStore = create((set) => ({
  isOpen: false,
  mode: "berita",
  isLoading: false,
  openModalDelete: () => set((state) => ({ isOpen: true })),
  closeModalDelete: () => set((state) => ({ isOpen: false })),
  setDeleteModalMode: (payload) => set((state) => ({ mode: payload })),
  setLoading: (payload) => set((state) => ({ isLoading: payload })),
}));

export const useModalUpdateStore = create((set) => ({
  isUpdateOpen: false,
  mode: "berita",
  isUpdateLoading: false,
  isUpdateReset: false,
  openModalUpdate: () => set((state) => ({ isUpdateOpen: true })),
  closeModalUpdate: () => set((state) => ({ isUpdateOpen: false })),
  setUpdateModalMode: (payload) => set((state) => ({ mode: payload })),
  setUpdateResetModal: (payload) => set((state) => ({ isReset: payload })),
  setLoadingUpdate: (payload) => set((state) => ({ isLoading: payload })),
}));
