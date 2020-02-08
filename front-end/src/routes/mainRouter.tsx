import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OrderConnector from "../containers/Order/OrderConnector";
import Landing from "../containers/Landing/Landing";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/orders" component={OrderConnector} />
        <Route path="/" exact component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};
