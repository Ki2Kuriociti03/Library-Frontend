import './App.css';
import axios from "axios";
import React from "react";

class App extends React.Component {
  state = {details: [], }

  componentDidMount() {
    let data;
    axios.get("http://localhost:8000")
        .then(res => {
          data = res.data;
          this.setState({
            details: data
          });
        })
        .catch(err=> {
          console.log(err)
        })
  }

  render() {
    return(
        <div>
          <header>
            КНИГИ!
          </header>
          <hr></hr>
          {this.state.details.map((output, id) => (
              <div key={id}>
                <div>
                  <h2>{output.name}</h2>
                  <h2>{output.author}</h2>
                  <h2>{output.year}</h2>
                  <h2>{output.rating}</h2>
                  <h2>{output.isbn}</h2>
                  <h2>{output.quantity}</h2>
                  <h2>{output.tags}</h2>
                  <hr></hr>
                </div>
              </div>
          ))}
        </div>
    )
  }
}
export default App;
