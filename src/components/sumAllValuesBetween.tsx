import { useDrag } from "react-dnd";

export const SumAllValuesBetween = ({ iIteratorName, jIteratorName, value }: any) => {

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
