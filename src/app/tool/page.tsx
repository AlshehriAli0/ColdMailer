import React from 'react'
import {auth} from "@clerk/nextjs";
export default function ToolPage() {
  const {getToken} = auth()
  const Token = getToken()
 
  return (
    <h1 className="text-white">
      {Token}
    </h1>
  );
}
