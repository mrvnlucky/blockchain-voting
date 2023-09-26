import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

export const useAdminAuthStore = create((set) => ({
  token: null,
  admin: null,
  isAuth: false,
  loading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `${API_URL}/auth/admin/login`,
        credentials
      );
      const { token, admin } = response.data.data;
      set({
        token,
        admin,
        isAuth: true,
        loading: false,
      });
      localStorage.setItem("adminToken", token);
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
      admin: null,
      isAuth: false,
    });
    localStorage.removeItem("adminToken");
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
      const token = localStorage.getItem("adminToken");
      if (token) {
        set({ loading: true });
        const response = await axios.get(`${API_URL}/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const admin = response.data.data;
        set({
          token,
          admin,
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
