"use client";

import {useCallback, useState} from "react";
import {clsx} from "clsx";
import Link from "next/link";

const itemCls = "select-none hover:text-amber-500 duration-200";
const titleItemCls = "select-none rounded-md leading-none no-underline outline-none text-2xl";

const NavMenuMobile = ({items}: { items: { title: string; link: string; }[] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuClick = useCallback(() => {
        setIsMenuOpen(open => !open);
    }, []);

    const menuCls = clsx("fixed sm:hidden top-0 bottom-0 right-0 z-90 flex flex-col justify-center items-center bg-white duration-500 z-50", {
        "left-[-40px]": !isMenuOpen,
        "w-screen": isMenuOpen,
        "h-screen": isMenuOpen,
        "opacity-100": isMenuOpen,
        "w-0": !isMenuOpen,
        "h-0": !isMenuOpen,
        "opacity-0": !isMenuOpen
    });

    return <>
        <nav className="flex sm:hidden p-4 flex-row">
            <div className="flex items-center">
                <Link href="/" className={clsx(titleItemCls)}>
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
            <div className="flex flex-row w-full items-center justify-center h-1/4">
                <Link href="/" className={clsx(titleItemCls, "block", "flex", "flex-col", "items-center")}
                      onClick={handleMenuClick}>
                    <div className="text-2xl mb-2">Oleksii Popov</div>
                    <div className="text-xl text-gray-500">Software development blog</div>
                </Link>
            </div>
            {isMenuOpen ?
                <a className="fixed top-4 right-4 mr-4 flex-none hover:text-amber-500 text-5xl font-semibold duration-200 cursor-pointer bg-white"
                   onClick={handleMenuClick}>&times;</a> : null}

            <div className="flex flex-col grow justify-center text-center text-xl font-light space-y-9">
                {items.map(item => (
                    <Link href={item.link} key={item.title} className={itemCls}
                          onClick={handleMenuClick}>{item.title}</Link>
                ))}
            </div>
        </div>
    </>;
}

export default NavMenuMobile;
