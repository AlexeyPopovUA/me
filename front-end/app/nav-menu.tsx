import Link from "next/link";

const itemCls = "select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

const NavMenu = () => (
    <nav className="px-4 py-4">
        <Link href="/" className={itemCls}>
            Oleksii Popov
        </Link>
        <Link href="/blog" className={itemCls}>
            Blog
        </Link>
        <Link href="/portfolio" className={itemCls}>
            Portfolio
        </Link>
        <Link href="/contact" className={itemCls}>
            Contact
        </Link>
    </nav>
);

export default NavMenu;
