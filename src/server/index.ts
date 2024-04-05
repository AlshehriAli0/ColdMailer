import { publicProcedure, router } from "./trpc";


export const appRouter = router({
  test: publicProcedure.query(async () => {
    return { msg: "Hello World!" };
  }),
});

export type AppRouter = typeof appRouter;
