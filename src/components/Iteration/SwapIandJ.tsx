import { Button } from "@mui/material";
import React from "react";
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";

function SwapIandJ() {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const modifiedInput = state.modifiedInput;
  const iIndex = state.indexes?.[0]?.i;
  const jIndex = state.indexes?.[0]?.j;

  const triggerSwap = () => {
    const data = JSON.parse(modifiedInput);
    const temp = data[iIndex];
    data[iIndex] = data[jIndex];
    data[jIndex] = temp;
    dispatch({
      type: "update-modified-input",
      val: JSON.stringify(data)
    })
  }

  if (state.iteratorMode !== "iterate" || !state.settings?.swapIandJ) {
    return null;
  }

  return (
    <button onClick={triggerSwap}>Swap i and j</button>
  )
}

export default SwapIandJ;
