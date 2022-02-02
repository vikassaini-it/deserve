import React from "react";
import Board from "../board/Board";
import Player from "../player/Player";
import Dice from "../dice/Dice";

const Game = () => {
  return (
    <div id='game' className='d-flex flex-row justify-content-start pt-3'>
      <div className='mx-5'>SNAKES AND LADERS</div>
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
