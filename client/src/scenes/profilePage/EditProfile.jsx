import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Dropzone from "react-dropzone";
import React from "react";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { postRequest } from "api";
import { api } from "api/routes";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "state";
import { professions } from "data/occupations";

const initialSchema = {
  occupation: "",
  location: "",
  picture: "",
};
const validationSchema = yup.object().shape({
  location: yup.string(),
  occupation: yup.string(),
  picture: yup.string(),
});

const EditProfile = ({ open, handleClose }) => {
  const { palette } = useTheme();
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  async function handleFormSubmit(values, onSubmitProps) {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    if (values.picture) {
      formData.append("picturePath", values.picture.name);
    }
    formData.append("userId", userId);
    const request = await postRequest(api.users.editProfile, formData);
    onSubmitProps.resetForm();
    handleClose();
    dispatch(editUser(request));
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle variant="h3">Edit profile</DialogTitle>
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    options={professions}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                    onBlur={handleBlur}
                    onChange={(e, value) => {
                      setFieldValue("occupation", value !== null ? value : "");
                    }}
                    value={values.occupation}
                    name="occupation"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Occupation"
                        variant="standard"
                        error={
                          Boolean(touched.occupation) &&
                          Boolean(errors.occupation)
                        }
                        helperText={touched.occupation && errors.occupation}
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ textDecoration: "underline" }}>
                    Edit profile picture
                  </Typography>
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
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

export default EditProfile;
