import { verify } from "@/utils/verify";
import { validateEmail } from "@/utils/helpers";
import { db } from "./db";

export async function saveUser() {
  const { email, name, id } = await verify();
  if (!email || !name || !id) {
    console.error("Missing user data");
    return;
  }

  if (validateEmail(email)) {
    try {
      const prisma = db;
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email,
            first_name: name,
            id,
          },
        });
        console.log("User saved successfully");
      }
      await prisma.$disconnect();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  return;
}
