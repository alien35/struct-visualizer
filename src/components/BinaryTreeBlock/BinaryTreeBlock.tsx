import React from "react";
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";
import SlidingWindowIteration from "../SlidingWindow/SlidingWindowIteration";
import TreeDrawing from "../Tree/treeDrawing";
import VisualArrayContainer from "../VisualArrayContainer";
import classes from "./BinaryTreeBlock.module.css";

function BinaryTreeBlock({ item }: any) {

  const [inputVal, setInputVal] = React.useState(JSON.stringify(item.value));

  return (
    <div className={classes.container}>
      <div style={{width: "100px", height: "500px"}}>
        <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
        <TreeDrawing input={inputVal} />
      </div>
    </div>
  )
}

export default BinaryTreeBlock;
