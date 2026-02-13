import { createBrowserRouter, } from "react-router-dom";
import App from "../App.jsx";
import AdhanTime from "../components/AdhanTime.jsx";
import Welcome from "../components/Welcome.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Welcome />,
            },
            {
                path: "/prayer-times",
                element: <AdhanTime />,
            },
        ]
    },

]);

export default router;