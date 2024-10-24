import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import TosterProvider from "@/lib/TosterProvider";

export const metadata: Metadata = {
  title: "ModaMart - Admin Dashboard",
  description: "Admin dashboard for ModaMart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <TosterProvider />
          <div className=" flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <TopBar />
            <div className=" flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
