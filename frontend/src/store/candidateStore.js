import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5050/api/v1";

const adminToken = localStorage.getItem("adminToken");
const userToken = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${adminToken}`,
    "Content-Type": "multipart/form-data",
  },
};

export const useCandidateStore = create((set) => ({
  candidates: [],
  loading: false,
  error: null,

  getAllCandidates: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/candidates`);
      const candidates = response.data;
      set({
        candidates: candidates,
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

  getOneCandidate: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/candidates/${id}`);
      const candidate = response.data;
      set({
        candidates: [candidate],
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

  createCandidate: async (newCandidate) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `${API_URL}/candidates`,
        newCandidate,
        config
      );
      set((state) => ({
        candidates: [...state.candidates, response.data],
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

  updateCandidate: async (id, updatedCandidate) => {
    try {
      set({ loading: true });
      const response = await axios.put(
        `${API_URL}/candidates/${id}`,
        updatedCandidate,
        config
      );
      set((state) => ({
        candidates: state.candidates.map((candidate) =>
          candidate.id === id ? updatedCandidate : candidate
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

  deleteCandidate: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.delete(
        `${API_URL}/candidates/${id}`,
        config
      );
      set((state) => ({
        candidates: state.candidates.filter((candidate) => candidate.id !== id),
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

  voteCandidate: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/vote/cast/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      set({ loading: false });
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

  getVoteResult: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/vote/result`);
      const candidates = response.data;
      set({ candidates: candidates, loading: false });
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
