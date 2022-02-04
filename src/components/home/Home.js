import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

import Snake from "../../assets/images/snake.gif";

const Home = () => {
  const setPosition = useStoreActions((actions) => actions.setCurrentPosition);
  const setDiceLucks = useStoreActions((actions) => actions.setDiceLucks);
  const setGridSize = useStoreActions((actions) => actions.setGridSize);
  const setSnake = useStoreActions((actions) => actions.setSnake);
  const setTotalChances = useStoreActions((actions) => actions.setTotalChances);
  const setCrookedDice = useStoreActions((actions) => actions.setCrookedDice);
  const gridSize = useStoreState((state) => state.gridSize);
  const totalChances = useStoreState((state) => state.totalChances);
  const crookedDice = useStoreState((state) => state.crookedDice);

  const navigate = useNavigate();
  // reset position and dice history
  useEffect(() => {
    setPosition(null);
    setDiceLucks([]);
    setSnake({
      head: Math.floor(
        Math.random() * ((gridSize * gridSize) / 2) +
          ((gridSize * gridSize) / 2 + 1)
      ),
      tail: Math.floor(Math.random() * ((gridSize * gridSize) / 2 - 1) + 1),
    });
  }, []);

  return (
    <div
      id='home'
      className='d-flex flex-column justify-content-center align-items-center p-3'
    >
      <h1>SNAKES & LADDERS</h1>
      <img src={Snake}></img>
      <h2 className='mt-3'>Lets play</h2>

      <div className='w-25 pt-3'>
        <label for='customRange1' class='form-label'>
          Board Size {gridSize}
        </label>
        <input
          type='range'
          min='6'
          max='10'
          className='form-range'
          id='customRange1'
          value={gridSize}
          onChange={(e) => {
            let newGridSize = Number(e.target.value);
            // set grid size
            setGridSize(newGridSize);
            // set total chances - hardness increases with increase in board size
            setTotalChances(newGridSize * 2);
            // snake generation logic
            setSnake({
              head: Math.floor(
                Math.random() * ((newGridSize * newGridSize) / 2) +
                  ((newGridSize * newGridSize) / 2 + 1)
              ),
              tail: Math.floor(
                Math.random() * ((newGridSize * newGridSize) / 2 - 1) + 1
              ),
            });
          }}
        />
        <label for='customRange1' class='form-label'>
          Total Chances {totalChances}
        </label>
      </div>

      <div className='form-check form-switch'>
        <input
          class='form-check-input'
          type='checkbox'
          id='flexSwitchCheckDefault'
          onChange={(e) => setCrookedDice(e.target.checked)}
        />
        <label class='form-check-label' for='flexSwitchCheckDefault'>
          Crooked Dice (only even dice roll result)
        </label>
      </div>

      <button
        className='btn btn-primary mt-3'
        onClick={() => {
          navigate("game");
        }}
      >
        START
      </button>
    </div>
  );
};

export default Home;
