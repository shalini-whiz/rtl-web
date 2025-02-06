import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router";
import Login from "../components/user/Login";
import appStyles from "../styles/appStyles";
import { withStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import AuthService from '../service/AuthService';
import { ThemeProvider } from '@mui/material/styles';
import DashBoard from '../components/DashBoard/Dashboard';
import PrivateRoute from "./PrivateRoute"
import DHSPolicy from '../components/other/DHSPolicy';
function renderComponent(Component, defaultProps, customProps) {
    console.log("render component")
    let props = { ...defaultProps, ...customProps }
    console.log(appStyles)
    let StyledComponent = withStyles(appStyles)(Component);
    console.log(StyledComponent)
    return <StyledComponent {...props} />
}

const PrivateRoute1 = ({ element: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            element={AuthService.getUserInfo() != null ? <Component /> : <Navigate to="/login" />}
        />
    );
};

const AppRoutes = () => {
    const location = useLocation();
    console.log("hit app route . " + JSON.stringify(location))
    console.log(AuthService.getUserInfo())

    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        setUserInfo(AuthService.getUserInfo());
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/policy" element={<DHSPolicy />} />
            {/* <PrivateRoute path="/dashboard" element={<DashBoard />} /> */}
        </Routes>
    );
}






export default AppRoutes;