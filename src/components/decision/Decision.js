import React, { useEffect } from "react";
import { useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";

import Celebration from "../../assets/images/celebration.gif";
import Sad from "../../assets/images/sad.gif";

const Decision = () => {
  const currentPosition = useStoreState((state) => state.currentPosition);
  const diceLucks = useStoreState((state) => state.diceLucks);
  const gridSize = useStoreState((state) => state.gridSize);
  const totalChances = useStoreState((state) => state.totalChances);
  const navigate = useNavigate();

  // Check if there is any condition available to show decision else redirect to home
  useEffect(() => {
    if (
      currentPosition < gridSize * gridSize &&
      diceLucks.length < totalChances
    ) {
      navigate("home");
    }
  }, []);

  return (
    <div
      id='decision'
      className='d-flex flex-column justify-content-center align-items-center pt-3'
    >
      {currentPosition === gridSize * gridSize ? (
        <div>
          <h3 className='text-center'>You won</h3>
          <img src={Celebration}></img>
        </div>
      ) : (
        <div>
          <h3 className='text-center'>You lost</h3>
          <img src={Sad}></img>
        </div>
      )}
      <h3 className='pt-3'>Total Roll: {diceLucks.length}</h3>

      <button
        className='btn btn-primary pt-2'
        onClick={() => {
          navigate("home");
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default Decision;
