import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AddIcon from "@mui/icons-material/Add"; // import AddIcon

import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function AdminDashboard() {
  const { users, loading, error, getAllUsers, deleteUser } = useUserStore();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllUsers();
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh, getAllUsers]);

  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 160 },
    { field: "nik", headerName: "NIK", width: 160 },
    { field: "password", headerName: "Password", width: 160 },
    { field: "walletAddress", headerName: "Wallet Address", width: 160 },
    { field: "privateKey", headerName: "Private Key", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 240,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  const handleEdit = (id) => {
    // Handle edit functionality
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    // Handle delete functionality
    await deleteUser(id);
    setRefresh(true);
  };

  const handleAdd = () => {
    // Handle add functionality
    navigate("add"); // navigate to add candidate page
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add user
        </Button>
        <DataGrid
          rows={users?.data ? users.data : ""}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
}
