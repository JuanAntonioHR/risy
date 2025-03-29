import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/providers/TanstackProvider";
import { AntdRegistry} from "@ant-design/nextjs-registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Risy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`bg-neutral-50 ${geistSans.variable} ${geistMono.variable}`}>
        <TanstackProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </TanstackProvider>
      </body>
    </html>
  );
}
