import * as React from "react";
import { Button } from "@material-ui/core";
import { RouterProps } from "react-router";

import "./styles.css";

const Landing = (props: RouterProps) => {
  return (
    <div className={"landing-container"}>
      <Button
        variant={"outlined"}
        color={"primary"}
        onClick={() => props.history.push("/order")}
      >
        Go to orders
      </Button>
    </div>
  );
};

export default Landing;
