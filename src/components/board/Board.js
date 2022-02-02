import React, { useEffect, useState, useLayoutEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./board.scss";
import Player from "../player/Player";
const Board = () => {
  const gridSize = useStoreState((state) => state.gridSize);
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
                className={`d-flex justify-content-end cell p-1 ${
                  (gridSize * index1 + index2 + 1) % 2 === 0 ? "even" : "odd"
                }`}
                id={`CELL_${gridSize * index1 + index2 + 1}`}
              >
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
    setPosition("CELL_1");
    setGridSize(10);
    setTimeout(() => {
      setPosition("CELL_10");
    }, 1000);
  }, []);

  return (
    <div id='board' className={" d-flex flex-column-reverse"}>
      {grid}
    </div>
  );
};

export default Board;
