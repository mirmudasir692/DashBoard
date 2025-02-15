import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateStoreMutation,
  useGetStoreQuery,
} from "../../features/storeApiSlice";
import { useToast } from "../../globals/ToastContext";

const EditStore = ({ store, isOpen, handleClose }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const storeId = store?.id;
  const { data: storeData, isLoading } = useGetStoreQuery(storeId);
  const [updateStore] = useUpdateStoreMutation();

  const formik = useFormik({
    initialValues: {
      name: store?.name,
      ownerName: store?.contactName,
      email: store?.email,
      phone: store?.phone,
      licenseNumber: store?.licenseNumber,
      gstin: store?.gstin,
      state: store.address?.state,
      pincode: store.address?.pincode,
      locality: store.address?.locality,
      addressLine1: store.address?.addressLine1,
      addressLine2: store.address?.addressLine2,
      hasUserPaid: (store?.isSubscriptionActive && !store?.isOnTrial) || false,
      remmaingScans: store?.scansRemaining,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Store Name is required"),
      ownerName: Yup.string().required("Admin Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      licenseNumber: Yup.string().required("License Number is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .required("Pincode is required")
        .matches(/^[0-9]{6}$/, "Must be 6 digits"),
      locality: Yup.string().required("District is required"),
      addressLine1: Yup.string().required("Area is required"),
      remmaingScans: Yup.number()
        .required("Remaining Scans is required")
        .min(0, "Cannot be negative"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("values: ", values);
        await updateStore({ storeId, data: values }).unwrap();
        showToast("Store updated successfully", "success");
        handleClose();
        navigate(`/store/${storeId}`);
      } catch (err) {
        console.log("err: ", err);
        showToast(err.data?.error || "Error updating store", "error");
      }
    },
    enableReinitialize: true,
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Store</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <form className="mt-4">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Store Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Owner Name"
                  name="ownerName"
                  value={formik.values.ownerName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ownerName && Boolean(formik.errors.ownerName)
                  }
                  helperText={
                    formik.touched.ownerName && formik.errors.ownerName
                  }
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="License Number"
                  name="licenseNumber"
                  value={formik.values.licenseNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.licenseNumber &&
                    Boolean(formik.errors.licenseNumber)
                  }
                  helperText={
                    formik.touched.licenseNumber && formik.errors.licenseNumber
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="GSTIN"
                  name="gstin"
                  value={formik.values.gstin}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pincode && Boolean(formik.errors.pincode)
                  }
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Locality"
                  name="locality"
                  value={formik.values.locality}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.locality && Boolean(formik.errors.locality)
                  }
                  helperText={formik.touched.locality && formik.errors.locality}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Address Line 1"
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Address Line 2"
                  name="addressLine2"
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Remaining Scans"
                  name="remmaingScans"
                  type="number"
                  value={formik.values.remmaingScans}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.remmaingScans &&
                    Boolean(formik.errors.remmaingScans)
                  }
                  helperText={
                    formik.touched.remmaingScans && formik.errors.remmaingScans
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasUserPaid}
                      onChange={formik.handleChange}
                      name="hasUserPaid"
                    />
                  }
                  label="Has User Paid"
                />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="button"
          onClick={formik.handleSubmit}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStore;
