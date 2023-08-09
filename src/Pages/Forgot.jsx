import React from "react";
import backendinstance from "../Axios/axios";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();

  const handlesubmit = async () => {
    const mail = document.getElementById("email").value;
    localStorage.setItem("mail", mail);
    const obj = {
      mail: mail,
    };
    const res = await backendinstance.post("/verify", obj);
    console.log(res);
    if (res.data.msg === "check") {
      localStorage.setItem("vertok", res.data.vertok);
      navigate("/ver");
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
        <>
          <p>Enter registered email</p>
          <input type="email" name="email" id="email" />
          <br />
          <br />
          <button
            style={{
              borderRadius: "8px",
              color: "white",
              backgroundColor: "#5454fe",
              border: "none",
            }}
            onClick={handlesubmit}
          >
            send OTP
          </button>
        </>
      </div>
    </div>
  );
};

export default Forgot;
