import React from "react";
import { Link } from "@reach/router";

function Pet({ name, animal, breed, media, location, id }) {
  /*     return React.createElement("div", {}, [
          React.createElement("h1", { key: name }, name),
          React.createElement("h2", { key: animal }, animal),
          React.createElement("h2", { key: breed }, breed)
     ]); */
  /* 
  return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <h2>{breed}</h2>
    </div>
  ); */

  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>

      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}

export default Pet;
