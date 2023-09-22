import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5050/api/v1";
const token = localStorage.getItem("adminToken");
const config = { headers: { Authorization: `Bearer ${token}` } };

export const useAdminStore = create((set) => ({
  admins: [],
  loading: false,
  error: null,

  getAllAdmins: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/admins`, config);
      set({
        admins: response.data,
        loading: false,
      });
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

  getOneAdmin: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/admins/${id}`);
      const admin = response.data;
      set({ admins: [admin], loading: false });
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
      set({ error: error, loading: false });
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

  createAdmin: async (newAdmin) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/admins`, newAdmin, config);
      set((state) => ({
        admins: [...state.admins, response.data],
        loading: false,
      }));
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

  updateAdmin: async (id, updatedAdmin) => {
    try {
      set({ loading: true });
      const response = await axios.put(
        `${API_URL}/admins/${id}`,
        updatedAdmin,
        config
      );
      set((state) => ({
        admins: state.admins.map((admin) =>
          admin.id === id ? updatedAdmin : admin
        ),
        loading: false,
      }));
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
      set({ error: error, loading: false });
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

  deleteAdmin: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete(`${API_URL}/admins/${id}`, config);
      set((state) => ({
        admins: state.admins.filter((admin) => admin.id !== id),
        loading: false,
      }));
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
      set({ error: error, loading: false });
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
}));
