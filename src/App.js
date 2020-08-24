import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      winnerGame: "",
      game: true,
    };
  }

  newGame = () => {
    this.reset();
  };

  reset = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ winnerGame: "" });
    this.setState({ count: 0 });
    this.setState({ game: true });
  };

  draw = () => {
    if (this.state.count === 8) {
      this.setState({ winnerGame: `Draw!` });
      setTimeout(this.reset, 2000);
    }
  };

  check = (arg) => {
    let square = this.state.squares;
    let line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < line.length; i++) {
      let winnerLine = line[i];
      if (
        square[winnerLine[0]] === arg &&
        square[winnerLine[1]] === arg &&
        square[winnerLine[2]] === arg
      ) {
        this.setState({ winnerGame: `Winner: ${arg}` });
        this.setState({ game: false });
        setTimeout(this.reset, 2000);
      }
    }
  };

  clickHandler = (e) => {
    let data = e.target.dataset.id;
    let square = this.state.squares;
    let count = this.state.count;
    let game = this.state.game;
    console.log(count);

    if (square[data] === null && game === true) {
      square[data] = count % 2 === 0 ? "X" : "O";
      this.setState({ squares: square });
      this.setState({ count: count + 1 });
    } else {
      return false;
    }
    this.check(square[data]);
    this.draw();
  };

  render() {
    return (
      <div className="App">
        <div className="tic-tac-toe">
          {this.state.squares.map((elem, index) => {
            return (
              <div
                className="square"
                key={index}
                data-id={index}
                onClick={this.clickHandler}
              >
                {elem}
              </div>
            );
          })}
        </div>
        <button onClick={this.newGame} className="new-game">
          New Game
        </button>
        <p className="text-winner">{this.state.winnerGame}</p>
      </div>
    );
  }
}
export default App;
