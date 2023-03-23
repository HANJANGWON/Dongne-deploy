import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import Layout from "./components/shared/Layout";
import EditProfile from "./pages/Profile/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp";
import routes from "./routes";
import { isLoggedInVar } from "./apollo";
import SearchPosts from "./pages/SearchPosts";

const Router = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.home}
          element={
            isLoggedIn ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Login />
            )
          }
        >
          {isLoggedIn === true && (
            <Route path={routes.upload} element={<Home />} />
          )}
        </Route>
        <Route path={routes.signUp} element={!isLoggedIn ? <SignUp /> : null} />
        <Route
          path={`users/:username`}
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        >
          {isLoggedIn === true && (
            <Route
              path={`/users/:username/post/:postId`}
              element={<Profile />}
            />
          )}
          {isLoggedIn === true && (
            <Route
              path={`/users/:username/posts/upload`}
              element={<Profile />}
            />
          )}
          <Route path="followers" element={<Profile />} />
          <Route path="following" element={<Profile />} />
        </Route>
        <Route path={`/users/:username/edit`} element={<EditProfile />}>
          <Route
            path={`/users/:username/edit/posts/upload`}
            element={<EditProfile />}
          />
        </Route>
        <Route
          path={`/search/:keyword/`}
          element={
            <Layout>
              <SearchPosts />
            </Layout>
          }
        >
          <Route
            path={`/search/:keyword/posts/upload`}
            element={<SearchPosts />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
