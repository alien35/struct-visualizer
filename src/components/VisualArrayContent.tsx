import React from "react";
import { useDrag, useDrop } from "react-dnd";

const VisualArrayContent = (props: any) => {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "visual-array-bar",
      item: { value: props.index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? "lightgrey" : props.color
      })
    }),
    []
  )

  const [{isOver}, dropRef] = useDrop({
    accept: 'visual-array-bar',
    drop: (item: any) => {
      console.log(item, 'ietm', props.index)
      // setKey({target: {value: item.value}}, each);
    },
    collect: (monitor) => ({
        isOver: monitor.isOver() ? "lightgrey" : props.color
    })
})

  const getBackground = () => {
    if (isOver === "lightgrey") {
      return isOver;
    }
    return opacity;
  }

  return (
    <div ref={dropRef}>
      <div ref={dragRef} onClick={() => props.onClick(props.index)} style={{background: getBackground(), width: "32px", fontSize: "32px", fontWeight: "600", padding: 4, display: "flex", justifyContent: "center"}} className="each-array-integer">{props.each}</div>
    </div>
  )
}

export default VisualArrayContent;
