import { Button, Grid, TextField } from '@mui/material';
import React from "react";
import { useDrop } from "react-dnd";
import DispatchContext from '../contexts/DispatchContext';
import StateContext from '../contexts/StateContext';

function IteratorSelection({ inputs, setKey, each}: any) {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const selectedIterator = state.selectedIterator;

  const hasIIterator = state.settings?.primaryIterator;
  const hasJIterator = state.settings?.secondaryIterator;
  const indexes = state.indexes;

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

  const onBreak = () => {
    /*
    if (selectedIterator === "i") {
      onReset();
      return;
    }
    setJIndex(iIndex);
    */
  }

  return (
    <>
      {
        (hasIIterator || hasJIterator) && (
          <h4>Select iterator</h4>
        )
      }
      {
        hasIIterator && (
          <Button variant="outlined" style={{background: selectedIterator === "i" ? "lightgreen" : "initial"}} onClick={() => updateSelectedIterator("i")}>i</Button>
        )
      }
      {
        hasJIterator && (
          <>
            &nbsp;
            <Button variant="outlined" style={{background: selectedIterator === "j" ? "lightgreen" : "initial"}} onClick={() => updateSelectedIterator("j")}>j</Button>
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