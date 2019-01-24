import React from "react";
import { connect } from "react-redux";

interface Props {
    counter: number;
    incrementHandler: Function;
}
const Component: React.SFC<Props> = ({counter, incrementHandler})=> (
    <div>
      <h2>Up {counter}</h2>
      <button onClick={() => incrementHandler()}>up</button>
    </div>
);

const mapState = state => {
  return { counter: state };
};
const mapProps = dispatch => {
  return {
    incrementHandler: () => {
      return dispatch({ type: "INCREMENT" });
    }
  };
};

export const Counter = connect(
  mapState,
  mapProps
)(Component);
