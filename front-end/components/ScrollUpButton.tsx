"use client";

import {useCallback} from "react";
import {useRouter} from "next/navigation";

const GoTop = () => {
    const router = useRouter();

    const handleBackToBlogClick = useCallback(() => {
        router.push("/blog");
    }, [router]);

    const handleUpClick = useCallback(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <div className="fixed bottom-2 right-2 bg-white rounded-md border-2">
            <button className="underline p-2 mr-4" onClick={handleBackToBlogClick}>
                &larr; To Blog
            </button>
            <button className="underline p-2" onClick={handleUpClick}>
                &uarr; UP
            </button>
        </div>
    );
};
export default GoTop;
