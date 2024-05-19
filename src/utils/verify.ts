import { auth } from "@clerk/nextjs";

export async function verify() {
  const { sessionClaims, getToken } = auth();

  let name = sessionClaims?.firstName as string;
  const id = sessionClaims?.id as string;
  const email = sessionClaims?.email as string;
  const token = await getToken();

  name = firstLetterToUpperCase(name);

  return { email, name, id, token };
}
export function firstLetterToUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
