import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import backendinstance from "../Axios/axios";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const validation = yup.object().shape({
    email: yup.string().email().required("enter the email"),
    password: yup.string().required("enter the password"),
  });

  const loginform = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoad(true);

        const res = await backendinstance.post("/login", values);
        if (res.data === "Invalid Credentials") {
          setLoad(false);

          alert(res.data);
        } else {
          console.log(res.data);
          localStorage.setItem("token", res.data.tok);
          loginform.resetForm();
          navigate("/suc");
        }
      } catch (error) {
        setLoad(false);
        throw new Error(error);
      }
    },
    validationSchema: validation,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          height: "300px",
          width: "400px",
        }}
      >
        <form onSubmit={loginform.handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            value={loginform.values.email}
            onChange={loginform.handleChange}
            onBlur={loginform.handleBlur}
          />
          {loginform.touched.email && loginform.errors.email && (
            <div
              style={{ fontSize: "12px", color: "red", position: "relative" }}
            >
              <p>{loginform.errors.email}</p>
              <div></div>
            </div>
          )}
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            value={loginform.values.password}
            onChange={loginform.handleChange}
            onBlur={loginform.handleBlur}
          />
          {loginform.touched.password && loginform.errors.password && (
            <div
              style={{ fontSize: "12px", color: "red", position: "relative" }}
            >
              <p> {loginform.errors.password}</p>
              <div></div>
            </div>
          )}
          <br />
          <br />
          <button
            style={{
              borderRadius: "8px",
              backgroundColor: "#5454fe",
              border: "none",
              color: "white",
            }}
            type="submit"
          >
            {load ? (
              <CircularProgress size="15px" style={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </button>
          &nbsp;&nbsp;&nbsp;
          <Link style={{ textDecoration: "none" }} to="/forgot">
            Forgot Password?
          </Link>
          <br />
          <br />
          <Link style={{ textDecoration: "none" }} to="/register">
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
