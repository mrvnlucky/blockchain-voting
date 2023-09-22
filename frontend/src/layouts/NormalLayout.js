import Header from "../components/Header";

const NormalLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default NormalLayout;
