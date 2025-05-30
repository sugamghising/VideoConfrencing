import StreamVideoProvider from '@/providers/StreamClientProvider'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VOOOM ",
  description: "Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  }
};

function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <main>
        <StreamVideoProvider>
          {children}
        </StreamVideoProvider>
    </main>
  )
}

export default RootLayout