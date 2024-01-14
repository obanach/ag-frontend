import type {Metadata, Viewport} from 'next'
import { Inter as FontSans } from "next/font/google"
import './globals.css'
import {ReactNode} from "react";
import {ThemeProvider} from "@/components/theme-provider";
import {AuthProvider} from "@/context/AuthContext";
import {Toaster} from "@/components/ui/toaster";
import {cn} from "@/lib/utils";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: 'AutoGrow',
    description: 'AutoGrow App allows you to manage your plant tents and grow rooms from anywhere in the world.',
}

export const viewport: Viewport = {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: 'dark',
    userScalable: false
};

interface RootLayoutProps {
  children: ReactNode
}

function RootLayout({ children}: RootLayoutProps) {

  return (
    <html lang="en" suppressHydrationWarning>
    <body
        className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}
    >
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <AuthProvider>
            {children}

            <Toaster/>
        </AuthProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}

export default RootLayout;