import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import AdhanTime from "../pages/AdhanTime.jsx";
import Welcome from "../pages/Welcome.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import QuranPage from "../pages/QuranPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "prayer-times",
        element: <AdhanTime />,
      },
      {
        path: "quran",
        element: <QuranPage />,
      },
    ],
  },
]);

export default router;
