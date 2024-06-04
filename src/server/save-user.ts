import { verify } from "@/utils/verify";
import { validateEmail } from "@/utils/helpers";
import { db } from "./db";

export async function saveUser() {
  const { email, name, id, token } = await verify();
  if (!email || !name || !id || !token) {
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
            token,
          },
        });
        console.log("User saved successfully");
      } else {
        try {
          if (existingUser.token !== token) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { token },
            });
            console.log("User token updated successfully");
          }
        } catch (error) {
          console.error("Error updating user token:", error);
        }
      }
      await prisma.$disconnect();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  return;
}
