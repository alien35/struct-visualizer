import { Button } from '@mui/material';
import React from "react";
import DispatchContext from '../contexts/DispatchContext';
import StateContext from '../contexts/StateContext';
import SlidingWindowIteration from './SlidingWindow/SlidingWindowIteration';

function SlidingWindowOptions() {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const moveWindowLeft = () => {
    const rowIndex = 0;

    const newVal = state.indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      return {
        i: state.indexes[rowIndex].i - 1,
        j: state.indexes[rowIndex].j - 1
      }
    })

    dispatch({
      type: "update-indexes",
      val: newVal
    })
  }

  const moveWindowRight = () => {
    const rowIndex = 0;

    const newVal = state.indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      return {
        i: state.indexes[rowIndex].i + 1,
        j: state.indexes[rowIndex].j + 1
      }
    })

    dispatch({
      type: "update-indexes",
      val: newVal
    })
  }

  if (state.iteratorMode !== "sliding-window") {
    return null;
  }

  return (
    <>
      <h4>Sliding Window</h4>
      <Button variant="outlined" onClick={moveWindowLeft}>Move window to the left</Button>
      <Button variant="outlined" onClick={moveWindowRight}>Move window to the right</Button>
      <SlidingWindowIteration />
    </>
  )
}

export default SlidingWindowOptions;