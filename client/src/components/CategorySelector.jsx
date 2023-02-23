import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "./Icon";
import { setCategories as setReduxCategories } from '../state'

const CategorySelector = ({ onSelect, value = "", label }) => {
  const categoriesRedux = useSelector(state => state.categories)
  const dispatch = useDispatch()



  useEffect(() => {

    async function fetchData() {
      try {
        const request = await getRequest(api.category.get);
        dispatch(setReduxCategories(request))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [dispatch]);

  function onSelectWithIcon(event) {
    const value = event.target.value.split(" ");
    onSelect(value[0], value[1]);
  }

  if (!categoriesRedux) return <TextField select fullWidth />;
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
        {categoriesRedux.map(({ name, _id, icon }, key) => (
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
