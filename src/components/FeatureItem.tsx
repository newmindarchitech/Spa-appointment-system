import Image from "next/image";

interface FeatureType{
    key:string;
    title: string;
    icon: string;
    description: string;
}

const FeatureItem=({key,title, icon, description}:FeatureType)=>{
    return(
        <li className=" flex w-full flex-1 flex-col items-start">
            <div className=" rounded-full p-4 lg:p-7 bg-green-400">
                <Image src={icon} alt="map" width={28} height={28}/>
            </div>
            <h2 className=" text-[20px] font-bold leading-[120%] lg:text-[32px] lg:font-bold lg:leading-[120%] mt-5 capitalize">
                {title}
            </h2>
            <p className=" text-[16px] font-normal mt-5  text-gray-500 lg:mt-7.5">
                {description}
            </p>
        </li>
    )
}

export default FeatureItem