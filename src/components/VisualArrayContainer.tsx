import React from "react";
import VisualArrayBar from "./VisualArrayBar";
import VisualArrayContent from "./VisualArrayContent";

const VisualArrayContainer = (props: any) => {
  console.log(props, 'rpos')
  const mapped = props.value.map((each: any, index: number) => {
    let color = "initial";
    let letter = "";
    if (props.iIndex !== index && props.jIndex === index && props.hasJIterator) {
      color = "lightblue";
      letter = "j";
    }
    if (props.iIndex === index) {
      color = "lightgreen";
      letter = "i"
    }
    if (!props.hasIIterator) {
      color = "initial";
    }
    if (props.iIndex === index && props.jIndex === index && props.hasJIterator) {
      letter = "i,j"
    }
    if (!props.hasIIterator) {
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
