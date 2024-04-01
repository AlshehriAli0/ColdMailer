import React from 'react'

import { UserProfile } from "@clerk/nextjs";


export default function Profile() {
  return (
    <UserProfile appearance={
        {
            elements:{
                card: "w-screen bg-slate-950 mt-12"
            }
        }
    }></UserProfile>
  )
}
