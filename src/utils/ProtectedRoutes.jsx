import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
  let isUserAuthenticated = {
    token: false
  }

  // redirect to login page if the user is not authenticated
  return !isUserAuthenticated.token ? <Navigate to="/login" /> : <Outlet />
}

export default ProtectedRoutes;