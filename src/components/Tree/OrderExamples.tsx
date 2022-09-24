import React from "react";

function OrderExamples({ inorder, preorder, postorder }: any) {
  return (
    <div>
      <div>Preorder: {JSON.stringify(preorder)}</div>
      <div>Inorder: {JSON.stringify(inorder)}</div>
      <div>Postorder: {JSON.stringify(postorder)}</div>
    </div>
  )
}

export default OrderExamples;
