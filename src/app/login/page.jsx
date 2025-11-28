// app/login/page.jsx
"use client";

import dynamic from "next/dynamic";

const LoginComponent = dynamic(() => import("./LoginComponent"), {
  ssr: false,
});

export default function LoginPage() {
  return <LoginComponent />;
}
