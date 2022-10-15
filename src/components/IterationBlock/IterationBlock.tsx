import React from "react";
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";
import IteratorSelection from "../IteratorSelection";
import SlidingWindowIteration from "../SlidingWindow/SlidingWindowIteration";
import VisualArrayContainer from "../VisualArrayContainer";
import classes from "./IterationBlock.module.css";

function IterationBlock({ item, onClose, nonIterative, onePointer }: any) {

  const state = React.useContext(StateContext);
  // const dispatch = React.useContext(DispatchContext);
  
  const [inputVal, setInputVal] = React.useState(JSON.stringify(item.value));

  const [modifiedInput, setModifiedInput] = React.useState(JSON.stringify(item.value));

  React.useEffect(() => {
    setModifiedInput(inputVal);
  }, [inputVal]);

  const [indexes, setIndexes] = React.useState([{
    i: 0,
    j: onePointer ? -1 : 0
  }])

  const getInputArrays = () => {
    try {
      const splits = modifiedInput.split("\n");
      console.log(splits, 'splits here')
      const res = splits
        .map((each: string) => each.replace(/'/g, '"'))
        .map((each: string) => JSON.parse(each));
        if (Array.isArray(res[0]) && res[0]?.length && Array.isArray(res[0][0])) {
          return res[0];
        }
        return res;
    } catch (err) {
      return []
    }
  }

  const updateIndexes = (newVal: any[]) => {
    setIndexes(newVal);
  }

  const iIndex = indexes?.[0]?.i;
  const jIndex = indexes?.[0]?.j;

  const onChangeInput = (e: any) => {
    setInputVal(e.target.value);
  }

  const onSwap = () => {
    const data = JSON.parse(modifiedInput);
    const temp = data[iIndex];
    data[iIndex] = data[jIndex];
    data[jIndex] = temp;
    setModifiedInput(JSON.stringify(data));
  }

  console.log(getInputArrays(), 'huhhh')
  return (
    <div className={classes.container}>
      
        <div>
        <button onClick={onClose}>X</button>
          <input value={inputVal} onChange={onChangeInput} />
          {
            getInputArrays().map((each: any) => (
              <div style={{display: "flex", flexDirection: "column"}}>
                <VisualArrayContainer nonIterative={nonIterative} indexes={indexes} hasJIterator={true} hasIIterator={true} iIndex={iIndex} jIndex={jIndex} value={each} />
              </div>
            ))
          }
          {
            !nonIterative && (
              <>
                <IteratorSelection onePointer={onePointer} indexes={indexes} updateIndexes={updateIndexes} />
                {
                  !onePointer && (
                    <>
                      <br />
                      <br />
                      <button onClick={onSwap}>Swap i and j</button>
                    </>
                  )
                }
              </>
            )
          }
          
          
          <br />
          <br />
          <hr />
          <br />
        </div>
      </div>
  )
}

export default IterationBlock;
