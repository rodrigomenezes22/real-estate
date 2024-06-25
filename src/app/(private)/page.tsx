import { Button, Input } from "antd";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { use } from "react";
import { GetCurrentUserFromMongoDB } from "@/actions/users";

export default async function Home() {
  return <div>Homepage</div>;
}
