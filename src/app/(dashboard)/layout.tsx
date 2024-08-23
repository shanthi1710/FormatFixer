import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import { Sidebar } from "../../components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className={`${inter.className} flex flex-col h-screen bg-[#ebe6e6] overflow-hidden`}
    >
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <main className="flex-grow overflow-auto">{children}</main>
        </Suspense>
      </div>
    </div>
  );
}
