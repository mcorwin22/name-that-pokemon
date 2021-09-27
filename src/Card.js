import React from "react";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      image: '',
    };
  }
  capitalize = (word) => {
    if (word.length > 1) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    else {
      return word.charAt(0).toUpperCase();
    }
  }
  componentDidMount() {
    fetch(this.props.url)
    .then(response => response.json())
    .then(
      (data) => {
        this.setState({
          name: this.capitalize(data.name),
          isLoaded: true,
          image: data.sprites.other['official-artwork'].front_default,
          abilities: data.abilities,
          types: data.types
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    );
  }
  componentDidUpdate() {
    fetch(this.props.url)
    .then(response => response.json())
    .then(
      (data) => {
        this.setState({
          name: this.capitalize(data.name),
          isLoaded: true,
          image: data.sprites.other['official-artwork'].front_default,
          abilities: data.abilities,
          types: data.types
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    );
  }    
  render() {
    const { error, isLoaded, image } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (  
        <div>
            <img src={image} />
        </div>
      );
    }
  }
}