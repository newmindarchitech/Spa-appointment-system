import { ArrowDown, HamburgerIcon, MenuIcon, MoveDown } from "lucide-react";
import Link from "next/link";
import { Nav_Links } from "../../constants/navbarindex";
import Image from "next/image";

export default function Navbar(){

    return(
        <div className=" drawer">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col ">
                <div className="navbar bg-base-300 w-full">
                    <Image src='/App_Logo.svg' alt="Logo" width={74} height={29} className=" items-start justify-baseline"></Image>
                    <div className="mx-2 flex-2 px-2">Wellness Spa</div>
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn drawer-button btn-ghost lg:hidden">
                        <MenuIcon></MenuIcon>
                        </label>
                        
                    </div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal hidden h-full gap-12 lg:flex">
                            {Nav_Links.map((link) => (
                                <li key={link.key} className="items-center justify-center cursor-pointer transition-all hover:font-bold">
                                  <Link href={link.href} passHref>
                                    {link.label}
                                  </Link>
                                </li>
                            ))}
                            <Link href='/auth/user/login'>
                                <button className=" items-center justify-center btn btn-neutral btn-outline" title="Login">Login</button>
                            </Link>
                        </ul>
                    </div>
                     
                </div>
                
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
                    <ul className=" steps steps-vertical menu bg-base-200 min-h-full w-80 p-4  grow">
                        {Nav_Links.map((link) => (
                            <li key={link.key} className="step cursor-pointer transition-all hover:font-bold">
                                <Link href={link.href} passHref>   
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className=" step cursor-pointer transition-all hover:font-bold">
                            <Link href='/auth/user/login'>
                                Login
                            </Link>
                        </li>
                    </ul>
                </label>
            </div>
        </div>
    )
}