import React from "react";
import type {Metadata} from 'next'
import {Domine} from 'next/font/google'

import TopNavigationMenu from "@/components/navigation/top-navigation-menu";
import Footer from "@/app/footer";

import './globals.css';

const font = Domine({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Oleksii Popov',
    description: 'Personal portfolio and blog'
}

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
        </html>
    )
}
