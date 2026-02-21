import React from "react";

type FooterColumnProps={
    key:string;
    title:string;
    children:React.ReactNode
}


const FooterColumn=({key,title,children}:FooterColumnProps)=>{
    return(
        <div className="flex flex-col gap-5">
            <h4 className="text-[18px] font-bold whitespace-nowrap">{title}</h4>
            {children}
        </div>
    )
}

export default FooterColumn