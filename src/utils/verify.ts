import { auth } from "@clerk/nextjs";
import { firstLetterToUpperCase } from "./helpers";

export function verify() {
  const { sessionClaims } = auth();

  let name = sessionClaims?.firstName as string;
  const id = sessionClaims?.id as string;
  const email = sessionClaims?.email as string;
  name = firstLetterToUpperCase(name);

  return { email, name, id };
}
