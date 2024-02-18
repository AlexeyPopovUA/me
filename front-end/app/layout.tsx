import React from "react";
import type {Metadata} from 'next'
import {Domine} from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import TopNavigationMenu from "@/components/navigation/top-navigation-menu";
import Footer from "@/app/footer";

import './globals.css';

const NODE_ENV = process.env.NODE_ENV;

const font = Domine({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={font.className}>
        <header className="print:hidden w-full border-b bg-white">
            <TopNavigationMenu/>
        </header>
        {children}
        <Footer/>
        </body>
        {NODE_ENV === "production" ? <GoogleAnalytics gaId="G-DZVHV18EK4" /> : null}
        </html>
    )
}
