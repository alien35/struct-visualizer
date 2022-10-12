import { Button } from "@mui/material";
import React from "react";
import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

function Sorter() {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const modifiedInput = state.modifiedInput;

  const triggerSort = () => {
    let data = JSON.parse(modifiedInput);
    data = data.sort((a: any, b: any) => a - b);
    dispatch({
      type: "update-modified-input",
      val: JSON.stringify(data)
    })
  }

  if (!state.settings?.sort) {
    return null;
  }

  return (
    <button onClick={triggerSort}>Sort</button>
  )
}

export default Sorter;
