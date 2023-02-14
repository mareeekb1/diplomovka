import {
  Button,
  FormControl,
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
import { createCommunity as createCommunityAction } from "state";

const CreateCommunity = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState({ categoryId: "", icon: "" });
  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();
  const dark = palette.neutral.dark;

  async function createCommunity() {
    const state = { name: newName, owner: user._id, ...category };
    const request = await postRequest(api.community.create, state);
    console.log(request);
    if (request) {
      dispatch(createCommunityAction(request));
      setCategory({ categoryId: "", icon: "" });
      setNewName("");
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
        <TextField variant="standard" sx={{ my: "16px" }} label="Name" />
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
        disabled={!category || !newName}
        onClick={createCommunity}
      >
        Create community
      </Button>
    </WidgetWrapper>
  );
};

export default CreateCommunity;
