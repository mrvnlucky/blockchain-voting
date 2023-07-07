import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5050/api/v1/users/";

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  getAllUsers: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(API_URL);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getOneUser: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get((API_URL, id));
      const user = response.data;
      set({ users: [user], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createUser: async (newUser) => {
    try {
      set({ loading: true });
      const response = await axios.post(API_URL, newUser);
      set((state) => ({
        users: [...state.users, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateUser: async (id, updatedUser) => {
    try {
      set({ loading: true });
      await axios.put((API_URL, id), updatedUser);
      set((state) => ({
        users: state.users.map((candidate) =>
          candidate.id === id ? updatedUser : candidate
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteUser: async (id) => {
    try {
      set({ loading: true });
      await axios.delete((API_URL, id));
      set((state) => ({
        users: state.users.filter((candidate) => candidate.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
