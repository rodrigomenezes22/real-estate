"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/config/db";
import { profile } from "console";

export const GetCurrentUserFromMongoDB = async () => {
  try {
    //check if user exists
    const clerkUser = await currentUser();
    let mongoUser = null;
    mongoUser = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser?.id },
    });
    if (mongoUser) {
      return { data: mongoUser };
    }

    let username = clerkUser?.username;
    if (!username) {
      username = clerkUser?.firstName + "" + clerkUser?.lastName;
    }

    // if user does not exist, create a new user
    const newUser: any = {
      clerkUserId: clerkUser?.id,
      username,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePic: clerkUser?.imageUrl,
    };
    const result = await prisma.user.create({
      data: newUser,
    });
    return {
      data: result,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
