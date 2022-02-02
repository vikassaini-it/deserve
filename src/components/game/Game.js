import React from "react";
import Board from "../board/Board";
import Player from "../player/Player";
import Dice from "../dice/Dice";
import Snake from "../../assets/images/snake.gif";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  return (
    <div id='game' className='d-flex flex-row justify-content-start pt-3'>
      <div className='mx-5 d-flex flex-column justify-content-between align-items-center'>
        <h3>SNAKES AND LADERS</h3>
        <img src={Snake}></img>
        <button
          className='btn btn-primary mt-3'
          onClick={() => {
            navigate("home");
          }}
        >
          RESET
        </button>
      </div>
      <Board />
      <Player />
      {/* 
      <Score />
      */}
      <Dice />
    </div>
  );
};

export default Game;
