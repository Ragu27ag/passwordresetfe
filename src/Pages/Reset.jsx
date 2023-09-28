import React, { useEffect, useState } from "react";
import backendinstance from "../Axios/axios";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

const Reset = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const [load, setLoad] = useState(false);

  console.log("tok", token);

  useEffect(() => {
    setToken(localStorage.getItem("vertok"));
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);
  const handleCreate = async () => {
    try {
      setLoad(true);
      const password = document.getElementById("pass").value;
      const conpassword = document.getElementById("conpass").value;
      const mail = localStorage.getItem("mail");
      const data = {
        email: mail,
        pass: password,
      };
      if (password !== conpassword) {
        alert("Passwords does not match");
      } else {
        const res = await backendinstance.post("/reset", data);
        if (res.data === "updated successfully") {
          localStorage.removeItem("mail");
          localStorage.removeItem("vertok");
          navigate("/");
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          marginTop: "150px",
          flexWrap: "wrap",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          width: "400px",
          height: "300px",
          textAlign: "center",
          paddingTop: "50px",
        }}
      >
        <label htmlFor="pass">Create Password</label>
        <br />
        <input id="pass" name="password" type="password" required />
        <br />
        <br />
        <label htmlFor="conpass">Confirm Password</label>
        <br />
        <input id="conpass" name="confirmpassword" type="password" required />
        <br />
        <br />
        <button
          style={{
            backgroundColor: "#5454fe",
            border: "none",
            color: "white",
            borderRadius: "8px",
          }}
          onClick={handleCreate}
        >
          {load ? (
            <CircularProgress size="14px" sx={{ color: "white" }} />
          ) : (
            "Create "
          )}
        </button>
      </div>
    </div>
  );
};

export default Reset;
