import { auth } from "./middlewares/auth";
import { rateLimiter } from "./middlewares/rate-limit";
import { middlewareHandler } from "./middlewares/handler";

export const middleware = middlewareHandler([rateLimiter, auth]);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
