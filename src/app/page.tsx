import { Button, Input } from "antd";

export default function Home() {
  return (
    <div className=" flex items-center justify-center flex-col gap-5 h-screen">
      <h1>Home Page</h1>

      <Input placeholder="Basic input" className="w-60" />
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
