import { promotion_banners } from "../../constants/navbarindex"
import Banner from "./Banner";


const Hero=()=>{
    const firstBanner = promotion_banners.slice(0,2); // First banner(s)
  const remainingBanners = promotion_banners.slice(2,4);
    return(
        <div className="my-8">
            <h2 className="text-2xl text-center items-center justify-center font-bold">Promotions of the Week</h2>
            <p className="mt-2 text-center text-gray-600 items-center justify-center">Some descriptive text or call to action.</p>
            <div className="promotions_fade">
                <section className=" my-16">
                    <div className="flex flex-col lg:flex-row gap-4 max-w-400  mx-auto px-6">
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