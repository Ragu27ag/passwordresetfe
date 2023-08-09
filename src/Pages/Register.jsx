import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import backendinstance from "../Axios/axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const validation = yup.object().shape({
    username: yup
      .string()
      .min(2, "min 2 characters")
      .required("enter username"),
    email: yup.string().email().required("enter email"),
    password: yup.string().required("enter password"),
    confirmpassword: yup.string().required("enter confirm password"),
  });

  const formdata = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },

    onSubmit: async (values) => {
      if (values.password !== values.confirmpassword) {
        alert("passwords does not match");
      } else {
        delete values.confirmpassword;
        console.log(values);
        const res = await backendinstance.post("/register", values);
        if (res) {
          formdata.resetForm();
          navigate("/");
        }
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          height: "500px",
          width: "400px",
        }}
      >
        <form onSubmit={formdata.handleSubmit}>
          <label>User name</label>
          <br />
          <input
            type="username"
            name="username"
            value={formdata.values.username}
            onChange={formdata.handleChange}
            onBlur={formdata.handleBlur}
            id="email"
          />
          {formdata.touched.username && formdata.errors.username && (
            <div
              style={{ fontSize: "12px", color: "red", position: "relative" }}
            >
              {formdata.errors.username}{" "}
            </div>
          )}
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            username="email"
            value={formdata.values.email}
            onChange={formdata.handleChange}
            onBlur={formdata.handleBlur}
            id="email"
          />
          {formdata.touched.email && formdata.errors.email && (
            <div
              style={{ fontSize: "12px", color: "red", position: "relative" }}
            >
              {formdata.errors.email}{" "}
            </div>
          )}
          <br />
          <label>Password</label>
          <br />
          <input
            value={formdata.values.password}
            onChange={formdata.handleChange}
            onBlur={formdata.handleBlur}
            type="password"
            username="password"
            id="password"
          />
          {formdata.touched.password && formdata.errors.password && (
            <div
              style={{ fontSize: "12px", color: "red", position: "relative" }}
            >
              {formdata.errors.password}
            </div>
          )}
          <br />
          <label>Confirm Password</label>
          <br />
          <input
            value={formdata.values.confirmpassword}
            onChange={formdata.handleChange}
            onBlur={formdata.handleBlur}
            type="password"
            username="confirmpassword"
            id="confirmpassword"
          />
          {formdata.touched.confirmpassword &&
            formdata.errors.confirmpassword && (
              <div
                style={{ fontSize: "12px", color: "red", position: "relative" }}
              >
                {formdata.errors.confirmpassword}
              </div>
            )}
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: "#5454fe",
              border: "none",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Sign UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
