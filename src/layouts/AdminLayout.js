import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
