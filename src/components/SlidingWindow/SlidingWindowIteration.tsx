import { Button } from '@mui/material';
import React from "react";
import DispatchContext from '../../contexts/DispatchContext';
import StateContext from '../../contexts/StateContext';

function SlidingWindowIteration({ iteratorMode }: any) {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const [selectedIterator, setSelectedIterator] = React.useState("i");
  // const selectedIterator = state.selectedIterator;

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

    dispatch({
      type: "update-indexes",
      val: newVal
    })
  }

  if (iteratorMode !== "sliding-window") {
    return null;
  }

  return (
    <>
      <h4>Select side</h4>
      <button style={{color: "black", background: selectedIterator === "i" ? "#f2f200" : "initial"}} onClick={() => setSelectedIterator("i")}>left</button>
      <button style={{color: "black", background: selectedIterator === "j" ? "#ff8080" : "initial"}} onClick={() => setSelectedIterator("j")}>right</button>
      {
        (hasIIterator || hasJIterator) && (
          <>
            <br />
            <br />
            <button onClick={onRegressIterator}>{selectedIterator === "i" ? "left" : "right"} --</button>
            <button onClick={onProceedIterator}>{selectedIterator === "i" ? "left" : "right"} ++</button>
          </>
        )
      }
    </>
  )
}

export default SlidingWindowIteration;