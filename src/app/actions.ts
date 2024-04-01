"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verify } from "@/server/verify";

export async function saveUser() {
  const { email, name, id } = verify();

  const isSignedIn = cookies().get("isSignedIn");

  if (
    isSignedIn?.value === "false" ||
    isSignedIn?.value === null ||
    undefined
  ) {
    try {
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
            cookies().set("isSignedIn", "true", {
              expires: 1,
              httpOnly: true,
              secure: true,
            });
          });
      } else {
        console.log("User already exists");
        cookies().set("isSignedIn", "true", {
          expires: 1,
          httpOnly: true,
          secure: true,
        });
      }
      await prisma.$disconnect();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }
}
