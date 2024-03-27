import prisma from "./prisma-client";

type userProps = {
  email: string;
  name: string;
  id: string;
};

export async function saveUser({ email, name, id }: userProps) {
  try {
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
  } catch (error) {
    console.error("Error saving user:", error);
  }
}
