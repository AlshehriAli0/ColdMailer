"use client";

import { trpc } from "@/app/_trpc/client";

import React from "react";

export default function Test() {
  const testConst = trpc.test.useQuery();

  return <div>{JSON.stringify(testConst.data)}</div>;
}
