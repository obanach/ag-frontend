import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";
import {ThemeProvider} from "@/components/theme-provider";
import {AuthProvider} from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: 'AutoGrow',
    description: 'AutoGrow App allows you to manage your plant tents and grow rooms from anywhere in the world.',
}

interface RootLayoutProps {
  children: ReactNode
}

function RootLayout({ children}: RootLayoutProps) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout;