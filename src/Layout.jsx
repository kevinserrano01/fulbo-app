import { Outlet } from "react-router-dom"
import { NavBar } from "./components/layout/NavBar"
import './styles/app.css'
import './styles/mainContent.css'
import { AuthProvider } from "./contexts/AuthContext"
import { ToastContainer } from "react-toastify"

export const Layout = () => {
  return (
    <AuthProvider>
      <div>
        <div className="row gx-0">
          <div className="col-12">
            <NavBar />
          </div>
        </div>

        <div className="row gx-0">
            <Outlet />
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
        </div>
      </div>
    </AuthProvider>
    
  )
}
