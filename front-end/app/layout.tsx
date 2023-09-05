import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import NavMenu from "@/app/nav-menu";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Oleksii Popov',
    description: 'Personal portfolio and blog',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <header className="sticky w-full top-0 z-0 border-b bg-white">
            <NavMenu/>
        </header>

        {children}
        </body>
        </html>
    )
}
