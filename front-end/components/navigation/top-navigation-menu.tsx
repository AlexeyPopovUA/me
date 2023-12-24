import NavMenu from "@/components/navigation/nav-menu";
import NavMenuMobile from "@/components/navigation/nav-menu-mobile";

const menuItems = [
    {
        title: "Blog",
        link: "/blog"
    }, {
        title: "Portfolio",
        link: "/portfolio"
    }, {
        title: "Resume",
        link: "/resume"
    }, {
        title: "Contact",
        link: "/contact"
    },
];

const TopNavigationMenu = () =>
    <>
        <NavMenu items={menuItems}/>
        <NavMenuMobile items={menuItems}/>
    </>;

export default TopNavigationMenu;
