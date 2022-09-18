import { Button } from '@mui/material';
import React from "react";
import DispatchContext from '../contexts/DispatchContext';
import StateContext from '../contexts/StateContext';

function IteratorSelection() {

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

  if (state.iteratorMode !== "iterate") {
    return null;
  }

  return (
    <>
      {
        (hasJIterator) && (
          <h4>Select iterator</h4>
        )
      }
      {
        hasJIterator && (
          <Button variant="outlined" style={{background: selectedIterator === "i" ? "lightgreen" : "initial"}} onClick={() => updateSelectedIterator("i")}>i</Button>
        )
      }
      {
        hasJIterator && (
          <>
            &nbsp;
            <Button variant="outlined" style={{background: selectedIterator === "j" ? "lightblue" : "initial"}} onClick={() => updateSelectedIterator("j")}>j</Button>
          </>
        )
      }
      {
        (hasIIterator || hasJIterator) && (
          <>
            <br />
            <br />
            <Button variant="outlined" onClick={onProceedIterator}>{selectedIterator} ++</Button>
            <Button variant="outlined" onClick={onRegressIterator}>{selectedIterator} --</Button>
          </>
        )
      }
    </>
  )
}

export default IteratorSelection;