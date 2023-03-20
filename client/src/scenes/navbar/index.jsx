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
  Help,
  Menu,
  Close,
  Home,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setCommunitiesFromApi } from "state";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { getRequest } from "api";
import { api } from "api/routes";
import Icon from "components/Icon";
import Messenger from "scenes/widgets/messenger/Messenger";
import Searchbar from "./Searchbar";
import Notifications from "./Notifications";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const params = useParams();
  const location = useLocation();
  const pathname = location.pathname.slice(1, location.pathname.length);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const main = theme.palette.neutral.main;
  const primary = theme.palette.primary.main;

  const fullName = `${user.firstName} ${user.lastName}`;
  const userId = useSelector((state) => state.user._id);
  const myCommunities = useSelector((state) => state.myCommunities);

  const isHome = pathname === "home";
  const isCommunity = pathname === "community";
  const isProfile = pathname === "profile/" + user._id;

  function NavigationBadge(props) {
    const { item, link } = props;
    const { name, icon, _id } = item;
    const fullItemName = name;
    const isInParams = params.communityId === _id;
    const color = isInParams ? primary : main;
    let newName = name;
    if (name.length > 10) newName = shortenName(name);
    return (
      <Tooltip title={fullItemName}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderBottom: isInParams ? `2px solid ${primary}` : "",
          }}
        >
          <IconButton onClick={() => navigate(link)}>
            <Icon name={icon} sx={{ fontSize: "25px", color: color }} />
          </IconButton>
          <Typography sx={{ color: color }}>{newName}</Typography>
        </Box>
      </Tooltip>
    );
  }

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
      return (
        <NavigationBadge
          item={item}
          key={key}
          link={"/community/" + item._id}
        />
      );
    });
  }

  return (
    <Box
      sx={{
        position: "sticky",
      }}
    >
      <FlexBetween padding="0.3rem 6%" backgroundColor={alt}>
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
            expert
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
                  borderBottom: isHome ? `2px solid ${primary}` : "",
                }}
              >
                <IconButton onClick={() => navigate("/home")}>
                  <Home
                    sx={{ fontSize: "25px", color: isHome ? primary : main }}
                  />
                </IconButton>
                <Typography sx={{ color: isHome ? primary : main }}>
                  Home
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderBottom: isProfile ? `2px solid ${primary}` : "",
                }}
              >
                <IconButton onClick={() => navigate("/profile/" + user._id)}>
                  <PersonIcon
                    sx={{ fontSize: "25px", color: isProfile ? primary : main }}
                  />
                </IconButton>
                <Typography sx={{ color: isProfile ? primary : main }}>
                  Profile
                </Typography>
              </Box>

              {myCommunities && (
                <>
                  <Divider orientation="vertical" sx={{ height: "auto" }} />
                  {renderComminityTags()}
                  <Divider orientation="vertical" sx={{ height: "auto" }} />
                </>
              )}
              <Tooltip title={"Discover communities"}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderBottom: isCommunity ? `2px solid ${primary}` : "",
                  }}
                >
                  <IconButton onClick={() => navigate("/community")}>
                    <PublicIcon
                      sx={{
                        fontSize: "25px",
                        color: isCommunity ? primary : main,
                      }}
                    />
                  </IconButton>
                  <Typography sx={{ color: isCommunity ? primary : main }}>
                    Discover
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Searchbar />
              <Notifications />
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
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
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
      <Messenger />
    </Box>
  );
};

export default Navbar;
