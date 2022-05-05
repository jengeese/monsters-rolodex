import { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [
        { name: "Linda", id:"12a34" },
        { name: "Frank", id:"12a24" },
        { name: "Jacky", id:"13a34" },
        { name: "Andrei", id:"12b34" },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.monsters.map((monster) => {
          return <div key={monster.id}><h1>{monster.name}</h1></div>;
        })}
      </div>
    );
  }
}

export default App;
