import React, { useEffect, useState } from "react";
import backendinstance from "../Axios/axios.js";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  console.log("tok", token);

  useEffect(() => {
    setToken(localStorage.getItem("vertok"));
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  const handlesubmit = async () => {
    const mail = localStorage.getItem("mail");

    // console.log(mail);
    const verotp = { email: mail, otp: document.getElementById("otp").value };
    const res = await backendinstance.post("/verify/comp", verotp);
    console.log(res);
    if (res.data === "done") {
      navigate("/res");
    } else {
      alert("Enter the valid OTP");
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
        <p style={{ color: "grey", fontSize: "15px" }}>
          OTP sent to your registered email
        </p>
        <input id="otp" name="otp" required placeholder="Enter OTP..." />
        <br />
        <br />
        <button
          style={{
            backgroundColor: "#5454fe",
            border: "none",
            color: "white",
            borderRadius: "8px",
          }}
          onClick={handlesubmit}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Verify;
