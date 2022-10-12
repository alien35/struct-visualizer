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

  return (
    <>
      {
        (hasJIterator) && (
          <h4>Select iterator</h4>
        )
      }
      {
        hasJIterator && (
          <button style={{fontWeight: 600, background: selectedIterator === "i" ? "#f2f200" : "initial", color: "black"}} onClick={() => updateSelectedIterator("i")}>i</button>
        )
      }
      {
        hasJIterator && (
          <>
            &nbsp;
            <button style={{color: "black", fontWeight: 600, background: selectedIterator === "j" ? "#ff8080" : "initial"}} onClick={() => updateSelectedIterator("j")}>j</button>
          </>
        )
      }
      {
        (hasIIterator || hasJIterator) && (
          <>
            <br />
            <br />
            <button onClick={onRegressIterator}>{selectedIterator} --</button>
            <button onClick={onProceedIterator}>{selectedIterator} ++</button>
          </>
        )
      }
    </>
  )
}

export default IteratorSelection;