import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

const token = localStorage.getItem("adminToken");
const config = { headers: { Authorization: `Bearer ${token}` } };

export const useUserStore = create((set) => ({
  users: [],
  user: {},
  loading: false,
  error: null,
  success: false,

  getAllUsers: async () => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.get(`${API_URL}/users`, config);
      set({
        users: response.data,
        loading: false,
        success: true,
      });
    } catch (error) {
      set({
        error: error,
        loading: false,
        success: false,
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

  getOneUser: async (id) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.get(`${API_URL}/users/${id}`, config);
      const user = response.data;
      set({
        user: response.data,
        loading: false,
        success: true,
      });
      return user;
    } catch (error) {
      set({
        error: error,
        loading: false,
        success: false,
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

  createUser: async (newUser) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.post(`${API_URL}/users`, newUser, config);
      set((state) => ({
        users: [...state.users, response.data],
        loading: false,
        success: true,
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
        success: false,
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

  updateUser: async (id, updatedUser) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.put(
        `${API_URL}/users/${id}`,
        updatedUser,
        config
      );
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false,
        success: true,
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
        success: false,
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

  deleteUser: async (id) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.delete(`${API_URL}/users/${id}`, config);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
        success: true,
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
        success: false,
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
}));
