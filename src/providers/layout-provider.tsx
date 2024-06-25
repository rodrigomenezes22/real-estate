"use client";
import React, { use } from "react";
import { UserButton } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { GetCurrentUserFromMongoDB } from "@/actions/users";
import { User } from "@prisma/client";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData = null, setCurrentUserData] =
    React.useState<User | null>(null);
  const getHeader = () => {
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-4 flex justify-between items-center rounded-b">
          <h1 className="text-xl text-white">Rodrigo Properties</h1>

          <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
            <span>{currentUserData?.username}</span>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };

  const getContent = () => {
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      const response: any = await GetCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error);
      setCurrentUserData(response.data);
    } catch (error: any) {}
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
}

export default LayoutProvider;
