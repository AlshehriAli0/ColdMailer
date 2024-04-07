import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  test: publicProcedure.query(async () => {
    return "Hello world"
  }),
});

export type AppRouter = typeof appRouter;
