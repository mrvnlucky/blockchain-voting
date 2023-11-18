import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const adminToken = sessionStorage.getItem("adminToken");

const config = { headers: { Authorization: `Bearer ${adminToken}` } };

export const useStatusStore = create((set) => ({
  status: false,
  success: false,
  error: null,
  loading: false,

  getStatus: async () => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.get(`${API_URL}/vote`);
      set({
        status: response.data.data,
        loading: false,
        success: true,
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

  startVote: async () => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.post(`${API_URL}/vote/start`, {}, config);
      set({
        status: true,
        loading: false,
        success: true,
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

  stopVote: async () => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.post(`${API_URL}/vote/stop`, {}, config);
      set({
        status: false,
        loading: false,
        success: true,
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
