import { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: { firstName: "Cengiz", lastName: "Vardar" },
      company: "CVS",
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hi {this.state.name.firstName} {this.state.name.lastName} I worked
            at {this.state.company}
          </p>
          <button
            onClick={() => {
              this.setState(
                () => {
                  return { name: { firstName: "Cengiz", lastName: "Erinc" } };
                }
              );
            }}
          >
            Change Name
          </button>
        </header>
      </div>
    );
  }
}

export default App;
