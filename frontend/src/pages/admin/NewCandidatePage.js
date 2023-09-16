import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCandidateStore } from "../../store/candidateStore";
import { useNavigate } from "react-router-dom";

const NewCandidatePage = () => {
  const navigate = useNavigate();

  const { createCandidate } = useCandidateStore();
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
    // console.log(updateMissions);
    setMissions(updateMissions);
    // console.log(missions);
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
    console.log(updatedMissions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   candidateNo: candidateNo,
    //   name: name,
    //   vision: vision,
    //   mission: missions,
    //   img: uploadedImage?.path,
    // };

    const formData = new FormData();
    formData.append("candidateNo", candidateNo);
    formData.append("name", name);
    formData.append("vision", vision);
    for (var i = 0; i < missions.length; i++) {
      formData.append("mission[]", missions[i]);
    }
    formData.append("img", selectedImage);

    console.log(formData);
    createCandidate(formData);
    navigate("/su/candidates");
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
            value={candidateNo}
            onChange={(e) => setCandidateNo(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            label="Nama Kandidat"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component={"div"} sx={{ my: 2 }}>
          <TextField
            label="Visi Kandidat"
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
              multiline
              value={mission}
              sx={{ width: "80%" }}
              onChange={(e) => handleMissionChange(index, e.target.value)}
            />
            <Button onClick={() => handleRemoveMission(index)}>Remove</Button>
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

export default NewCandidatePage;
