import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const adminToken = sessionStorage.getItem("adminToken");
const userToken = sessionStorage.getItem("token");
const adminConfig = {
  headers: {
    Authorization: `Bearer ${adminToken}`,
    "Content-Type": "multipart/form-data",
  },
};

const userConfig = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

export const useCandidateStore = create((set) => ({
  candidates: [],
  loading: false,
  error: null,
  success: false,
  candidate: {},

  getAllCandidates: async () => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.get(`${API_URL}/candidates`);
      const candidates = response.data;
      set({
        candidates: candidates,
        loading: false,
        success: true,
      });
    } catch (error) {
      set({
        error: error,
        loading: false,
        success: false,
      });
    }
  },

  getOneCandidate: async (id) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.get(`${API_URL}/candidates/${id}`);
      const candidate = response.data;
      set({
        candidate: candidate,
        loading: false,
        success: true,
      });

      return candidate;
    } catch (error) {
      set({
        error: error,
        loading: false,
        success: false,
      });
    }
  },

  createCandidate: async (newCandidate) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.post(
        `${API_URL}/candidates`,
        newCandidate,
        adminConfig
      );

      set((state) => ({
        candidates: [...state.candidates, response.data],
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

  updateCandidate: async (id, updatedCandidate) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.put(
        `${API_URL}/candidates/${id}`,
        updatedCandidate,
        adminConfig
      );
      set((state) => ({
        candidates: state.candidates.map((candidate) =>
          candidate.id === id ? updatedCandidate : candidate
        ),
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

  deleteCandidate: async (id) => {
    try {
      set({
        success: false,
        error: null,
        loading: true,
      });
      const response = await axios.delete(
        `${API_URL}/candidates/${id}`,
        adminConfig
      );
      set((state) => ({
        candidates: state.candidates.filter((candidate) => candidate.id !== id),
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
