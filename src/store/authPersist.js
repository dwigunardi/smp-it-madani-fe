import { create } from "zustand";
import persist from "../utils/persistConfig";

export const useAuthPersist = create(
  persist(
    {
      key: "auth",
      denylist: ["isLoading", "errorMessage"],
    },
    (set) => ({
      onLoading: false,
      errorMessage: "",
      isAuthenticated: false,
      accessToken: 'initial token',
      data: [{ id: "1", credential: "kosong" }],
      create: (status, credential) => {
        set((state) => ({
          isAuthenticated: status,
          data: [
            {
              id: new Date().getTime().toString(),
              credential: credential,
            },
            // ...state.data,
          ],
          accessToken : credential.accessToken
         
        }));
      },
      remove: (credentialId) => {
        set((state) => ({
          data: state.data.filter((item) => item.id !== credentialId),
        }));
      },
      update: (status, credentialId, credentialData,) => {
        set((state) => ({
          isAuthenticated: status,
          data: state.data.map((item) =>
            item.id === credentialId
              ? {
                  ...item,
                  ...credentialData,
                }
              : item
          ),
        }));
      },
      clear: () => {
        set((state) => ({
          isAuthenticated: false,
          data: [],
          accessToken: 'initial token',
        }));
      },
    })
  )
);
