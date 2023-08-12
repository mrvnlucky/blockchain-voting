import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5050/api/v1";

export const useUserAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuth: false,
  loading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data.data;
      console.log(token, user);
      set({ token, user, isAuth: true, loading: false });
      localStorage.setItem("token", token);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: () => {
    set({ token: null, user: null, isAuth: false });
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        set({ loading: true });
        const response = await axios.get(`${API_URL}/auth/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        set({ token, user, isAuth: true, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
