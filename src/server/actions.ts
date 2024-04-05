"use server";

import { PrismaClient } from "@prisma/client";
import { verify } from "@/utils/verify";
import { validateEmail } from "@/utils/helpers";

export async function saveUser() {
  const { email, name, id } = verify();

  if (validateEmail(email)) {
    try {
      console.log("saving user");
      const prisma = new PrismaClient();
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        await prisma.user
          .create({
            data: {
              email,
              first_name: name,
              id,
            },
          })
          .then(() => {
            console.log("User saved successfully");
          });
      } else {
        console.log("User already exists");
      }
      await prisma.$disconnect();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }
  return;
}
