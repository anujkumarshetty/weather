import React, { Component } from "react";
import "./App.css";

import TextBox from "./components/textBox";


class App extends Component {
  render() {
    return (
      <div >
        <p>Weather Forcast</p>
        <TextBox />
        
      </div>
    );
  }
}

export default App;
