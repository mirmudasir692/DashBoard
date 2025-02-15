import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Container,
  Grid,
  Typography,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@mui/material";
import useTitle from "../../Hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { useCreateStoreMutation } from "../../features/storeApiSlice";
import { useToast } from "../../globals/ToastContext";
import PrimaryButton from "../../globals/PirmaryButton";

const CreateStore = () => {
  useTitle("Add Store | MediFlux");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [createStore, { isLoading }] = useCreateStoreMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      ownerName: "",
      email: "",
      phone: "",
      licenseNumber: "",
      gstin: "",
      state: "",
      pincode: "",
      locality: "",
      addressLine1: "",
      addressLine2: "",
      password: "",
      confirmPassword: "",
      hasUserPaid: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Store Name is required"),
      ownerName: Yup.string().required("Admin Name is required"),
      email: Yup.string().required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      licenseNumber: Yup.string().required("License Number is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .required("Pincode is required")
        .matches(/^[0-9]{6}$/, "Must be 6 digits"),
      locality: Yup.string().required("District is required"),
      addressLine1: Yup.string().required("Area is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("values: ", values);
        const result = await createStore(values).unwrap();
        console.log("result: ", result);
        navigate(`/stores/${result?.store?.id}`);
        showToast("Store created successfully", "success");
        resetForm();
      } catch (err) {
        showToast(err.data?.error || "Error creating store", "error");
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mb={3}>
        Create New Store
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Owner"
              name="ownerName"
              value={formik.values.ownerName}
              onChange={formik.handleChange}
              error={
                formik.touched.ownerName && Boolean(formik.errors.ownerName)
              }
              helperText={formik.touched.ownerName && formik.errors.ownerName}
              required={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              required={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="License"
              name="licenseNumber"
              type="licenseNumber"
              value={formik.values.licenseNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.licenseNumber &&
                Boolean(formik.errors.licenseNumber)
              }
              helperText={
                formik.touched.licenseNumber && formik.errors.licenseNumber
              }
              required={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="GSTIN"
              name="gstin"
              value={formik.values.gstin}
              onChange={formik.handleChange}
              error={formik.touched.gstin && Boolean(formik.errors.gstin)}
              helperText={formik.touched.gstin && formik.errors.gstin}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
              ]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              error={formik.touched.pincode && Boolean(formik.errors.pincode)}
              helperText={formik.touched.pincode && formik.errors.pincode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="District"
              name="locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Area"
              name="addressLine1"
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              error={
                formik.touched.addressLine1 &&
                Boolean(formik.errors.addressLine1)
              }
              helperText={
                formik.touched.addressLine1 && formik.errors.addressLine1
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Landmark"
              name="addressLine2"
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              error={
                formik.touched.addressLine2 &&
                Boolean(formik.errors.addressLine2)
              }
              helperText={
                formik.touched.addressLine2 && formik.errors.addressLine2
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.hasUserPaid}
                  onChange={formik.handleChange}
                  name="hasUserPaid"
                  value={formik.values.hasUserPaid}
                />
              }
              label="Has User Paid"
              labelPlacement="end"
            />
          </Grid>
        </Grid>
        <PrimaryButton
          label="Create Store"
          loading={isLoading}
          type="button"
          fullWidth
          sx={{ mt: 3 }}
          onClick={formik.handleSubmit}
        />
      </form>
    </Container>
  );
};

export default CreateStore;
