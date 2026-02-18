import Image from "next/image"
import { banners } from "../../constants/navbarindex"
import { text } from "stream/consumers";
import Banner from "./Banner";


const Hero=()=>{
    const firstBanner = banners.slice(0,2); // First banner(s)
  const remainingBanners = banners.slice(2,4);
    return(
            <div className="text-center my-8">
                <h2 className="text-2xl font-bold">Promotions of the Week</h2>
                    <p className="mt-2 text-gray-600">Some descriptive text or call to action.</p>
                <div className="banner_spin">
                <section className=" my-16">
                    <div className="flex flex-col lg:flex-row gap-4 w-full h-full  mx-auto px-6">
                        <Banner image={firstBanner[0].imgSrc} content={'SPA & BEAUTY TREATMENT'} percent_drop={20}/>
                        <Banner image={firstBanner[1].imgSrc} content={'THAI MASSAGE CREAMS'} percent_drop={40}/>
                    </div>
                    <section className="my-4">
                        <div className="flex flex-col lg:flex-row gap-4 max-w-400 mx-auto px-6">
                            <Banner image={remainingBanners[0].imgSrc} content={'SPA & BEAUTY TREATMENT'} percent_drop={20}/>
                            <Banner image={remainingBanners[1].imgSrc} content={'THAI MASSAGE CREAMS'} percent_drop={40}/>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}
//Reproducible by inserting Banner component inside section componenets and its required parameters
export default Hero