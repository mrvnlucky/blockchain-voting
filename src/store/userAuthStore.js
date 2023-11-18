import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

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
      set({
        token,
        user,
        isAuth: true,
        loading: false,
      });
      sessionStorage.setItem("token", token);
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      set({
        error: error,
        loading: false,
      });
      toast.error(error?.response?.data?.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  },

  logout: () => {
    set({
      token: null,
      user: null,
      isAuth: false,
    });
    sessionStorage.removeItem("token");
    toast.success("Logout berhasil", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },

  checkAuth: async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        set({ loading: true });
        const response = await axios.get(`${API_URL}/auth/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        set({
          token,
          user,
          isAuth: true,
          loading: false,
        });
      }
    } catch (error) {
      set({
        error: error,
        loading: false,
      });
    }
  },
}));
