import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"; //Pet and ANIMALS are returned from an api
import useDropdown from "./useDropdown";
import Results from "./Results";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  //   const [animal, setAnimal] = useState("Dog");
  //   const [breed, setBreed] = useState("");
  const [breeds, setBreeeds] = useState([]);

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreeDropdown, setBreed] = useDropdown("Breed", "", breeds);

  const [pets, setPets] = useState([]);

  //Async functions always return a promise.
  //By using the keyword await i´m telling the function to wait until the api calls is completed and then give me the data back.
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  //   const location = "Seattle, WA";

  //This will run after the rendering of the component.
  //If we dont specify any dependency, it will be executed every time there´s a re-rendering
  //which can lead to an infinite change of updates.
  //To specify the list of dependencies whe include them in an array as a second parameter to the useEffect function
  //If we want to run thise useEffect just once (the first time the component is rendered) we must then pass an empty array in the dependencies section
  useEffect(() => {
    setBreeeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      //Whe use then because pet.breeds returns a promise, cause it´s coming from an api.
      //  const breedString = breeds.map((response) => response.name); //This is the same thing than the next instrunction but we´re using destructuring in the next one.
      const breedString = apiBreeds.map(({ name }) => name);
      setBreeeds(breedString);
    }, console.error);
  }, [animal, setBreed]); //By specifying animal and setBreed we are telling react to execute what´s inside useEffect only when animal or setBreed changes

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <h1>{location}</h1>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={event => setLocation(event.target.value)}
          />
        </label>

        <AnimalDropdown />
        <BreeDropdown />

        {/*  <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={event => setAnimal(event.target.value)}
            onBlur={event => setAnimal(event.target.value)}
          >
            <option>All</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            name="breed"
            id="breed"
            value={breed}
            onChange={setBreed}
            onBlur={setBreed}
            disabled={breeds.length === 0}
          >
            <option>All</option>
            {breeds.map(breedString => (
              <option key={breedString} value={breedString}>
                {breedString}
              </option>
            ))}
          </select>
        </label> */}

        <button type="submit">Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
