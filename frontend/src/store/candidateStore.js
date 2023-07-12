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
      set({ candidates: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getOneCandidate: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/candidates/${id}`);
      const candidate = response.data;
      set({ candidates: [candidate], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createCandidate: async (newCandidate) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_URL}/candidates`, newCandidate);
      set((state) => ({
        candidates: [...state.candidates, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateCandidate: async (id, updatedCandidate) => {
    try {
      set({ loading: true });
      await axios.put(`${API_URL}/candidates/${id}`, updatedCandidate);
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
      set({ candidates: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
