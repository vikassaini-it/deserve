import React, { useState, useEffect } from "react";
import "./dice.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import { useStoreState, useStoreActions } from "easy-peasy";

const Dice = ({ crooked = true }) => {
  const [rolling, setRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState(1);
  const setPosition = useStoreActions((actions) => actions.setCurrentPosition);
  const setDiceLucks = useStoreActions((actions) => actions.setDiceLucks);
  const currentPosition = useStoreState((state) => state.currentPosition);
  const diceLucks = useStoreState((state) => state.diceLucks);
  const snake = useStoreState((state) => state.snake);

  const diceMap = {
    1: faDiceOne,
    2: faDiceTwo,
    3: faDiceThree,
    4: faDiceFour,
    5: faDiceFive,
    6: faDiceSix,
  };

  function shuffelDice() {
    setRolling(true);
    setTimeout(() => {
      let newDice = getNewDice();
      setCurrentDice(newDice);
      diceLucks.push(newDice);
      setDiceLucks(diceLucks);
      setPosition(
        currentPosition + newDice > 100 ? 100 : currentPosition + newDice
      );
      setRolling(false);
    }, 500);
  }

  useEffect(() => {
    if (currentPosition === snake?.head) {
      setTimeout(() => {
        setPosition(snake.tail);
      }, 500);
    }
  }, [currentPosition]);

  useEffect(() => {
      if(diceLuck.length===10){

      }
     
  }, [input])

  function getNewDice() {
    if (crooked) {
      return (Math.floor(Math.random() * 3) + 1) * 2;
    }
    return Math.floor(Math.random() * 6) + 1;
  }

  function getRecentDices(recentDices) {
    return diceLucks
      .map((ele, idx) => {
        return (
          <div className='d-flex justify-content-between align-items-center'>
            Roll {idx + 1} &nbsp;&nbsp;&nbsp;&nbsp;
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
          if (!rolling) shuffelDice();
        }}
        className={`${rolling ? "dice-wobble" : ""}`}
      >
        <FontAwesomeIcon icon={diceMap[currentDice]} size='5x' />
      </div>
      <h3 className='pt-2'>Click dice to roll</h3>
      <h4 className='pt-2'>Rolls remainins: {10 - diceLucks.length}</h4>
      <div className='pt-3 d-flex flex-column justify-content-center align-items-center'>
        <h4>
          <u>Recent Rolls</u>
        </h4>
        <div className='d-flex flex-column'>{getRecentDices(diceLucks)}</div>
      </div>
    </div>
  );
};

export default Dice;
