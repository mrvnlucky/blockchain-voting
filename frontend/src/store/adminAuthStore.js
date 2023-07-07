import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5050/api/v1/admins/";

export const useAdminAuthStore = create((set) => ({
  token: null,
  admin: null,
  loading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}login`, credentials);
      const { token, admin } = response.data;
      set({ token, admin, loading: false });
      localStorage.setItem("token", token);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: () => {
    set({ token: null, admin: null });
    localStorage.removeItem("token");
  },

  checkAuthentication: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        set({ loading: true });
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const admin = response.data;
        set({ token, admin, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
