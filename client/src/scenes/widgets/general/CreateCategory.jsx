import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { postRequest } from "api";
import { api } from "api/routes";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "state";
import Icon, { iconValues } from "../../../components/Icon";

const CreateCategory = () => {
  const { palette } = useTheme();
  const [icon, setIcon] = useState("");
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null);
  const dark = palette.neutral.dark;
  const dispatch = useDispatch();

  async function createCommunity() {
    try {
      const request = await postRequest(api.category.create, {
        icon: icon,
        name: newName,
      });
      setNewName("");
      setIcon("");
      setError(null);
      dispatch(setCategories(request));
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  return (
    <WidgetWrapper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "8px",
      }}
    >
      <Typography color={dark} variant="h4" fontWeight="500">
        Create category
      </Typography>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={10}>
          <FormControl fullWidth onChange={(e) => setNewName(e.target.value)}>
            {!Boolean(newName) && <InputLabel>Name</InputLabel>}

            <TextField
              variant="standard"
              sx={{ my: "16px", ml: "8px" }}
              error={Boolean(error)}
              value={newName}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
            select
            variant="standard"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            fullWidth
          >
            {iconValues.map((icon, key) => (
              <MenuItem key={key} value={icon}>
                <Icon
                  name={icon}
                  sx={{ fontSize: "14px", textAlign: "center" }}
                />
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      {error}
      <Button
        variant="contained"
        sx={{ mt: "16px" }}
        disabled={!icon || !newName || Boolean(error)}
        onClick={createCommunity}
      >
        Create category
      </Button>
    </WidgetWrapper>
  );
};

export default CreateCategory;
