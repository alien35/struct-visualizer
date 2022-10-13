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

function TreeDrawing({ input }: any) {

  const idRef = React.useRef(null);

  console.log(idRef.current, 'current')

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

  React.useEffect(() => {
    const bfsTraverse = (node: any[], path: number[][], depth: number, simplePath: TreeNode[]) => {
      if (!path[depth]) {
        return;
      }
      let offset = 0;
      const nextNodes = [];
      const nextSimpleNodes: TreeNode[] = [];
      for (let i = 0; i < node.length; i ++) {
        if (typeof path[depth][offset] === "number") {
          node[i].left = new BinarySearchTreeNode<number>(path[depth][offset]);
          simplePath[i].left = new TreeNode(path[depth][offset]);
          nextNodes.push(node[i].left);
          // @ts-ignore
          nextSimpleNodes.push(simplePath[i].left);
        }
        if (typeof path[depth][offset + 1] === "number") {
          node[i].right = new BinarySearchTreeNode<number>(path[depth][offset + 1]);
          simplePath[i].right = new TreeNode(path[depth][offset + 1]);
          nextNodes.push(node[i].right);
          // @ts-ignore
          nextSimpleNodes.push(simplePath[i].right);
        }
        offset += 2;
      }
      bfsTraverse(nextNodes, path, depth + 1, nextSimpleNodes);
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
      if (!Array.isArray(bfsPath?.[0])) {
        return;
      }
      // Init a new root binary tree node
      // @ts-ignore
      const root = new BinarySearchTreeNode<number>(bfsPath[0][0]);
      const rootNode = new TreeNode(bfsPath[0][0]);
      for (let i = 1; i < bfsPath.length; i ++) {
        
      }
      bfsTraverse([root], bfsPath, 1, [rootNode]);
      // @ts-ignore
      drawBinaryTree(root, idRef.current, options);
      inorder(rootNode);
      preorder(rootNode);
      postorder(rootNode);
    }
  }, [input]);

  return (
    <>
      <OrderExamples
        inorder={inorderData}
        postorder={postorderData}
        preorder={preorderData}
      />
      <div>
        <canvas ref={idRef} id={`canvas`} />
      </div>
    </>
  )
}

export default TreeDrawing;
