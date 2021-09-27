import React from "react";
import Card from "./Card";
import Score from "./Score";
import Timer from "./Timer";
import "./App.css";

const NUM_OPTIONS = 6;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      answer: null,
      options: [],
      pokemonList: [],
      score: 0,
      timerReset: 0,
    };
  }
  capitalize = (word) => {
    if (word.length > 1) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.charAt(0).toUpperCase();
    }
  };
  getRandomOptions() {
    let answer = Math.floor(Math.random() * 151);
    let randomAnswers = [];
    for (let i = 0; i < NUM_OPTIONS - 1; i++) {
      let randomAnswer = null;
      do {
        randomAnswer = Math.floor(Math.random() * 151);
      } while (randomAnswer === answer);
      randomAnswers.push(randomAnswer);
    }
    let answerPosition = Math.floor(Math.random() * NUM_OPTIONS);
    randomAnswers.splice(answerPosition, 0, answer);
    this.setState({
      answer: answer,
      options: randomAnswers,
    });
  }
  handleClick(number) {
    this.reset();
    if (number === this.state.answer) {
      this.setState({ score: this.state.score + 1 });
    } else {
      this.setState({ score: 0 });
    }
    this.getRandomOptions();
    this.setState({ timerReset: this.state.timerReset + 1 });
  }
  reset() {
    this.setState({ options: [] });
  }
  timeOut() {
    this.setState({ score: 0 });
    this.reset();
    this.getRandomOptions();
  }
  componentDidMount() {
    this.getRandomOptions();

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            pokemonList: data.results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, answer, options, pokemonList, score, timerReset } =
      this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Name That Pokémon!</h1>
          <div className="wrapper">
            <Score score={score} />
            <Card className="card" url={pokemonList[answer].url} />
            <Timer timerReset={timerReset} timeOut={this.timeOut.bind(this)} />
            <div className="container">
              {options.map((option) => (
                <button
                  className="option"
                  key={option}
                  name={pokemonList[option].name}
                  onClick={() => this.handleClick(option)}
                >
                  {this.capitalize(pokemonList[option].name)}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
