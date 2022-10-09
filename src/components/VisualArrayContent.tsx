import { stat } from "fs";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

const VisualArrayContent = (props: any) => {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext)
  const selectedIterator = state.selectedIterator;

  const selectSlidingJIIndex = state.slidingJIndexes?.[0]?.i;
  const selectSlidingJJIndex = state.slidingJIndexes?.[0]?.j;
  
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

    if (selectedIterator === "i") {
      dispatch({
        type: "update-indexes",
        val: newVal
      })
    } else {
      dispatch({
        type: "update-sliding-j-indexes",
        val: newVal
      })
    }
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

  const isInI = () => {
    return props.index >= state.indexes[0]?.i && props.index <= state.indexes[0]?.j;
  }

  const isInJ = () => {
    return props.index >= state.slidingJIndexes[0]?.i && props.index <= state.slidingJIndexes[0]?.j;
  }

  const getBackground = () => {
    if (state.iteratorMode !== "sliding-window") {
      return dragColor || isOver || props.color;
    }
    if (isInJ() && isInI()) {
      return "#eeb900";
    }
    if (isInI()) {
      return "#f2f200"
    }
    if (isInJ()) {
      return "#ff8080";
    }
    return "";
  }

  return (
    <div style={{background: getBackground()}} ref={dropRef}>
      <div ref={dragRef} onClick={onClick} style={{width: "32px", fontSize: "32px", fontWeight: "600", padding: 4, display: "flex", justifyContent: "center"}} className="each-array-integer">{props.each}</div>
    </div>
  )
}

export default VisualArrayContent;
