import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import {useAuth} from './contexts/AuthContext.js'

const PublicRoutes = (props) => {
	const {loading, isAuth} = useAuth();
    
	return loading ? null : (isAuth ? <Navigate to="/" /> : <Outlet/>);
};

export default PublicRoutes;
