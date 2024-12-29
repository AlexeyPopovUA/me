"use client";

import {GoogleAnalytics} from "@next/third-parties/google";
import {useSearchParams} from "next/navigation";
import React, {Suspense} from "react";

function Google() {
    const searchParams = useSearchParams()

    const silent = searchParams.get('silent');

    return (
        silent === null ? <GoogleAnalytics gaId="G-DZVHV18EK4"/> : null
    );
}

export function Analytics() {
    return (
        <Suspense>
            <Google/>
        </Suspense>
    );
}