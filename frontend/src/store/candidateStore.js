import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5050/api/v1";

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
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      throw error;
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
      return candidate;
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      console.error(error);
      throw error;
    }
  },

  createCandidate: async (newCandidate) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/candidates`, newCandidate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const response = await axios.post(`${API_URL}/candidates`, newCandidate, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      set((state) => ({
        candidates: [...state.candidates, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  updateCandidate: async (id, updatedCandidate) => {
    try {
      set({ loading: true });
      await axios.put(`${API_URL}/candidates/${id}`, updatedCandidate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // await axios.put(`${API_URL}/candidates/${id}`, updatedCandidate, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      set((state) => ({
        candidates: state.candidates.map((candidate) =>
          candidate.id === id ? updatedCandidate : candidate
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteCandidate: async (id) => {
    try {
      set({ loading: true });
      await axios.delete(`${API_URL}/candidates/${id}`);
      set((state) => ({
        candidates: state.candidates.filter((candidate) => candidate.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getVoteResult: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/vote/result`);
      const candidates = response.data;
      set({ candidates: candidates, loading: false });
      return candidates;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
