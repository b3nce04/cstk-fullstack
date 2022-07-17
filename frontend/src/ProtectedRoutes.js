import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import {useAuth} from './contexts/AuthContext.js'

const ProtectedRoutes = (props) => {
	const {loading, isAuth} = useAuth();
    
	return loading ? null : (isAuth ? <Outlet /> : <Navigate to="/login" />);
};

export default ProtectedRoutes;
