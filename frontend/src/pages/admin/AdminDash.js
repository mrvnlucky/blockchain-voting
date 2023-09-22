import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add"; // import AddIcon

import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";

export default function AdminDash() {
  const { admins, loading, error, getAllAdmins, deleteAdmin } = useAdminStore();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllAdmins();
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh, getAllAdmins]);

  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 160 },
    { field: "username", headerName: "Username", width: 160 },
    { field: "password", headerName: "Password", width: 160 },
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
    await deleteAdmin(id);
    setRefresh(true);
  };

  const handleAdd = () => {
    // Handle add functionality
    navigate("add"); // navigate to add candidate page
  };

  return (
    <Box sx={{ display: "flex" }}>
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
          Add admin
        </Button>
        <DataGrid
          rows={admins?.data ? admins.data : ""}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
}
