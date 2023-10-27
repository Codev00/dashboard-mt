import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/hook/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Hi, Admin",
   description: "Manager and Edit",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" className="dark">
         <body className={inter.className}>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
