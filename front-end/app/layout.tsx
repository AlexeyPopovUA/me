import React, {PropsWithChildren} from "react";
import {Inter} from 'next/font/google'
import clsx from "clsx";

import TopNavigationMenu from "@/components/navigation/top-navigation-menu";
import Footer from "@/app/footer";
import {environment} from "@/app/configuration/environment";
import {content} from "@/app/configuration/content";
import {Analytics} from "@/components/analytics";
import {ThemeProvider} from "@/components/theme-provider";

import './globals.css';

const font = Inter({subsets: ['latin']});

function getTwitterHandle(twitterUrl: string) {
    try {
        const parsed = new URL(twitterUrl);
        const handle = parsed.pathname.split("/").filter(Boolean).pop();
        if (!handle) {
            return undefined;
        }
        return handle.startsWith("@") ? handle : `@${handle}`;
    } catch {
        return undefined;
    }
}

export async function generateMetadata() {
    const twitterHandle = getTwitterHandle(content.socialLinks.twitter);

    return {
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: '/'
        },
        openGraph: {
            siteName: content.authorName
        },
        twitter: {
            card: "summary_large_image",
            ...(twitterHandle ? {site: twitterHandle} : {})
        }
    }
}

const NODE_ENV = process.env.NODE_ENV;

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={clsx(font.className, "relative")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <TopNavigationMenu/>
            {children}
            <Footer/>
            {NODE_ENV === "production" ? <Analytics/> : null}
        </ThemeProvider>
        </body>
        </html>
    )
}
