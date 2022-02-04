import React, { useState, useEffect, useLayoutEffect } from "react";
import "./dice.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const Dice = ({ initCurrPos = 1 }) => {
  const [rolling, setRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState(1);
  const setPosition = useStoreActions((actions) => actions.setCurrentPosition);
  const setDiceLucks = useStoreActions((actions) => actions.setDiceLucks);
  const currentPosition = useStoreState((state) => state.currentPosition);
  const diceLucks = useStoreState((state) => state.diceLucks);
  const gridSize = useStoreState((state) => state.gridSize);
  const totalChances = useStoreState((state) => state.totalChances);
  const snake = useStoreState((state) => state.snake);
  const crooked = useStoreState((state) => state.crookedDice);
  const navigate = useNavigate();

  // Dice Map to show fontAwesome's dice images
  const diceMap = {
    1: faDiceOne,
    2: faDiceTwo,
    3: faDiceThree,
    4: faDiceFour,
    5: faDiceFive,
    6: faDiceSix,
  };

  // init initial posiiton for player, defaulted to 1
  useLayoutEffect(() => {
    setPosition(initCurrPos);
  }, []);

  // triggered on used click
  // disables the user click and execute animation, generate new dice and enable user click
  function shuffelDice() {
    setRolling(true);
    setTimeout(() => {
      let newDice = getNewDice();
      setCurrentDice(newDice);
      diceLucks.push(newDice);
      setDiceLucks(diceLucks);
      setPosition(
        currentPosition + newDice > gridSize * gridSize
          ? gridSize * gridSize
          : currentPosition + newDice
      );
      setRolling(false);
    }, 500);
  }

  // Snake's head collosion detection
  useEffect(() => {
    if (currentPosition === snake?.head) {
      setTimeout(() => {
        setPosition(snake.tail);
      }, 800);
    }
  }, [currentPosition]);

  // generate new dice based on crooked parameter
  function getNewDice() {
    if (crooked) {
      return (Math.floor(Math.random() * 3) + 1) * 2;
    }
    return Math.floor(Math.random() * 6) + 1;
  }

  // Check the win or lose condition based on player position and dice collection
  useEffect(() => {
    if (
      diceLucks.length === totalChances ||
      currentPosition === gridSize * gridSize
    ) {
      setTimeout(() => {
        navigate("/decision");
      }, 800);
    }
  }, [diceLucks, currentPosition]);

  // generate css for dice history
  function getRecentDices(recentDices) {
    return diceLucks
      .map((ele, idx) => {
        return (
          <div className='d-flex justify-content-between align-items-center flex-row p-2'>
            <FontAwesomeIcon icon={diceMap[ele]} size='2x' />
          </div>
        );
      })
      .reverse();
  }

  return (
    <div
      id='dice-container'
      className='p-3 d-flex justify-content-start flex-column align-items-center flex-grow-1'
    >
      <div
        id='dice'
        onClick={() => {
          if (!rolling && diceLucks.length < totalChances) shuffelDice();
        }}
        className={`${rolling ? "dice-wobble" : ""}`}
      >
        <FontAwesomeIcon icon={diceMap[currentDice]} size='5x' />
      </div>
      <h3 className='pt-2'>Click dice to roll</h3>
      {crooked ? <span>Dice is crooked</span> : null}

      <h4 className='pt-2'>
        Rolls remainins: {totalChances - diceLucks.length}
      </h4>
      {diceLucks?.length > 0 ? (
        <div className='pt-3 d-flex flex-column justify-content-center align-items-center w-75'>
          <h4>
            <u>Recent Rolls</u>
          </h4>
          <div
            className='d-flex flex-row flex-wrap justify-content-center'
            style={{ maxWidth: "200px" }}
          >
            {getRecentDices(diceLucks)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dice;
