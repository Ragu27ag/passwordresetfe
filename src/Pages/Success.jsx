import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  console.log("tok", token);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div style={{ textAlign: "end" }}>
        <button
          style={{
            backgroundColor: "#5454fe",
            border: "none",
            borderRadius: "8px",
            color: "white",
            marginTop: "5px",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3>Password Reseted and logged in successfully</h3>
        </div>
      </div>
    </>
  );
};

export default Success;
