import { useDrag } from "react-dnd";
import StateContext from "../contexts/StateContext";
import React from "react";

export const SumAllValuesBetween = ({ iIteratorName, jIteratorName, value }: any) => {

  const state = React.useContext(StateContext);
  const iteratorMode = state.iteratorMode;
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "something",
      item: { value },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  console.log(iteratorMode, 'iteratormode')

  if (iteratorMode !== "sliding-window") {
    return null;
  }

  return (
    <>
      <h4>
        Sum of all values between {iIteratorName} and {jIteratorName}, inclusive
      </h4>
      <h2>
        <div ref={dragRef} style={{ opacity }}>
          {value}
        </div>
      </h2>
    </>
  )
}
