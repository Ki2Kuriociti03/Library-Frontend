import React from "react";
import jwtDecode from "jwt-decode";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";


function Navbar() {

    const {user, logoutUser} = useContext(AuthContext)
    const token = localStorage.getItem("authTokens")
    if (token) {
        const decoded = jwtDecode(token)
        let user_id = decoded.user_id
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img style={{width:"120px", padding:"6px"}} src="https://i.imgur.com/juL1aAc.png" alt=""/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Каталог</Link>
                            </li>
                            {token === null &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Вход</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Регистрация</Link>
                                    </li>
                                </>
                            }

                            {token !== null &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">Профиль</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={logoutUser} style={{cursor: "pointer"}}>Выход</a>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar