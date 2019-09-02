import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import style from "./style.css";
import { Router, Link } from "@reach/router";
import Details from "./Details";

const App = () => {
  /* return React.createElement("div", {}, [
          React.createElement("h1", { key: 0 }, "Adopt Me!"),
          React.createElement(Pet, {
               name: "Bella",
               animal: "Dog",
               breed: "Indian",
               key: 1
          }),
          React.createElement(Pet, {
               name: "Lorenzo",
               animal: "Bird",
               breed: "None",
               key: 2
          })

     ]); */

  return (
    /* by using parenthesis i´m telling react that i´m going to write multiple rows of jsx code here */
    <div>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>

      {/*       <Pet name="Bella" animal="Dog" breed="Indian" />
      <Pet name="Lorenzo" animal="Bird" breed="Unknow" />
      <Pet name="Blacky" animal="Dog" breed="Indian" /> */}

      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  );
};

// render(React.createElement(App), document.getElementById("root"));

render(<App />, document.getElementById("root"));
