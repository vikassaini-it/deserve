import React, { useEffect, useState, useLayoutEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./board.scss";

import SnakeHead from "../../assets/images/snakeHead.png";
import SnakeTail from "../../assets/images/snakeTail.png";
import Crown from "../../assets/images/crown.png";

const Board = () => {
  const gridSize = useStoreState((state) => state.gridSize);
  const snake = useStoreState((state) => state.snake);
  const [grid, setGrid] = useState(<></>);

  useEffect(() => {
    let newGrid = [...new Array(gridSize)].map((ele, index1) => {
      console.log(index1, gridSize);
      return (
        <div
          className={`d-flex justify-content-center ${
            index1 % 2 === 1 ? "flex-row-reverse" : ""
          }`}
        >
          {[...new Array(gridSize)].map((ele, index2) => {
            console.log(index2);
            return (
              <div
                className={`d-flex justify-content-end cell position-relative p-1 ${
                  (gridSize * index1 + index2 + 1) % 2 === 0 ? "even" : "odd"
                }`}
                id={`CELL_${gridSize * index1 + index2 + 1}`}
              >
                {gridSize * index1 + index2 + 1 == gridSize * gridSize ? (
                  <div>
                    <img className='w-75 snake' src={Crown}></img>
                  </div>
                ) : null}

                {snake.head == gridSize * index1 + index2 + 1 ? (
                  <div>
                    <img className='w-75 snake' src={SnakeHead}></img>
                  </div>
                ) : null}

                {snake.tail == gridSize * index1 + index2 + 1 ? (
                  <div>
                    <img className='w-75 snake' src={SnakeTail}></img>
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

  return (
    <div
      id='board-container'
      className={" d-flex justify-content-center flex-grow-1"}
    >
      <div
        id='board'
        className='d-flex flex-column-reverse justify-content-center'
      >
        {grid}
      </div>
    </div>
  );
};

export default Board;
