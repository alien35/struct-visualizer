import React from "react";
import { useDrag, useDrop } from "react-dnd";
import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

const VisualArrayContent = (props: any) => {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext)
  const selectedIterator = state.selectedIterator;

  const [{ dragColor }, dragRef] = useDrag(
    () => ({
      type: "visual-array-bar",
      item: { value: props.index },
      collect: (monitor) => ({
        dragColor: monitor.isDragging() ? "lightgrey" : ""
      })
    }),
    []
  )

  const handleDrop = (item: any) => {
    const rowIndex = 0;

    const newVal = state.indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      const iIndex = Math.min(props.index, item.value);
      const jIndex = Math.max(props.index, item.value);
      return {
        i: iIndex,
        j: jIndex
      }
    })

    dispatch({
      type: "update-indexes",
      val: newVal
    })

    if (props.index !== item.value) {
      dispatch({
        type: "update-iterator-mode",
        val: "sliding-window"
      })
    }
  }

  const [{isOver}, dropRef] = useDrop({
    accept: 'visual-array-bar',
    drop: (item: any) => {
      handleDrop(item);
      console.log(item, 'ietm', props.index)
      // setKey({target: {value: item.value}}, each);
    },
    collect: (monitor) => ({
        isOver: monitor.isOver() ? "lightgrey" : ""
    })
})

  const onClick = () => {
    const rowIndex = 0;

    const newVal = state.indexes.map((row: any, index: any) => {
      if (index !== rowIndex) {
        return row;
      }
      return {
        ...row,
        [selectedIterator]: props.index   
      }
    })

    dispatch({
      type: "update-indexes",
      val: newVal
    })

    dispatch({
      type: "update-iterator-mode",
      val: "iterate"
    })
  }

  const getBackground = () => {
    if (state.iteratorMode === "sliding-window") {
      if (props.index < state.indexes[0]?.i) {
        return ""
      }
      if (props.index > state.indexes[0]?.j) {
        return ""
      }
      return "lightgrey"
    }
    return dragColor || isOver || props.color;
  }

  return (
    <div ref={dropRef}>
      <div ref={dragRef} onClick={onClick} style={{background: getBackground(), width: "32px", fontSize: "32px", fontWeight: "600", padding: 4, display: "flex", justifyContent: "center"}} className="each-array-integer">{props.each}</div>
    </div>
  )
}

export default VisualArrayContent;
