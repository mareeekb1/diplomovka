import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { postRequest } from "api";
import { api } from "api/routes";
import CategorySelector from "components/CategorySelector";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCommunity as createCommunityAction } from "state";

const CreateCommunity = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState({ categoryId: "", icon: "" });
  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();
  const dark = palette.neutral.dark;
  const navigate = useNavigate();

  async function createCommunity() {
    const state = { name: newName, owner: user._id, ...category };
    const request = await postRequest(api.community.create, state);
    if (request) {
      dispatch(createCommunityAction(request));
      setCategory({ categoryId: "", icon: "" });
      setNewName("");
      navigate(request._id);
    }
  }
  return (
    <WidgetWrapper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color={dark} variant="h4" fontWeight="500">
        Create community
      </Typography>
      <FormControl
        fullWidth
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
      >
        {!newName && <InputLabel>Name</InputLabel>}

        <TextField variant="standard" sx={{ my: "16px", ml: "8px" }} />
      </FormControl>
      <CategorySelector
        value={`${category.categoryId}${category.icon ? " " : ""}${
          category.icon
        }`}
        onSelect={(id, icon) => setCategory({ categoryId: id, icon: icon })}
        label
      />
      <Button
        variant="contained"
        sx={{ mt: "16px" }}
        disabled={!category.categoryId || !newName}
        onClick={createCommunity}
      >
        Create community
      </Button>
    </WidgetWrapper>
  );
};

export default CreateCommunity;
