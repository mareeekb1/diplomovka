import { Autocomplete, TextField } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [options, setOptions] = useState([{ title: "a" }]);
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    if (!loading) return undefined;

    (async () => {
      if (active) {
        setOptions([]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  async function fetchOptions(value) {
    const searchValue = value || null;
    const request = await getRequest(api.general.search(searchValue));
    if (request) {
      const newMap = new Map();
      request.forEach((item) => {
        const prevValue = newMap.get(item.id);
        if (!prevValue) {
          newMap.set(item.id, item);
        }
      });
      const finalArray = [...newMap.values()];
      setOptions(finalArray);
    }
  }
  function handleChange(_, value) {
    if (!value) return;
    if (value.group === "Users") navigate("/profile/" + value.id);
    if (value.group === "Community") navigate("/community/" + value.id);
  }
  return (
    <Autocomplete
      loadingText="No results"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) =>
        option.id === value.id && option.group === value.group
      }
      sx={{ width: 200 }}
      onChange={handleChange}
      loading={loading}
      filterOptions={(x) => x}
      onInputChange={(event, value) => fetchOptions(value)}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search" variant="standard" />
      )}
    />
  );
};

export default Searchbar;
