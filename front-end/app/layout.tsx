import React, {PropsWithChildren} from "react";
import {Domine} from 'next/font/google'
import clsx from "clsx";

import TopNavigationMenu from "@/components/navigation/top-navigation-menu";
import Footer from "@/app/footer";
import {environment} from "@/app/configuration/environment";
import {Analytics} from "@/components/analytics";

import './globals.css';

const font = Domine({subsets: ['latin']});

export async function generateMetadata() {
    return {
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: '/'
        }
    }
}

const NODE_ENV = process.env.NODE_ENV;

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en">
        <body className={clsx(font.className, "relative")}>
        <header className="print:hidden w-full border-b bg-white">
            <TopNavigationMenu/>
        </header>
        {children}
        <Footer/>
        {NODE_ENV === "production" ? <Analytics/> : null}
        </body>
        </html>
    )
}
