import React from "react";

function OrderExamples({ inorder, preorder, postorder }: any) {
  return (
    <div>
      <div style={{display: "flex"}}><span>Preorder: </span><span>{JSON.stringify(preorder)}</span></div>
      <div style={{display: "flex"}}><span>Inorder: </span><span>{JSON.stringify(inorder)}</span></div>
      <div style={{display: "flex"}}><span>Postorder: </span><span>{JSON.stringify(postorder)}</span></div>
    </div>
  )
}

export default OrderExamples;
