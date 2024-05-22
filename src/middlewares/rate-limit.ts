import { rateLimit } from "@/utils/ratelimit";
import {
  type NextRequest,
  NextResponse,
  type NextFetchEvent,
} from "next/server";
import type { MiddlewareWrapperType } from "./types";

export const rateLimiter: MiddlewareWrapperType = (next) => {
  return async (req: NextRequest, _evt: NextFetchEvent, res: NextResponse) => {
    if (req.method === "POST") {
      const ip = req.ip ?? "127.0.0.1";
      if (!ip) return next(req, _evt, res);

      const { success } = await rateLimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: "Too many requests" },
          { status: 429 },
        );
      }
    }

    return next(req, _evt, res);
  };
};
