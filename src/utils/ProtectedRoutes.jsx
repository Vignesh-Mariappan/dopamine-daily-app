import { Outlet, Navigate } from "react-router-dom"
import Layout from "../components/Layout";

const ProtectedRoutes = () => {
  let isUserAuthenticated = {
    token: true
  }

  // redirect to login page if the user is not authenticated
  return !isUserAuthenticated.token ? <Navigate to="/login" /> : <Layout />
}

export default ProtectedRoutes;