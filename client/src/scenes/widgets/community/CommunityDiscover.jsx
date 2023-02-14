import { getRequest, patchRequest } from "api";
import { api } from "api/routes";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Logout as LeaveIcon,
} from "@mui/icons-material";
import CategorySelector from "components/CategorySelector";
import Loader from "components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Icon from "components/Icon";
import { setAllCommunities, setCommunities } from "state";

const CommunityContainer = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.mediumMain;
  const darkHover = palette.primary.dark;
  const allCommunities = useSelector((state) => state.allCommunities);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState({ categoryId: "", icon: "" });
  const dispatch = useDispatch();
  const myCommunities = useSelector((state) => state.myCommunities);

  useEffect(() => {
    async function fetchData() {
      let request;
      if (!category.categoryId) {
        request = await getRequest(api.community.default);
      } else {
        request = await getRequest(
          api.community.getByCategoryId(category.categoryId)
        );
      }
      if (request) {
        dispatch(setAllCommunities(request));
      }
    }
    fetchData();
  }, [category, dispatch]);

  function filteredData() {
    if (!allCommunities) return allCommunities;
    return allCommunities
      .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
      .map((item) => ({ isParticipant: isParticipanting(item._id), ...item }));
  }
  function handleFilter({ target }) {
    setFilter(target.value);
  }

  async function joinLeaveCommunity(communityId, type) {
    try {
      const request = await patchRequest(
        api.community.joinCommunity(communityId),
        {
          userId: user._id,
        }
      );
      dispatch(setCommunities({ community: request, type: type }));
    } catch (error) {
      console.log(error);
    }
  }
  function isParticipanting(id) {
    return Boolean(myCommunities.find((item) => item._id === id));
  }

  if (!allCommunities)
    return (
      <WidgetWrapper sx={{ height: "80vh", overflow: "auto" }}>
        <Loader />
      </WidgetWrapper>
    );

  return (
    <WidgetWrapper sx={{ height: "80vh", overflow: "auto" }}>
      <Typography color={dark} variant="h4" fontWeight="500">
        Discover communities
      </Typography>
      <Grid container spacing={2} px={"16px"} py={"8px"}>
        <Grid item xs={6}>
          <TextField
            label={"Name"}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            placeholder="Filter"
            value={filter}
            onChange={handleFilter}
          />
        </Grid>
        <Grid item xs={6}>
          <CategorySelector
            onSelect={(id, icon) => setCategory({ categoryId: id, icon: icon })}
            value={`${category.categoryId}${category.icon ? " " : ""}${
              category.icon
            }`}
            label
          />
        </Grid>
      </Grid>

      <List>
        {filteredData().map(
          ({ name, category, users, _id, icon, isParticipant }, key) => (
            <ListItem key={key}>
              <FlexBetween
                p="0.2rem 0.75rem"
                sx={{
                  width: "100%",
                  "&:hover": {
                    background: darkHover,
                    transition: "0.5s background",
                    borderRadius: "0.75rem",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Icon name={icon} sx={{ mr: 2, color: main }} />
                  <Box>
                    <Typography color={main}>{name}</Typography>
                    <Typography color={main} fontSize={10}>
                      Number of members: {users.length}
                    </Typography>
                  </Box>
                </Box>
                <FlexBetween width={"120px"}>
                  <Typography color={medium}>{category}</Typography>

                  {isParticipant ? (
                    <Tooltip title="Leave community" sx={{ zIndex: 100 }}>
                      <IconButton
                        onClick={() => joinLeaveCommunity(_id, "leave")}
                      >
                        <LeaveIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Join community" sx={{ zIndex: 100 }}>
                      <IconButton
                        onClick={() => joinLeaveCommunity(_id, "join")}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </FlexBetween>
              </FlexBetween>
            </ListItem>
          )
        )}
      </List>
    </WidgetWrapper>
  );
};

export default CommunityContainer;
