import { create } from "zustand";
import persist from "../utils/persistConfig";

export const usePersistExample = create(
  persist(
    {
      key: "todoList",
      denylist: ["isLoading", "errorMessage"],
    },
    (set) => ({
      isLoading: false,
      errorMessage: "",
      data: [
        {
          id: "1",
          text: "first note",
          date: new Date().toISOString(),
          completed: false,
        },
      ],
      create: (todoRequest) => {
        set((state) => ({
          data: [
            {
              id: new Date().getTime().toString(),
              ...todoRequest,
            },
            ...state.data,
          ],
        }));
      },
      remove: (todoId) => {
        set((state) => ({
          data: state.data.filter((item) => item.id !== todoId),
        }));
      },
      update: (todoId, todoRequest) => {
        set((state) => ({
          data: state.data.map((item) =>
            item.id === todoId
              ? {
                  ...item,
                  ...todoRequest,
                }
              : item
          ),
        }));
      },
      clear: () => {
        set((state) => ({
          data: [],
        }));
      },
    })
  )
);
