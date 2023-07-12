import { create } from "zustand";
import axios from "axios";
const API_URL = "http://localhost:5050/api/v1";

export const useUserStore = create((set) => ({
  admins: [],
  loading: false,
  error: null,

  getAllAdmins: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/admins`);
      set({ admins: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // getOneUser: async (id) => {
  //   try {
  //     set({ loading: true });
  //     const response = await axios.get(`${API_URL}/admins/${id}`);
  //     const admin = response.data;
  //     set({ admins: [admin], loading: false });
  //   } catch (error) {
  //     set({ error: error.message, loading: false });
  //   }
  // },

  createAdmin: async (newAdmin) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/admins`, newAdmin);
      set((state) => ({
        admins: [...state.admins, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // updateUser: async (id, updatedUser) => {
  //   try {
  //     set({ loading: true });
  //     await axios.put(`${API_URL}/admins/${id}`, updatedUser);
  //     set((state) => ({
  //       admins: state.admins.map((candidate) =>
  //         candidate.id === id ? updatedUser : candidate
  //       ),
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({ error: error.message, loading: false });
  //   }
  // },

  // deleteUser: async (id) => {
  //   try {
  //     set({ loading: true });
  //     await axios.delete(`${API_URL}/admins/${id}`);
  //     set((state) => ({
  //       admins: state.admins.filter((candidate) => candidate.id !== id),
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({ error: error.message, loading: false });
  //   }
  // },
}));
