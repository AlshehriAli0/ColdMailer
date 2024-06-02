import { auth } from "./middlewares/auth";
import { rateLimiter } from "./middlewares/rate-limit";
import { middlewareHandler } from "./middlewares/handler";

export const middleware = middlewareHandler([rateLimiter, auth]);

export const config = {
  matcher: [ '/((?!api|_next/static|_next/image|favicon.ico|/|sign-up|sign-in).*)',],
};
