import React from "react";
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";
import IteratorSelection from "../IteratorSelection";
import SlidingWindowIteration from "../SlidingWindow/SlidingWindowIteration";
import VisualArrayContainer from "../VisualArrayContainer";
import classes from "./IterationBlock.module.css";

function IterationBlock({ item, onClose }: any) {

  const state = React.useContext(StateContext);
  // const dispatch = React.useContext(DispatchContext);
  
  const [inputVal, setInputVal] = React.useState(JSON.stringify(item.value));

  const [indexes, setIndexes] = React.useState([{
    i: 0,
    j: 0
  }])

  const getInputArrays = () => {
    try {
      const splits = inputVal.split("\n");
      console.log(splits, 'splits here')
      const res = splits
        .map((each: string) => each.replace(/'/g, '"'))
        .map((each: string) => JSON.parse(each));
      console.log(res, 'res bro')
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
  return (
    <div className={classes.container}>
      
        <div>
        <button onClick={onClose}>X</button>
          <input value={inputVal} onChange={onChangeInput} />
          {
            getInputArrays().map((each: any) => (
              <div style={{display: "flex"}}>
                <VisualArrayContainer indexes={indexes} hasJIterator={true} hasIIterator={true} iIndex={iIndex} jIndex={jIndex} value={each} />
              </div>
            ))
          }
          <IteratorSelection indexes={indexes} updateIndexes={updateIndexes} />
            
          <br />
          <br />
          <hr />
          <br />
        </div>
      </div>
  )
}

export default IterationBlock;
