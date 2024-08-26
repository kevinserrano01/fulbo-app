import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Reserva } from "./components/Reserva";
import { Layout } from "./Layout";
import { Register } from "./components/Register";
import { Canchas } from "./components/Canchas";

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
                path: "/reservas",
                element: <Reserva />
            },
            {
                path: "/canchas",
                element: <Canchas />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]);