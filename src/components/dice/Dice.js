import React, { useState } from "react";
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

const Dice = () => {
  const [rolling, setRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState(1);

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
      const newDice = Math.floor(Math.random() * 6) + 1;
      setCurrentDice(newDice);
      setRolling(false);
    }, 500);
  }

  return (
    <div id='dice-container' className='p-3'>
      <div
        id='dice'
        onClick={() => {
          if (!rolling) shuffelDice();
        }}
        className={`${rolling ? "dice-wobble" : ""}`}
      >
        <FontAwesomeIcon icon={diceMap[currentDice]} size='5x' />
      </div>
    </div>
  );
};

export default Dice;
