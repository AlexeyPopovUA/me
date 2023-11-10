import type {Metadata} from 'next'
import Head from 'next/head';
import {Domine} from 'next/font/google'

import TopNavigationMenu from "@/app/top-navigation-menu";

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
        <Head>
            <base href="/"/>
        </Head>
        <body className={font.className}>
        <header className="sticky w-full top-0 z-0 border-b bg-white">
            <TopNavigationMenu/>
        </header>

        {children}
        </body>
        </html>
    )
}
