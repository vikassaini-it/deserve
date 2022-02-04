import { render } from "@testing-library/react";
import baseStore from "../../redux/baseStore";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createStore, StoreProvider, useStoreActions } from "easy-peasy";
import Game from "../game/Game";
import { act } from "react-dom/test-utils";
import Dice from "./Dice";

class ResizeObserver {
  observe() {}
  unonserve() {}
}

window.ResizeObserver = ResizeObserver;
jest.useFakeTimers();

test("check snake collision", async () => {

    // init store
  const store = createStore(baseStore);

//   init application - just Dice as we are testing basic player functionality
  const app = (
    <StoreProvider store={store}>
      <HashRouter>
        <Routes>
          <Route path='*' element={<Dice />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
  render(app);

//   put player on snake's head to collide
  await act(async () =>
    store.getActions().setCurrentPosition(store.getState().snake.head)
  );

//   Validate if player is now on snake's tail after collision
  await act(async () => {
    setTimeout(() => {
      expect(store.getState().currentPosition).toEqual(
        store.getState().snake.tail
      );
    }, 1000);
  });

  await act(async () => jest.runAllTimers());
});
