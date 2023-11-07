"use client";

import {useCallback, useState} from "react";
import {clsx} from "clsx";
import Link from "next/link";

const itemCls = "select-none hover:text-amber-500 duration-200";
const titleItemCls = "select-none rounded-md leading-none no-underline outline-none";

const NavMenuMobile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuClick = useCallback(() => {
        setIsMenuOpen(open => !open);
    }, []);

    const menuCls = clsx("fixed top-0 z-90 flex flex-col justify-center items-center bg-white duration-500", {
        "w-screen": isMenuOpen,
        "h-screen": isMenuOpen,
        "opacity-100": isMenuOpen,
        "w-0": !isMenuOpen,
        "h-0": !isMenuOpen,
        "opacity-0": !isMenuOpen
    });

    return <>
        <nav className="flex sm:hidden px-4 py-4 flex-row">
            <div className="flex items-center">
                <Link href="/" className={clsx(titleItemCls, "text-2xl")}>
                    Oleksii Popov
                </Link>
            </div>
            <div className="flex flex-row grow justify-end text-lg">
                <button data-collapse-toggle="navbar-default" type="button" onClick={handleMenuClick}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
        </nav>
        <div className={menuCls}>
            <a className="fixed top-0 right-3 hover:text-amber-500 text-7xl font-semibold duration-200 cursor-pointer bg-white"
               onClick={handleMenuClick}>&times;</a>
            <div className="flex grow-0 px-4 py-4">
                <Link href="/" className={clsx(titleItemCls, "text-2xl")}>
                    Oleksii Popov
                </Link>
            </div>
            <div className="flex flex-col grow justify-center text-center text-xl font-light space-y-9">
                <Link href="/blog" className={itemCls}>
                    Blog
                </Link>
                <Link href="/portfolio" className={itemCls}>
                    Portfolio
                </Link>
                <Link href="/resume" className={itemCls}>
                    CV
                </Link>
                <Link href="/contact" className={itemCls}>
                    Contact
                </Link>
            </div>
        </div>
    </>;
}

export default NavMenuMobile;
