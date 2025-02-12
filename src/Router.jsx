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
import { UserProfile } from "./components/UserProfile";
import { UserEdit } from "./components/UserEdit";
import { ProtectedRoute } from "./security/ProtectedRouter";

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
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/reservas",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <Reserva />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: ":idReserva",
                        element: (
                            <ProtectedRoute>
                                <ReservaDetails />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "addReserva/:idCancha",
                        element: (
                            <ProtectedRoute>
                                <AddReserva />
                            </ProtectedRoute>
                        ),
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
                        element: (
                            <ProtectedRoute>
                                <CanchaDetails />
                            </ProtectedRoute>
                        ),
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
            {
                path: "/profile",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "edit",
                        element: (
                            <ProtectedRoute>
                                <UserEdit />
                            </ProtectedRoute>
                        ),
                    }
                ]
            }
        ]
    }
]);