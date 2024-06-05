import type { NextRequest } from "next/server";

const getReq = process.env.SPEEDHEADER_GET;
const returnReq = process.env.SPEEDHEADER_RETURN;

export function isLighthouse(req: NextRequest): boolean {
  if (!getReq || !returnReq) {
    throw new Error("SPEEDHEADER_GET and SPEEDHEADER_RETURN are not set");
  }

  const userAgent = req.headers.get(getReq) ?? "";
  return userAgent.includes(returnReq);
}
