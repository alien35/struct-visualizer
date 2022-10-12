import React from "react";
import StateContext from "../contexts/StateContext";
import VisualArrayContent from "./VisualArrayContent";

const VisualArrayContainer = (props: any) => {
  const state = React.useContext(StateContext);

  const hasIIterator = state.settings?.primaryIterator;
  const hasJIterator = state.settings?.secondaryIterator;

  const { iteratorMode } = props;

  const selectIIndex = props.indexes?.[0]?.i;
  const selectJIndex = props.indexes?.[0]?.j;

  const mapped = props.value.map((each: any, index: number) => {
    let color = "initial";
    let letter = "";
    if (selectIIndex !== index && selectJIndex === index && hasJIterator) {
      color = "#ff8080";
      if (iteratorMode === "sliding-window") {
        letter = "i right";
      } else {
        letter = "j";
      }
    }
    if (selectIIndex === index) {
      color = "#f2f200";
      if (iteratorMode === "sliding-window") {
        letter = "i left";
      } else {
        letter = "i";
      }
    }
    if (!hasIIterator) {
      color = "initial";
    }
    if (selectIIndex === index && selectJIndex === index && hasIIterator && hasJIterator) {
      letter = "i,j";
      color = "#eeb900"
    }
    if (!hasIIterator) {
      letter = "";
    }
    return <div style={{position: "relative", marginBottom: 40}}>
      <VisualArrayContent iteratorMode={iteratorMode} color={color} each={each} index={index} />
      <span style={{position: "absolute", top: 56, left: 28}}>{letter}</span>
    </div>
  })

  return (
    <div style={{display: "flex", position: "relative"}}>
      {mapped}
    </div>
  )
}

export default VisualArrayContainer;
