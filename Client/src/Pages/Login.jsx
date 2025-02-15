import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import backgroundPattern from "../assets/images/image.png";
import { useAuthStatusQuery, useLoginMutation } from "../features/authApiSlice";
import { useToast } from "../globals/ToastContext";
import useTitle from "../Hooks/useTitle";
// import {useTitle} from "../Hooks/useTitle";

function Login() {
  // useTitle("Login");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigator = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    data,
    isLoading: isAuthenticating,
    isError: isErrorAuthenticating,
  } = useAuthStatusQuery();
  const isAuthenticated = isErrorAuthenticating ? false : data?.isAuthenticated;
  if (isAuthenticated) {
    navigator("/");
  }
  const { showToast } = useToast();
  const [login, { isLoading }] = useLoginMutation();
  useTitle("Login | Mediflux");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Login Data:", values);
        const response = await login({ ...values }).unwrap();
        console.log("Login Response:", response);
        navigator("/");
      } catch (error) {
        console.log("Login Error:", error.data.error);
        showToast(error.data.error, "error");
        console.error("Login Error:", error.data.error);
      }
    },
  });

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
        }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "rgba(0,0,0,.25)",
          }}
        ></div>
        <div
          className="flex flex-col justify-center items-center px-20 z-10"
          style={{
            transform: "translateY(-5rem)",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
          }}
        >
          <h1
            className="font-bold text-white"
            style={{
              marginBottom: "-1rem",
              fontSize: "5rem",
            }}
          >
            MediFlux Management Dashboard
          </h1>
          <p className="text-lg mb-10 text-white italic font-semibold mt-4">
            Centralised control for seamless pharmacy operations and
            administration
          </p>
        </div>

        <div className="flex items-center justify-center z-10">
          <div
            className="bg-white shadow-lg rounded-xl p-8 border border-primary"
            style={{
              transform: "translateY(-5rem)",
              width: "30rem",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col items-center gap-5"
            >
              <h2 className="text-2xl font-bold text-primary-500 mb-5 uppercase">
                Log In
              </h2>
              <TextField
                autoComplete="off"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                className="w-full"
              />

              <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  py: 1.5,
                  width: "100%",
                  fontSize: "1rem",
                  backgroundColor: "rgb(0 128 128 / var(--tw-bg-opacity, 1))",
                  "&:hover": {
                    backgroundColor: "rgb(0 140 140 / var(--tw-bg-opacity, 1))",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
{
  /* */
}
