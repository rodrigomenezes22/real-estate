"use client";
import React, { use } from "react";
import { UserButton } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { GetCurrentUserFromMongoDB } from "@/actions/users";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";
function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData = null, setCurrentUserData] =
    React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(pathname.split("/")[1]);

  const getHeader = () => {
    if (isPublicRoute) return null;
    if (loading) return <Loader />;
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
    if (isPublicRoute) return children;
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response: any = await GetCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error);
      setCurrentUserData(response.data);
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
}

export default LayoutProvider;
