"use client";

import { RecoilRoot, atom } from "recoil";
import { type Recipient } from '@/lib/types';

export const sortState = atom({
  key: "sortState",
  default: "",
});

export const TotalEmails = atom({
  key: "TotalEmails",
  default: 0,
});

export const TotalPending = atom({
  key: "TotalPending",
  default: 0,
});

export const TotalAccepted = atom({
  key: "TotalAccepted",
  default: 0,
});

export const TotalRejected = atom({
  key: "TotalRejected",
  default: 0,
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
