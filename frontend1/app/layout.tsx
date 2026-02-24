"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HoverFooter from "@/components/Footer";
import DemoNav from "@/components/DemoNavbar";
import { QueryClientProvider } from "@tanstack/react-query";
// import { MidlProvider } from "@midl/react";
// import { SatoshiKitProvider } from "@midl/satoshi-kit";
// import "@midl/satoshi-kit/styles.css";
// import { WagmiMidlProvider } from "@midl/executor-react";
// import { WagmiProviderWrapper } from "@/components/WagmiProviderWrapper";
// import { midlConfig, queryClient } from "./config";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {/* <QueryClientProvider client={queryClient}>
        <MidlProvider config={midlConfig}>
  <SatoshiKitProvider>
          <WagmiMidlProvider> */}
          <DemoNav></DemoNav>
          {children}

          {/* </WagmiMidlProvider>
  </SatoshiKitProvider>
        </MidlProvider>
      </QueryClientProvider> */}
    
        <HoverFooter></HoverFooter>
      </body>
    </html>
  );
}
