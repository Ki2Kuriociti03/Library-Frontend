import React, {useEffect, useState} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";

import Homepage from "./views/Homepage";
import Registerpage from "./views/Registerpage";
import Loginpage from "./views/Loginpage";
import Dashboard from "./views/Dashboard";
import Navbar from "./views/Navbar";
import Bookpage from "./views/Bookpage";

function App() {

    return (
        <Router>
            <AuthProvider>
                <Navbar/>
                <Switch>
                    <PrivateRoute component={Dashboard} path="/dashboard" exact />
                    <Route component={Loginpage} path="/login" />
                    <Route component={Registerpage} path="/register"/>
                    <Route component={Homepage} path="/" exact />
                    <Route component={Bookpage} path="/bookpage/:id"/>
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App
