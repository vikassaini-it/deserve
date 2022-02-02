import React, { useEffect, useState, useLayoutEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./board.scss";

import snakeHead from "../../assets/images/snakeHead.png";
import snakeTail from "../../assets/images/snakeTail.png";

const Board = () => {
  const gridSize = useStoreState((state) => state.gridSize);
  const snake = useStoreState((state) => state.snake);
  const setGridSize = useStoreActions((actions) => actions.setGridSize);
  const setPosition = useStoreActions((actions) => actions.setCurrentPosition);
  const [grid, setGrid] = useState(<></>);

  useEffect(() => {
    let newGrid = [...new Array(gridSize)].map((ele, index1) => {
      return (
        <div
          className={`d-flex justify-content-center ${
            index1 % 2 === 1 ? "flex-row-reverse" : ""
          }`}
        >
          {[...new Array(gridSize)].map((ele, index2) => {
            return (
              <div
                className={`d-flex justify-content-end cell position-relative p-1 ${
                  (gridSize * index1 + index2 + 1) % 2 === 0 ? "even" : "odd"
                }`}
                id={`CELL_${gridSize * index1 + index2 + 1}`}
              >
                {snake.head == gridSize * index1 + index2 + 1 ? (
                  <div>
                    <img className='w-75 snake' src={snakeHead}></img>
                  </div>
                ) : null}
                {snake.tail == gridSize * index1 + index2 + 1 ? (
                  <div>
                    <img className='w-75 snake' src={snakeTail}></img>
                  </div>
                ) : null}
                <span>{gridSize * index1 + index2 + 1}</span>
              </div>
            );
          })}
        </div>
      );
    });
    setGrid(newGrid);
  }, [gridSize]);

  useLayoutEffect(() => {
    setPosition(1);
  }, []);

  return (
    <div id='board' className={" d-flex flex-column-reverse"}>
      {grid}
    </div>
  );
};

export default Board;
