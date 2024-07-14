import {Route, Redireact} from "react-router-dom"
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import Redirect from "react-router-dom/es/Redirect";

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return <Route {...rest}>{!user ? <Redirect to="/login/"/> : children}</Route>
}