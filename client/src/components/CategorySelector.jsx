import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import React, { useEffect, useState } from "react";
import Icon from "./Icon";

const CategorySelector = ({ onSelect, value = "", label }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await getRequest(api.category.get);
      setCategories(request);
    }
    fetchData();
  }, []);

  function onSelectWithIcon(event) {
    const value = event.target.value.split(" ");
    onSelect(value[0], value[1]);
  }

  if (!categories) return <TextField select fullWidth />;
  return (
    <FormControl fullWidth>
      {label && <InputLabel>Category</InputLabel>}
      <Select
        variant="standard"
        fullWidth
        placeholder="Category"
        onChange={(e) => onSelectWithIcon(e)}
        value={value}
      >
        <MenuItem value={""}>
          <em>None</em>
        </MenuItem>
        {categories.map(({ name, _id, icon }, key) => (
          <MenuItem
            value={`${_id} ${icon}`}
            key={key}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {name}
            <Icon name={icon} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelector;
