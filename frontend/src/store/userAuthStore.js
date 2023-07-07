import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5050/api/v1/users/";

export const useUserAuthStore = create((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}login`, credentials);
      const { token, user } = response.data.data;
      console.log(token, user);
      set({ token, user, loading: false });
      localStorage.setItem("token", token);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        set({ loading: true });
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        set({ token, user, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
