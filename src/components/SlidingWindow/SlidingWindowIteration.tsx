import { Button } from '@mui/material';
import React from "react";
import DispatchContext from '../../contexts/DispatchContext';
import StateContext from '../../contexts/StateContext';

function SlidingWindowIteration() {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const selectedIterator = state.selectedIterator;

  const hasIIterator = state.settings?.primaryIterator;
  const hasJIterator = state.settings?.secondaryIterator;

  const onProceedIterator = () => {
    const rowIndex = 0;

    const newVal = state.indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      return {
        ...row,
        [selectedIterator]: row[selectedIterator] + 1
      }
    })
    console.log(newVal, 'newVal')

    dispatch({
      type: "update-indexes",
      val: newVal
    })
  }

  const updateSelectedIterator = (which: string) => {
    dispatch({
      type: "update-selected-iterator",
      val: which
    })
  }

  const onRegressIterator = () => {
    const rowIndex = 0;

    const newVal = state.indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      return {
        ...row,
        [selectedIterator]: row[selectedIterator] - 1
      }
    })

    console.log(newVal, 'newVal')

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
      <h4>Select side</h4>
      <Button variant="outlined" style={{background: selectedIterator === "i" ? "lightgreen" : "initial"}} onClick={() => updateSelectedIterator("i")}>left</Button>
      <Button variant="outlined" style={{background: selectedIterator === "j" ? "lightgreen" : "initial"}} onClick={() => updateSelectedIterator("j")}>right</Button>
      {
        (hasIIterator || hasJIterator) && (
          <>
            <br />
            <br />
            <Button variant="outlined" onClick={onRegressIterator}>{selectedIterator === "i" ? "left" : "right"} --</Button>
            <Button variant="outlined" onClick={onProceedIterator}>{selectedIterator === "i" ? "left" : "right"} ++</Button>
          </>
        )
      }
    </>
  )
}

export default SlidingWindowIteration;