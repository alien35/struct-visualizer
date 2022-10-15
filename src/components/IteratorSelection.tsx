import { Button } from '@mui/material';
import React from "react";
import DispatchContext from '../contexts/DispatchContext';
import StateContext from '../contexts/StateContext';

function IteratorSelection({ updateIndexes, indexes, onePointer }: any) {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const [selectedIterator, setSelectedIterator] = React.useState("i");

  const onProceedIterator = () => {
    const rowIndex = 0;

    const newVal = indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      return {
        ...row,
        [selectedIterator]: row[selectedIterator] + 1
      }
    })
    console.log(newVal, 'newVal')

    updateIndexes(newVal)
  }

  const updateSelectedIterator = (which: string) => {
    dispatch({
      type: "update-selected-iterator",
      val: which
    })
  }

  const onRegressIterator = () => {
    const rowIndex = 0;

    const newVal = indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      return {
        ...row,
        [selectedIterator]: row[selectedIterator] - 1
      }
    })

    console.log(newVal, 'newVal')

    updateIndexes(newVal);
  }

  return (
    <>
      {!onePointer && (
        <>
          <h4>Select iterator</h4>
          <button style={{fontWeight: 600, background: selectedIterator === "i" ? "#f2f200" : "initial", color: "black"}} onClick={() => setSelectedIterator("i")}>i</button>
          &nbsp;
          <button style={{color: "black", fontWeight: 600, background: selectedIterator === "j" ? "#ff8080" : "initial"}} onClick={() => setSelectedIterator("j")}>j</button>
          <br />
          <br />
        </>
      )}
      <>
        <button onClick={onRegressIterator}>{selectedIterator} --</button>
        <button onClick={onProceedIterator}>{selectedIterator} ++</button>
      </>
    </>
  )
}

export default IteratorSelection;