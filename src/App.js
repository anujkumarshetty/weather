import React, { Component } from "react";
import "./App.css";
import TextBox from "./components/textBox";

class App extends Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center",marginBottom: '50px' }}>Weather Forcast</h2>
        <TextBox />
        
      </div>
    );
  }
}

export default App;
