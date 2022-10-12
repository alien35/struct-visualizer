import React from "react";
import Block from "./components/Block/Block";
import Scratchpad from "./components/Scratchpad";
import V2InputSection from "./components/V2InputSection/V2InputSection";
import StateContext from "./contexts/StateContext";

function Version2() {

  const dropdownRef = React.useRef(null);

  const [blocks, setBlocks] = React.useState<any>([]);

  const state = React.useContext(StateContext);

  const [showDropdown, setShowDropdown] = React.useState(false);

  React.useEffect(() => {
    if (showDropdown) {
      // @ts-ignore
      dropdownRef.current?.focus();
    }
  }, [showDropdown])

  React.useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.code === "Slash") {
        setShowDropdown(true);
      }
    })
  }, []);

  const addText = (v?: string) => {
    const html = state.scratchpadInput?.toString("html");
    
    const newSet = [
      ...blocks,
      {
        type: "html",
        value: v || html,
        id: new Date().toISOString()
      }
    ]
    setBlocks(newSet)
  }

  const addSlidingWindow = () => {
    setBlocks([
      ...blocks,
      {
        type: "sliding-window",
        value: [1,2,3,4,5],
        id: new Date().toISOString()
      }
    ])
  }

  const addIteration = () => {
    setBlocks([
      ...blocks,
      {
        type: "iteration",
        value: [1,2,3,4,5],
        id: new Date().toISOString()
      }
    ])
  }

  const addBinaryTree = () => {
    setBlocks([
      ...blocks,
      {
        type: "binary-tree",
        value: [1,2,3,4,5,6,7,8],
        id: new Date().toISOString()
      }
    ])
  }

  const onDeleteBlock = (id: string) => {
    setBlocks(() => blocks.filter((block: any) => block.id !== id));
  }

  const onUpdateBlock = (id: string, val: string) => {
    setBlocks(blocks.map((each: any) => {
      if (each.id === id) {
        return {
          ...each,
          value: val
        }
      }
      return each;
    }))
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "40px"}}>
      {
        blocks.map((each: any) => <Block update={(v: string) => onUpdateBlock(each.id, v)} onDelete={onDeleteBlock} item={each} />)
      }
      <V2InputSection
        addBinaryTree={addBinaryTree}
        addSlidingWindow={addSlidingWindow}
        addText={addText}
        addIteration={addIteration}
      />
    </div>
  )
}

export default Version2;
