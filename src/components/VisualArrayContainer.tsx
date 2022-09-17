import React from "react";
import StateContext from "../contexts/StateContext";
import VisualArrayBar from "./VisualArrayBar";
import VisualArrayContent from "./VisualArrayContent";

const VisualArrayContainer = (props: any) => {
  console.log(props, 'rpos')
  const state = React.useContext(StateContext);

  const hasIIterator = state.settings?.primaryIterator;
  const hasJIterator = state.settings?.secondaryIterator;

  const selectIIndex = state.indexes?.[0]?.i;
  const selectJIndex = state.indexes?.[0]?.j;
  const mapped = props.value.map((each: any, index: number) => {
    let color = "initial";
    let letter = "";
    if (selectIIndex !== index && selectJIndex === index && hasJIterator) {
      color = "lightblue";
      letter = "j";
    }
    if (selectIIndex === index) {
      color = "lightgreen";
      letter = "i"
    }
    if (!hasIIterator) {
      color = "initial";
    }
    if (selectIIndex === index && selectJIndex === index && hasIIterator) {
      letter = "i,j"
    }
    if (!hasIIterator) {
      letter = "";
    }
    return <div style={{position: "relative", marginBottom: 12}}>
      <VisualArrayBar index={index} />
      <VisualArrayContent color={color} each={each} index={index} onClick={props.onClick} />
      <span style={{position: "absolute", top: 56, left: 28}}>{letter}</span>
    </div>
  })
  return (
    <div style={{display: "flex", position: "relative"}}>
      {mapped}
      <VisualArrayBar index={props.value.length} />
    </div>
  )
}

export default VisualArrayContainer;
