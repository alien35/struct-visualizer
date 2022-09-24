import React from "react";
import { BinarySearchTreeNode, drawBinaryTree, VisualizationType } from 'binary-tree-visualizer';
import StateContext from "../../contexts/StateContext";
import { setTheme } from 'binary-tree-visualizer';
import OrderExamples from "./OrderExamples";

setTheme({
  radius: 30,
  fontSize: 16,
});


class TreeNode {
  val: number;
  left: null | TreeNode;
  right: null | TreeNode;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const options = {
  // SIMPLE: Taken by default. It assumes that max number of leaf nodes are present and decides the spacing accordingly.
  // PRETTY: Spacing is dynamic according to the nodes.
  // HIGHLIGHT: This is the same as PRETTY. Only difference is that the nodes expand when they are hovered over.
  // EXPANDABLE: Only one child can be viewed at a time.
  type: VisualizationType.SIMPLE,
};

function TreeDrawing() {

  const state = React.useContext(StateContext);
  const input = state.modifiedInput;
  const showTreeVisualizer = state.settings?.treeVisualizer;
  const [inorderData, setInorderData] = React.useState<number[]>([]);
  const [preorderData, setPreorderData] = React.useState<number[]>([]);
  const [postorderData, setPostorderData] = React.useState<number[]>([]);

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

  const inorder = (node: TreeNode | null) => {
    const result: number[] = [];
    const traverseInorder = (subNode: TreeNode | null) => {
      if (!subNode) {
        return;
      }
      traverseInorder(subNode.left);
      result.push(subNode.val);
      traverseInorder(subNode.right);
    }
    traverseInorder(node);
    setInorderData(result);
  }

  const preorder = (node: TreeNode | null) => {
    const result: number[] = [];
    const traversePreorder = (subNode: TreeNode | null) => {
      if (!subNode) {
        return;
      }
      result.push(subNode.val);
      traversePreorder(subNode.left);
      traversePreorder(subNode.right);
    }
    traversePreorder(node);
    setPreorderData(result);
  }

  const postorder = (node: TreeNode | null) => {
    const result: number[] = [];
    const traversePostorder = (subNode: TreeNode | null) => {
      if (!subNode) {
        return;
      }
      traversePostorder(subNode.left);
      traversePostorder(subNode.right);
      result.push(subNode.val);
    }
    traversePostorder(node);
    setPostorderData(result);
  }

  /*
  const traverse = (arr: number[][], prevNode: any, index: number, offset: number, node: TreeNode, timesMovedRight: number) => {
      if (!Array.isArray(arr[index])) {
        return;
      }
      if (!arr[index].length) {
        return;
      }
      const leftIndexForBeginning = offset === 0 ? offset : Math.pow(2, offset);
      const rightOffsetToUse = 1 + leftIndexForBeginning;
      const left = arr[index][offset];
      const right = arr[index][rightOffsetToUse];
      if (node.val === 3) {
        console.log('num found', arr[index], offset, "comp", left, right)
      }
      if (typeof left === "number") {
        prevNode.left = new BinarySearchTreeNode<number>(left);
        node.left = new TreeNode(left);
        const leftOffset = offset > 0 ? Math.pow(2, offset) : 0;
        traverse(arr, prevNode.left, index + 1, leftOffset, node.left, timesMovedRight);
      }
      if (typeof right === "number") {
        prevNode.right = new BinarySearchTreeNode<number>(right);
        node.right = new TreeNode(right);
        const check2 = offset === 0 ? 1 : 0;
        // offset is what they should expect their left-side offset to be coming up.
        traverse(arr, prevNode.right, index + 1, check2, node.right, timesMovedRight + 1);
      }
    }
    */
  
  React.useEffect(() => {
    const bfsTraverse = (node: any[], path: number[][], depth: number) => {
      if (!path[depth]) {
        return;
      }
      let offset = 0;
      console.log(path[depth][offset], 'huhhh', node)
      const nextNodes = [];
      for (let i = 0; i < node.length; i ++) {
        console.log(path[depth][offset], 'depth')
        node[i].left = new BinarySearchTreeNode<number>(path[depth][offset]);
        node[i].right = new BinarySearchTreeNode<number>(path[depth][offset + 1]);
        nextNodes.push(node[i].left);
        nextNodes.push(node[i].right);
        offset += 2;
      }
      bfsTraverse(nextNodes, path, depth + 1);
    }

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
      console.log(bfsPath, 'bfsPath')
      // Init a new root binary tree node
      // @ts-ignore
      const root = new BinarySearchTreeNode<number>(bfsPath[0][0]);
      const rootNode = new TreeNode(bfsPath[0][0]);
      for (let i = 1; i < bfsPath.length; i ++) {
        
      }
      bfsTraverse([root], bfsPath, 1);
      // traverse(bfsPath, root, 1, 0, rootNode, 0);
      const target =  document.querySelector('canvas')
      if (target) {
        drawBinaryTree(root, target, options);
      }
      inorder(rootNode);
      preorder(rootNode);
      postorder(rootNode);
    }
  }, [input]);

  if (!showTreeVisualizer) {
    return null;
  }

  return (
    <>
      <OrderExamples
        inorder={inorderData}
        postorder={postorderData}
        preorder={preorderData}
      />
      <div id="tree-drawing">
        <canvas width="500" height="500" />
      </div>
    </>
  )
}

export default TreeDrawing;
