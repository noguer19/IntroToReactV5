import React from "react";

export default class Carousel extends React.Component {

  state = {
    photos: [],
    active: 0
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index // the + operator in this case converts the value to integer.
    });
  };

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }


  render() {
    const { photos, active } = this.state; //This line of code extracts photos and active from this.state so that we can use them without specifying this.state

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            //eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              alt="animal thumbnail"
              className={index === active ? "active" : ""}
            />
          ))}
        </div>
      </div>
    );
  }
}
