import React, { useState } from 'react';
import "./style.css";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const reducer = (state, action) => {
  if (state === undefined) {
    return {
      number: 1,
    }
  }
  const newState = {...state}
  if (action.type === "PLUS") {
    newState.number++;
  }
  return newState;
}

const store = createStore(reducer);

const TestStore = () => {
  return (
    <div id="container">
      <h1>Root:</h1>
      <div>
        <div id="grid">
          <Provider store={store}>
            <Left1></Left1>
            <Right1></Right1>
          </Provider>
        </div>
      </div>
    </div>
  )
}

const Left1 =(props) => {
  return (
    <div>
      <h3>Left1:</h3>
      <Left2></Left2>
    </div>
  );
}

const Left2 = (props) => {
  console.log("2");
  return (
    <div>
      <h3>Left2:</h3>
      <Left3></Left3>
    </div>
  );
}

const Left3 = (props) => {
  console.log("3");
  const number = useSelector(state=>state.number);

  return (
    <div>
      <h3>Left3: {number}</h3>
    </div>
  )
}

const Right1 =() => {
  return (
    <div>
      <h3>Right1: </h3>
      <Right2></Right2>
    </div>
  );
}

const Right2 =() => {
  return (
    <div>
      <h3>Right2: </h3>
      <Right3></Right3>
    </div>
  );
}

const Right3 =() => {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Right3: </h3>
      <input type='button' value="+" onClick={() => {
        dispatch({ type: "PLUS" })
      }}></input>
    </div>
  );
}

export default TestStore
