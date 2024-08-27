import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Reserva } from "./components/Reserva";
import { Layout } from "./Layout";
import { Register } from "./components/Register";
import { Canchas } from "./components/Canchas";
import { CanchaDetails } from "./components/CanchaDetails";
import { NotFound } from "./components/NotFound";
import { ReservaDetails } from "./components/ReservaDetails";
import { AddReserva } from "./components/AddReserva";

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
                children: [
                    {
                        index: true,
                        element: <Reserva />
                    },
                    {
                        path: ":idReserva",
                        element: <ReservaDetails />
                    },
                    {
                        path: "addReserva",
                        element: <AddReserva />
                    }
                ],
            },
            {
                path: "/canchas",
                children: [
                    {
                        index: true,
                        element: <Canchas />
                    },
                    {
                        path: ":idCancha",
                        element: <CanchaDetails />
                    }
                ],
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
]);