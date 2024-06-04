import React from 'react'

import { UserProfile } from "@clerk/nextjs";

export const dynamic = "force-static";

export default function Profile() {
  return (
    <section className="mb-32 flex w-full justify-center">
      <UserProfile
        appearance={{
          elements: {
            card: "w-screen dark mt-24 -mb-24",
          },
        }}
      ></UserProfile>
    </section>
  );
}
