import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:5050/api/v1";

export const useUserStore = create((set) => ({
  results: [],
  loading: false,
  error: null,

  getResult: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}result`);
      set({ results: response.data, loading: false });
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

  getAllUsers: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(API_URL);
      set({ users: response.data, loading: false });
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

  getOneUser: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get((API_URL, id));
      const user = response.data;
      set({ users: [user], loading: false });
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

  createUser: async (newUser) => {
    try {
      set({ loading: true });
      const response = await axios.post(API_URL, newUser);
      set((state) => ({
        users: [...state.users, response.data],
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

  updateUser: async (id, updatedUser) => {
    try {
      set({ loading: true });
      const response = await axios.put((API_URL, id), updatedUser);
      set((state) => ({
        users: state.users.map((candidate) =>
          candidate.id === id ? updatedUser : candidate
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

  deleteUser: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete((API_URL, id));
      set((state) => ({
        users: state.users.filter((candidate) => candidate.id !== id),
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
