import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col gap-5 h-screen bg-primary">
      <SignIn />
    </div>
  );
}
