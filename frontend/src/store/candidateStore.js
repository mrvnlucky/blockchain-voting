import { create } from "zustand";
import axios from "axios";

const API_URL = "`http://localhost:5050/api/v1/candidates/`";

export const useCandidateStore = create((set) => ({
  candidates: [],
  loading: false,
  error: null,

  getAllCandidates: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(API_URL);
      set({ candidates: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getOneCandidate: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get((API_URL, id));
      const candidate = response.data;
      set({ candidates: [candidate], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createCandidate: async (newCandidate) => {
    try {
      set({ loading: true });
      const response = await axios.post(API_URL, newCandidate);
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
      await axios.put((API_URL, id), updatedCandidate);
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
      await axios.delete((API_URL, id));
      set((state) => ({
        candidates: state.candidates.filter((candidate) => candidate.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
