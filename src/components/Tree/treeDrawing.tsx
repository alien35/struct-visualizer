import React from "react";
import { BinarySearchTreeNode, drawBinaryTree } from 'binary-tree-visualizer';
import StateContext from "../../contexts/StateContext";


function TreeDrawing() {

  const state = React.useContext(StateContext);
  const input = state.modifiedInput;

  const node = React.useRef();

  const prepareBfs = (path: number[]) => {
    const result: any[] = [];
    let windowSize = 1;
    if (!path.length) {
      return result;
    }
    let activeWindow = [];
    let it = 0;
    while (it < path.length) {
      if (activeWindow.length < windowSize) {
        activeWindow.push(path[it]);
        it ++;
      } else {
        result.push(activeWindow);
        const validNums = activeWindow.filter((win) => win !== null).length;
        activeWindow = [];
        windowSize = validNums * 2;
      }
    }
    if (activeWindow.length) {
      result.push(activeWindow);
    }
    return result;
  }

  const traverse = (arr: number[][], prevNode: any, index: number, offset: number) => {
    if (!Array.isArray(arr[index])) {
      return;
    }
    const left = arr[index][0 + offset];
    const right = arr[index][1 + offset];
    console.log(left, 'arrbro', index, offset)
    if (typeof left === "number") {
      prevNode.left = new BinarySearchTreeNode<number>(left);
      traverse(arr, prevNode.left, index + 1, 0);
    }
    let rightOffset = 2;
    if (typeof left !== "number") {
      rightOffset = 0;
    }
    if (typeof right === "number") {
      prevNode.right = new BinarySearchTreeNode<number>(right);
      traverse(arr, prevNode.right, index + 1, rightOffset);
    }
   
  }

  React.useEffect(() => {
    let arr = null;
    try {
      arr = JSON.parse(input);
    } catch (err) {
      return;
    }
    if (arr && Array.isArray(arr)) {
      const path = arr;
      // 1, 2, 4,8
      // always start at leftmost active node
      // @ts-ignore
      const bfsPath = prepareBfs(path);
      // Init a new root binary tree node
      // @ts-ignore
      const root = new BinarySearchTreeNode<number>(bfsPath[0][0]);
      traverse(bfsPath, root, 1, 0);
      const target =  document.querySelector('canvas')
      if (target) {
        drawBinaryTree(root, target);
      }
      console.log("DRAWINGGG")
    }
  }, [input]);

  return (
    <div id="tree-drawing">
      <canvas />
    </div>
  )
}

export default TreeDrawing;
