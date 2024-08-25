import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Reserva } from "./components/Reserva";

export const Router = createBrowserRouter([
    {
        element: <Login />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/reserva",
                element: <Reserva />
            }
        ]
    }
]);