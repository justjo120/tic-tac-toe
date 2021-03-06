import React, { Component } from 'react';
import Square from './Square';
// import GameStatus from './GameStatus';
import '../styles/BoardGame.css';

export default class BoardGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPlayer: 'X',
          turnNumber: 0,
          squares: Array(9).fill({
            isWinningSquare: false,
            player: null
          }),
          winner: null
        };

      this.updateSquare = this.updateSquare.bind(this);
      this.calculateWinner = this.calculateWinner.bind(this);
      this.resetBoard = this.resetBoard.bind(this);

      this.resetBoard();
    }

    updateSquare(squarePosition){

      if(this.state.winner != null){
        return;
      }

      let updatedSquares = this.state.squares;

      updatedSquares[squarePosition] = {
          player: this.state.currentPlayer,
          isWinningSquare: false
      };

      let winner = this.calculateWinner(updatedSquares);

      this.setState({
        currentPlayer: this.state.currentPlayer == 'X' ? 'O' : 'X',
        turnNumber: this.state.turnNumber + 1,
        squares: winner.Squares,
        winner: winner.WinnerPlayer
      });
    }

    calculateWinner(squares){ 

      let squaresToCheck = 
      [ [0,1,2], //Horizontal
        [3,4,5],
        [6,7,8],
        
        [0,4,8], // Diagonal
        [2,4,6],
        
        [1,4,7], // Vertical
        [2,5,8],
        [0,3,6],
      ];

      for(let i = 0; i < squaresToCheck.length; i++){
        let check = squaresToCheck[i];
        let isXWinner = check.every(function(squareIndex){
          return squares[squareIndex].player === 'X';
        });

        if(isXWinner) {

          for(let o = 0; o < check.length; o++){
            let checkPos = check[o];
            squares[checkPos].isWinningSquare = true;
          }

          return {
            Squares: squares,
            WinnerPlayer: 'Winner is X!'
          };
        }

        let isOWinner = check.every(function(squareIndex){
          return squares[squareIndex].player === 'O';
        });

        if(isOWinner) {

          for(let o = 0; o < check.length; o++){
            let checkPos = check[o];
            squares[checkPos].isWinningSquare = true;
          }

          return {
            Squares: squares,
            WinnerPlayer: 'Winner is O!'
          };
        }
      }

      return {
        Squares: squares,
        WinnerPlayer: null
      };
    }

    makeSquare(squarePosition){
      let square = this.state.squares[squarePosition];
      return <Square isWinningSquare={square.isWinningSquare} positionId={squarePosition} onClick={this.updateSquare} player={square.player }/>
    }

    resetBoard(){
      this.setState({
        currentPlayer: 'X',
        turnNumber: 0,
        squares: Array(9).fill({
          isWinningSquare: false,
          player: null
        }),
        winner: null
      });
    }

    render(){
      return (
        <div>
          <div className="container board">
            <div className="row">
              {this.makeSquare(0)}
              {this.makeSquare(1)}
              {this.makeSquare(2)}
            </div>
            <div className="row">
              {this.makeSquare(3)}
              {this.makeSquare(4)}
              {this.makeSquare(5)}
            </div>
            <div className="row">
              {this.makeSquare(6)}
              {this.makeSquare(7)}
              {this.makeSquare(8)}
            </div>
          </div>
          <div>{this.state.winner}</div>
          <div>
            <button className="btn btn-light" onClick={this.resetBoard}>Reset</button>
          </div>
        </div>
      );
    }
}