"use client";

import { RecoilRoot, atom } from "recoil";

export const sortState = atom({
  key: "sortState",
  default: "",
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}