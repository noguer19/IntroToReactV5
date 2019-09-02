import React from "react";
import pet from "@frontendmasters/pet"; //Pet and ANIMALS are returned from an api
import Carousel from "./Carousel";
import ErrorBoundary from './ErrorBoundary';

class Details extends React.Component {
  /*   constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  } */

  /*   This statement works the same purpose of the state declare in the constructor, but we need to configure babel-eslint for this to work
  First we need to install these packages
  npm install -D babel-eslint @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/preset-react
  then we need to create or modify .babelcr and include the following
  {
  "presets": ["@babel/preset-react", "@babel/preset-env"], //babel/preset-react will bring with it all things you need to transpile react and @babel/preset-env will transpile your code for the environment that you specify in the browserslist section of your package.json
    "plugins": ["@babel/plugin-proposal-class-properties"]
  }
  after that, we need to include the next in our .eslintcr file
    "parser": "babel-eslint" */
  state = { loading: true };

  //This method is like the useEffect method that we use with hooks. The difference is that componentDidMount runs once and only once.
  //When the component was rendered
  componentDidMount() {

    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading... </h1>;
    }

    const { animal, breed, location, description, name, media } = this.state; //I'm assingning what the state has to the variables inside the object in the const

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button> Adopt {name} </button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
/* 
const Details = props => {
     return (
          <pre>
               <code>{JSON.stringify(props, null, 4)}</code>
          </pre>
     );
}; */

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} /> {/* this will pass props to Details */}
    </ErrorBoundary>
  )
}
