import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCandidateStore } from "../../store/candidateStore";
import { useNavigate } from "react-router-dom";

const CandidateNewPage = () => {
  const navigate = useNavigate();

  const { success, loading, error, createCandidate } = useCandidateStore();
  const [candidateNo, setCandidateNo] = useState("");
  const [name, setName] = useState("");
  const [vision, setVision] = useState("");
  const [missions, setMissions] = useState([""]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(selectedImage);
  }, [selectedImage]);

  const handleMissionChange = (index, value) => {
    const updateMissions = [...missions];
    updateMissions[index] = value;
    setMissions(updateMissions);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleAddMission = () => {
    setMissions([...missions, ""]);
  };

  const handleRemoveMission = (index) => {
    const updatedMissions = [...missions];
    updatedMissions.splice(index, 1);
    setMissions(updatedMissions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("candidateNo", candidateNo);
    formData.append("name", name);
    formData.append("vision", vision);
    for (var i = 0; i < missions.length; i++) {
      formData.append("mission[]", missions[i]);
    }
    formData.append("img", selectedImage);

    createCandidate(formData);
    if (success) {
      navigate("/su/candidates");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 1,
          p: 2,
        }}
      >
        <Typography
          component={"h1"}
          variant="h5"
          color="text.primary"
          fontFamily="Roboto"
          align="center"
        >
          Create new Candidate
        </Typography>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            label="Nomor Kandidat"
            error={error && candidateNo === ""}
            helperText={
              error && candidateNo === "" ? "Silahkan isi nomor kandidat" : ""
            }
            value={candidateNo}
            onChange={(e) => setCandidateNo(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            label="Nama Kandidat"
            error={error && name === ""}
            helperText={
              error && name === "" ? "Silahkan isi nama kandidat" : ""
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            label="Visi Kandidat"
            error={error && vision === ""}
            helperText={
              error && vision === "" ? "Silahkan isi visi kandidat" : ""
            }
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        {missions?.map((mission, index) => (
          <Box
            component={"div"}
            key={index}
            sx={{ mt: 2, display: "flex", alignItems: "center" }}
          >
            <TextField
              label={`Misi ke-${index + 1} Kandidat`}
              multiline
              error={error && mission === ""}
              helperText={
                error && mission === "" ? "Silahkan isi misi kandidat" : ""
              }
              value={mission}
              sx={{ width: "80%" }}
              onChange={(e) => handleMissionChange(index, e.target.value)}
            />
            <Button onClick={() => handleRemoveMission(index)}>Hapus</Button>
          </Box>
        ))}
        <Button onClick={handleAddMission} sx={{ my: 0 }}>
          Add Bullet Point
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", my: 0 }}>
          <Button type="submit" sx={{ justifyContent: "centers" }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CandidateNewPage;
