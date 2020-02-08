import React from "react";
import { Provider } from "react-redux";

import store from "./shared/store/store";
import { MainRouter } from "./routes/mainRouter";

const App = () => {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};

export default App;
