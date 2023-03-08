// --------------
// Router configs
// --------------

// react
import { createBrowserRouter } from "react-router-dom";
// components
import App from "./App";
import HomePage from "./components/pages/Home-page";
import AuthPage from "./components/pages/Auth-page";
import TvPage from "./components/pages/Tv-page";
import MoviePage from "./components/pages/Movie-page";
import BookmarksPage from "./components/pages/Bookmarks-page";
import AccountPage from "./components/pages/Account-page";
import ShowPage from "./components/pages/Show-page";

export const router = createBrowserRouter([
  {
    path: "/night-owl",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <MoviePage />,
      },
      {
        path: "tv",
        element: <TvPage />,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "show/:id",
        element: <ShowPage />,
      },
      {
        path: "auth",
        children: [
          {
            path: "sign-up",
            element: <AuthPage />,
          },
          {
            path: "log-in",
            element: <AuthPage />,
          },
          {
            path: "account",
            element: <AccountPage />,
          },
        ],
      },
    ],
  },
]);
