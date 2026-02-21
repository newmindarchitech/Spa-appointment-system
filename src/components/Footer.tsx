import React from "react";
import { FOOTER_LINKS } from "../../constants/navbarindex";
import FooterColumn from "./FooterColumn";
import Link from "next/link";

const Footer=()=>{
    return(
        <footer className="flex items-center justify-center mb-24">
            <div className=" px-6 lg:px-20 3xl:px-0 mx-auto max-w-360 flex w-full flex-col gap-14">
                <div className=" flex flex-col items-start justify-center gap-[10%] md:flex-row">

                </div>

                <div className=" flex flex-wrap gap-10 sm:justify-between md:flex-1">
                    {FOOTER_LINKS.map((columns)=>(
                        <FooterColumn key={columns.title} title={columns.title}>
                            <ul className="text-[14px] font-normal flex flex-col gap-4 text-black">
                                {columns.links.map((link)=>(
                                    <Link href="/" key={link}>
                                        {link}
                                    </Link>
                                ))}
                            </ul>
                        </FooterColumn>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer