import { FEATURES } from "../../constants/navbarindex"
import FeatureItem from "./FeatureItem"


const Features=()=>{
    return(
        <section className="flex-col flex items-center justify-center overflow-hidden py-24 ">
            <div className=" relative ">
                <h2 className=" text-[40px] font-bold leading-[120%] lg:text-[64px] lg:font-bold lg:leading-[120%]">Our Features</h2>
            </div>
            <div className=" mx-auto max-w-360 px-6 lg:px-20 2xl:px-0 relative w-full flex justify-end mt-16">
                <div className=" z-20 flex w-full flex-col lg:w-[60%]">
                    
                </div>
                <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:m-20 lg:gap-20">
                    {FEATURES.map((feature)=>(
                        <FeatureItem key={feature.title} title={feature.title} icon={feature.icon} description={feature.description}/>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Features