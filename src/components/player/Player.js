import React, { useState, useEffect, useLayoutEffect } from "react";
import { useStoreState } from "easy-peasy";
import "./player.scss";

const Player = ({ id }) => {
  const [currentPositionTop, setCurrentPositionTop] = useState(0);
  const [currentPositionLeft, setCurrentPositionLeft] = useState(0);
  const [height, setHeight] = useState(50);
  const [width, setWidth] = useState(50);
  const currentPosition = useStoreState((state) => state.currentPosition);

  const resizeObserver = new ResizeObserver((entries) => {
    calculatePosition();
  });

  useEffect(() => {
    resizeObserver.observe(document.getElementById("board"));
    return () => {
      // resizeObserver.
    };
  }, [currentPosition]);

  useLayoutEffect(() => {
    if (currentPosition) calculatePosition();
  }, [currentPosition]);

  function calculatePosition() {
    if (currentPosition != null) {
      setCurrentPositionTop(
        document.getElementById(`CELL_${currentPosition}`)?.getBoundingClientRect().top
      );
      setCurrentPositionLeft(
        document.getElementById(`CELL_${currentPosition}`)?.getBoundingClientRect().left
      );
      setWidth(
        document.getElementById(`CELL_${currentPosition}`)?.getBoundingClientRect().width
      );
      setHeight(
        document.getElementById(`CELL_${currentPosition}`)?.getBoundingClientRect().height
      );
    }
  }

  return (
    <div
      id={id}
      className='position-absolute d-flex justify-content-center align-items-center player'
      style={{
        top: currentPositionTop + "px",
        left: currentPositionLeft + "px",
        width: width + "px",
        height: height + "px",
      }}
    >
      <div></div>
    </div>
  );
};

export default Player;
