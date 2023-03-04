import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { getRequest, patchRequest } from "api";
import { api } from "api/routes";
import { useDispatch } from "react-redux";
import { setCommunityDetail } from "state";

const initialSchema = {
  name: "",
  category: { name: "", icon: "", _id: "" },
  owner: { firstName: "", lastName: "", _id: "" },
  description: "",
};
const validationSchema = yup.object().shape({
  name: yup.string(),
  category: new yup.ObjectSchema({
    name: yup.string(),
    icon: yup.string(),
    _id: yup.string(),
  }),
  owner: new yup.ObjectSchema({
    firstName: yup.string(),
    lastName: yup.string(),
    _id: yup.string(),
  }),
  description: yup.string(),
});

const EditCommunity = ({ open, handleClose, users, userId, communityId }) => {
  const dispatch = useDispatch();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const communityUsers = users
    .map(({ firstName, lastName, _id }) => ({
      firstName,
      lastName,
      _id,
    }))
    .filter(({ _id }) => _id !== userId);

  async function handleFormSubmit(values, onSubmitProps) {
    const request = await patchRequest(api.community.edit(communityId), values);
    onSubmitProps.resetForm();
    handleClose();
    dispatch(setCommunityDetail(request));
  }
  useEffect(() => {
    async function getOptions() {
      setLoadingOptions(true);
      const requsest = await getRequest(api.category.get);
      if (requsest)
        setCategoryOptions(
          requsest.map(({ icon, name, _id }) => ({ icon, name, _id }))
        );
      setLoadingOptions(false);
    }
    getOptions();
  }, []);
  const isOptionEqualToValueCategory = (option, value) => {
    return (
      (option.name === value.name &&
        option.icon === value.icon &&
        option._id === value._id) ||
      value !== { name: "", icon: "", _id: "" }
    );
  };
  const isOptionEqualToValueUsers = (option, value) => {
    return (
      (option.firstName === value.firstName &&
        option.lastName === value.lastName &&
        option._id === value._id) ||
      value !== { firstName: "", lastName: "", _id: "" }
    );
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle variant="h3">Edit community</DialogTitle>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialSchema}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    loading={loadingOptions}
                    options={categoryOptions}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    isOptionEqualToValue={isOptionEqualToValueCategory}
                    onBlur={handleBlur}
                    onChange={(e, value) => {
                      setFieldValue(
                        "category",
                        value !== null ? value : { name: "", icon: "", _id: "" }
                      );
                    }}
                    value={values.category}
                    name="category"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Category"
                        variant="standard"
                        error={
                          Boolean(touched.category) && Boolean(errors.category)
                        }
                        helperText={touched.category && errors.category}
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={communityUsers}
                    getOptionLabel={(option) =>
                      option ? `${option.firstName} ${option.lastName}` : ""
                    }
                    isOptionEqualToValue={isOptionEqualToValueUsers}
                    onBlur={handleBlur}
                    onChange={(e, value) => {
                      setFieldValue(
                        "owner",
                        value !== null
                          ? value
                          : { firstName: "", lastName: "", _id: "" }
                      );
                    }}
                    value={values.owner}
                    name="owner"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Admin"
                        variant="standard"
                        error={Boolean(touched.owner) && Boolean(errors.owner)}
                        helperText={touched.owner && errors.owner}
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    variant="standard"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={
                      Boolean(touched.description) &&
                      Boolean(errors.description)
                    }
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                type="reset"
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Confirm
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditCommunity;
