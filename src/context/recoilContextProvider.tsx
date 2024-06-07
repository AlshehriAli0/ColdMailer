"use client";

import { RecoilRoot, atom } from "recoil";
import type { Recipient } from "@/lib/types";

export const sortState = atom({
  key: "sortState",
  default: "",
});

export const editRecipient = atom({
  key: "editRecipient",
  default: null as Recipient | null,
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
