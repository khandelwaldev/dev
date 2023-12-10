import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const is404Page: boolean = router.pathname === "/404";

  return (
    <>
      {router.pathname !== "/404" && <Navbar />}
      <main className={is404Page ? "" : "py-[193px]"}>{children}</main>
      {router.pathname !== "/404" && <Footer />}
    </>
  );
}
