import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import { StoreProvider, createStore } from "easy-peasy";
import baseStore from "./redux/baseStore";
import Home from "./components/home/Home";
import Game from "./components/game/Game";
import Decision from "./components/decision/Decision";

const store = createStore(baseStore);

const AppRoutes = () => {
  return (
    <StoreProvider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/game' exact element={<Game />} />
          <Route path='/decision' exact element={<Decision />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};
export default AppRoutes;
