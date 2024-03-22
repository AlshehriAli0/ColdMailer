import React from 'react'
import {auth} from "@clerk/nextjs";

export default function ToolPage() {
  const {userId} = auth()
  return <h1 className='text-white'>{userId}</h1>;
}
