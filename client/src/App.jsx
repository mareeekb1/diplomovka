import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import CommunityPage from "scenes/communityPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import PageNotFound from "scenes/notFoundPage";
import PeoplePage from "scenes/peoplePage";
import PostPage from "scenes/postPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.user));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={!isAuth ? <LoginPage /> : <Navigate to="/home" />}
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/community"
              element={isAuth ? <CommunityPage /> : <Navigate to="/" />}
            />
            <Route
              path="/community/:communityId"
              element={isAuth ? <CommunityPage /> : <Navigate to="/" />}
            />
            <Route
              path="/people/"
              element={isAuth ? <PeoplePage /> : <Navigate to="/" />}
            />
            <Route
              path="/post/:id"
              element={isAuth ? <PostPage /> : <Navigate to="/" />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
