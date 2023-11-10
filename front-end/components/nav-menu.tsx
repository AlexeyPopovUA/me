import Link from "next/link";
import {clsx} from "clsx";

const itemCls = "select-none rounded-md py-3 px-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground";
const titleItemCls = "select-none rounded-md leading-none no-underline outline-none";

const NavMenu = ({items}: { items: { title: string; link: string; }[] }) => (
    <nav className="hidden sm:flex p-4 flex-row">
        <div className="flex items-center">
            <Link href="/" className={clsx(titleItemCls, "text-2xl")}>
                Oleksii Popov
            </Link>
        </div>
        <div className="flex flex-row grow justify-end text-lg">
            {items.map(item => (
                <Link href={item.link} key={item.title} className={itemCls}>{item.title}</Link>
            ))}
        </div>
    </nav>
);

export default NavMenu;
