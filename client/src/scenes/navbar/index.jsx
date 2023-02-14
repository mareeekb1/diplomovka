import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Public as PublicIcon,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Home,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setCommunitiesFromApi } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { getRequest } from "api";
import { api } from "api/routes";
import Icon from "components/Icon";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const userId = useSelector((state) => state.user._id);
  const myCommunities = useSelector((state) => state.myCommunities);

  useEffect(() => {
    async function fetchData() {
      const request = await getRequest(api.community.getByUserId(userId));
      if (request) {
        dispatch(setCommunitiesFromApi(request));
      }
    }
    fetchData();
  }, [dispatch, userId]);

  function shortenName(name) {
    let workingName = name.split(" ");
    if (workingName.length < 2) return name;
    let newName = [];
    workingName.forEach((item) => {
      newName.push(item[0]);
    });
    return newName.join("");
  }

  function renderComminityTags() {
    return myCommunities.slice(0, 10).map((item, key) => {
      const { name, icon, _id } = item;
      const fullItemName = name;
      let newName = name;
      if (name.length > 10) newName = shortenName(name);
      return (
        <Tooltip title={fullItemName} key={key}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <IconButton onClick={() => navigate("/community/" + _id)}>
              <Icon name={icon} sx={{ fontSize: "25px" }} />
            </IconButton>
            <Typography>{newName}</Typography>
          </Box>
        </Tooltip>
      );
    });
  }

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
              transition: "color 0.5s",
            },
          }}
        >
          Expert
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <IconButton onClick={() => navigate("/home")}>
                <Home sx={{ fontSize: "25px" }} />
              </IconButton>
              <Typography>Home</Typography>
            </Box>
            <Tooltip title={"Discover communities"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <IconButton onClick={() => navigate("/community")}>
                  <PublicIcon sx={{ fontSize: "25px" }} />
                </IconButton>
                <Typography>Discover</Typography>
              </Box>
            </Tooltip>
            {myCommunities && (
              <>
                <Divider orientation="vertical" sx={{ height: "auto" }} />
                {renderComminityTags()}
              </>
            )}
          </Box>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                value={"Switch modes"}
                onClick={() => dispatch(setMode())}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "16px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "16px" }} />
                )}
                <Typography ml={"4px"}>Switch modes</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/home")}>
              <Home sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton onClick={() => navigate("/community")}>
              <PublicIcon sx={{ fontSize: "25px" }} />
            </IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem
                  value={"Switch modes"}
                  onClick={() => dispatch(setMode())}
                >
                  {theme.palette.mode === "dark" ? (
                    <DarkMode sx={{ fontSize: "16px" }} />
                  ) : (
                    <LightMode sx={{ color: dark, fontSize: "16px" }} />
                  )}
                  <Typography ml={"4px"}>Switch modes</Typography>
                </MenuItem>
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
