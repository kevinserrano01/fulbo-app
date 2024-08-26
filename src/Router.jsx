import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Reserva } from "./components/Reserva";
import { Layout } from "./Layout";
import { Register } from "./components/Register";

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/reserva",
                element: <Reserva />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]);