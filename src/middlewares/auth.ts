import { authMiddleware } from "@clerk/nextjs/server";
import type { MiddlewareWrapperType } from "./types";

export const auth: MiddlewareWrapperType = () => {
  return authMiddleware({
    publicRoutes: ["/", "/sign-in", "/sign-up"],
  });
};
