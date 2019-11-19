import React from "react";
import ReactDOM from "react-dom";

// normal function
function App() {
  return <div> Helwwwxxxwlo React, Webpack 4 & Babel 7!</div>
}

ReactDOM.render(<App />, document.querySelector("#react"));

ReactDOM.render(
  <h1>Hello React!</h1>,
  document.getElementById('id01'));

// the {} is a JSX Expression
const name = "Wesley";
ReactDOM.render(
  <h1> What's good {name} ahhh eeee ahhh eeee </h1>,
  document.getElementById('id02'));

// constantly changing react variable
  function tick() {
    const element = (<h1>{new Date().toLocaleTimeString()}</h1>);
    ReactDOM.render(element, document.getElementById('time'));
  }

  setInterval(tick, 1000);

// when you set an argument to be used or outputted, etc
  function Welcome(props) {
  return <h1>Hello {props.yes}!</h1>;
}
                         // the argument
ReactDOM.render(<Welcome yes="John Doe"/>, document.getElementById('name'));

/*
class Car {
  constructor(name) {
    this.brand = name;
  }
}

mycar = new Car("Ford");
document.write(mycar.brand);
*/

// arrow function
const Yes = () => {
  return <div> Hello React, Webpack 4 & Babel 7!</div>
}
ReactDOM.render(<Yes />, document.getElementById("func"));

// shorter arrow function --> ones that return default value
const Hello = () => <h1> Hello World! </h1> ;
ReactDOM.render(<Hello />, document.getElementById("hellu"));

const Yeeee = (val) => "Hello " + val.ok;
ReactDOM.render(<Yeeee ok="yeee" />, document.getElementById("ola"));
