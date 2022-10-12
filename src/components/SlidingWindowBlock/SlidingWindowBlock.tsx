import React from "react";
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";
import SlidingWindowIteration from "../SlidingWindow/SlidingWindowIteration";
import VisualArrayContainer from "../VisualArrayContainer";
import classes from "./SlidingWindowBlock.module.css";

function SlidingWindowBlock({ item, onClose }: any) {

  const state = React.useContext(StateContext);
  // const dispatch = React.useContext(DispatchContext);
  
  const [inputVal, setInputVal] = React.useState(JSON.stringify(item.value));


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
  
  const hasIIterator = state.settings?.primaryIterator;
  const hasJIterator = state.settings?.secondaryIterator;
  const iIndex = state.indexes?.[0]?.i;
  const jIndex = state.indexes?.[0]?.j;

  const onChangeInput = (e: any) => {
    setInputVal(e.target.value);
  }

  const getSumOfAllValuesInBetween = () => {
    if (!inputVal) {
      return "";
    }
    try {
      return JSON.parse(inputVal).slice(iIndex, jIndex + 1).reduce((sum: number, each: number) => sum + each, 0);
    } catch (err) {
      return "";
    }
  }

  return (
    <div className={classes.container}>
        <div>
          <button onClick={onClose}>X</button>
          <input value={inputVal} onChange={onChangeInput} />
          {
            getInputArrays().map((each: any) => (
              <div style={{display: "flex"}}>
                <VisualArrayContainer iteratorMode="sliding-window"  hasJIterator={hasJIterator} hasIIterator={hasIIterator} iIndex={iIndex} jIndex={jIndex} value={each} />
              </div>
            ))
          }
          <SlidingWindowIteration iteratorMode="sliding-window" />
          <div>Sum: {getSumOfAllValuesInBetween()}</div>
          <hr />
        </div>
      </div>
  )
}

export default SlidingWindowBlock;
