import React from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";

import Homepage from "./views/Homepage";
import Registerpage from "./views/Registerpage";
import Loginpage from "./views/Loginpage";
import Dashboard from "./views/Dashboard";
import Navbar from "./views/Navbar";

// class App extends React.Component {
//   state = {details: [], }
//
//   componentDidMount() {
//     let data;
//     axios.get("http://localhost:8000")
//         .then(res => {
//           data = res.data;
//           this.setState({
//             details: data
//           });
//         })
//         .catch(err=> {
//           console.log(err)
//         })
//   }
//
//   render() {
//     return(
//         <div>
//           <header>
//             КНИГИ!
//           </header>
//           <hr></hr>
//           {this.state.details.map((output, id) => (
//               <div key={id}>
//                 <div>
//                   <h2>{output.name}</h2>
//                   <h2>{output.author}</h2>
//                   <h2>{output.year}</h2>
//                   <h2>{output.rating}</h2>
//                   <h2>{output.isbn}</h2>
//                   <h2>{output.quantity}</h2>
//                   <h2>{output.tags}</h2>
//                   <hr></hr>
//                 </div>
//               </div>
//           ))}
//         </div>
//     )
//   }
// }


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
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App
