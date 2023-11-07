import Link from "next/link";
import {clsx} from "clsx";

const itemCls = "select-none rounded-md py-3 px-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground";
const titleItemCls = "select-none rounded-md leading-none no-underline outline-none";

const NavMenu = () => (
    <nav className="hidden sm:flex px-4 py-4 flex-row">
        <div className="flex items-center">
            <Link href="/" className={clsx(titleItemCls, "text-2xl")}>
                Oleksii Popov
            </Link>
        </div>
        <div className="flex flex-row grow justify-end text-lg">
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
    </nav>
);

export default NavMenu;
