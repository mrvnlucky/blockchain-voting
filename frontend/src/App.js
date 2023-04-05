import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Candidate from "./pages/Candidate";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
// import Wallet from "./utils/Wallet";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/candidate/:id" element={<Candidate />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
