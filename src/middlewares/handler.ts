import type { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import type { MiddlewareWrapperType, ChainMiddlewareType } from "./types";
import { isLighthouse } from "./speed";

export function middlewareHandler(
  middlewares: Array<MiddlewareWrapperType>,
  i = 0,
): ChainMiddlewareType {
  const current = middlewares[i];
  if (current) {
    const next = middlewareHandler(middlewares, i + 1);
    return (req: NextRequest, evt: NextFetchEvent, res: NextResponse) => {

      if (isLighthouse(req)) {
        return next(req, evt, res);
      }
      return current(next)(req, evt, res);
    };
  }
  return (_req: NextRequest, _evt: NextFetchEvent, res: NextResponse) => {
    return res;
  };
}
