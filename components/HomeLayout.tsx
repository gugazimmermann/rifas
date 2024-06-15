import { ReactNode } from "react";
import Header from "@/pages/home/header";
import Footer from "@/pages/home/footer";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col overflow-auto">{children}</main>
      <Footer />
    </div>
  );
}
