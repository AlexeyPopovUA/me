import Link from "next/link";

const footerLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
    { href: "/social-profiles", label: "Social Profiles" },
];

const Footer = () => (
    <footer className="print:hidden flex flex-col items-center text-center p-8 border-t border-border">
        <nav className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
        <div className="mb-1 text-muted-foreground">Developed by Oleksii Popov</div>
        <div className="text-muted-foreground">{new Date().getFullYear()}</div>
    </footer>
);

export default Footer;
