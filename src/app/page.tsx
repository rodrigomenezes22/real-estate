import { Button, Input } from "antd";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { use } from "react";

export default async function Home() {
  const loggedInUser = await currentUser();
  console.log(loggedInUser);

  let username = loggedInUser?.username;
  if (!username) {
    username = loggedInUser?.firstName + "" + loggedInUser?.lastName;
  }

  username = username.replace("null", "");

  return (
    <div className=" flex items-center justify-center flex-col gap-5 h-screen">
      <UserButton />
      <h1>Clerk user id: {loggedInUser?.id}</h1>
      <h2>User Name: {username}</h2>
      <h2>Email: {loggedInUser?.emailAddresses[0].emailAddress}</h2>
    </div>
  );
}
