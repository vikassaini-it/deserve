import { action } from "easy-peasy";

export default {
  //--------------------------------------------------------------------------------------------------
  //												STATE
  //--------------------------------------------------------------------------------------------------
  gridSize: 10,
  currentPosition: null,
  diceLucks: [],
  totalChances: 20,
  crookedDice: false,
  snake: {
    head: Math.floor(Math.random() * 50 + 49),
    tail: Math.floor(Math.random() * 48 + 2),
  },

  //--------------------------------------------------------------------------------------------------
  //												THUNKS
  //--------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------
  //												ACTIONS
  //--------------------------------------------------------------------------------------------------

  setGridSize: action((state, size) => {
    state.gridSize = size;
  }),

  setCurrentPosition: action((state, position) => {
    state.currentPosition = position;
  }),

  setTotalChances: action((state, totalChances) => {
    state.totalChances = totalChances;
  }),

  setDiceLucks: action((state, diceLucks) => {
    state.diceLucks = diceLucks;
  }),

  setCrookedDice: action((state, isCrooked) => {
    state.crookedDice = isCrooked;
  }),

  setSnake: action((state, snake) => {
    state.snake = snake;
  }),
};
