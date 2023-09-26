import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);
const token = localStorage.getItem("adminToken");
const config = { headers: { Authorization: `Bearer ${token}` } };

export const useAdminStore = create((set) => ({
  admins: [],
  admin: {},
  loading: false,

  getAllAdmins: async () => {
    try {
      set({
        error: null,
        loading: true,
        success: false,
      });
      const response = await axios.get(`${API_URL}/admins`, config);
      set({
        admins: response.data,
        loading: false,
        success: true,
      });
      // toast.success(response.data.message, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    } catch (error) {
      set({
        error: error,
        loading: false,
      });
      // toast.error(error?.response?.data?.message, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  },

  getOneAdmin: async (id) => {
    try {
      set({
        error: null,
        loading: true,
        success: false,
      });
      const response = await axios.get(`${API_URL}/admins/${id}`, config);
      const admin = response.data;
      set({
        admin: admin,
        loading: false,
        success: true,
      });
      // toast.success(response.data.message, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      return admin;
    } catch (error) {
      set({
        error: error,
        loading: false,
        success: false,
      });
      // toast.error(error?.response?.data?.message, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  },

  createAdmin: async (newAdmin) => {
    try {
      set({
        error: null,
        loading: true,
        success: false,
      });
      const response = await axios.post(`${API_URL}/admins`, newAdmin, config);
      set((state) => ({
        admins: [...state.admins, response.data],
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

  updateAdmin: async (id, updatedAdmin) => {
    try {
      set({
        error: null,
        loading: true,
        success: false,
      });
      const response = await axios.put(
        `${API_URL}/admins/${id}`,
        updatedAdmin,
        config
      );
      set((state) => ({
        admins: state?.admins?.map((admin) =>
          admin.id === id ? updatedAdmin : admin
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

  deleteAdmin: async (id) => {
    try {
      set({
        error: null,
        loading: true,
        success: false,
      });
      const response = await axios.delete(`${API_URL}/admins/${id}`, config);
      set((state) => ({
        admins: state.admins.filter((admin) => admin.id !== id),
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
