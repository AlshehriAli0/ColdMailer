import type { NextRequest } from "next/server";

export function isLighthouse(req: NextRequest): boolean {
  const userAgent = req.headers.get('user-agent') || '';
  return userAgent.includes('Lighthouse');
}
