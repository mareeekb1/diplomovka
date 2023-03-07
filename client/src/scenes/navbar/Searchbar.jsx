import { Autocomplete, TextField } from "@mui/material";
import { getRequest } from "api";
import { api } from "api/routes";
import React, { useEffect, useState } from "react";

const Searchbar = () => {
  const [options, setOptions] = useState([{ title: "a" }]);
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

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
      sx={{ width: 200 }}
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
