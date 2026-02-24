'use client';

interface PropType{
    id:string,
    imgSrc:string,
    service_name:string,
    svg_icon:string,
    amount_of_people:number
}
import { useEffect, useState } from 'react';
import { service_image_boards } from '../../constants/navbarindex'
import './component_animations/global.css'
import Image from 'next/image'
const ServiceBoard=()=>{
    const [slides,setSlides]=useState([]);
    useEffect(()=>{
        setSlides([...service_image_boards,...service_image_boards])
    },[])
    return(
        <div className='my-8'>
            <h2 className="text-2xl text-center items-center justify-center font-bold">Our Services</h2>
            <p className="mt-2 text-center text-gray-600 items-center justify-center">Some descriptive text or call to action.</p>
            <section className=" 2xl:mx-auto 2xl:max-w-360 relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
                <div className="hide-scrollbar flex h-85 w-full items-start justify-start gap-8 overflow-hidden lg:h-100 xl:h-160">
                    {slides.map((board)=>(
                        <div key={board.id} className="relative h-full flex flex-col w-full min-w-275 bg-cover bg-no-repeat board_auto_scroll_left">
                            <img 
                                src={board.imgSrc}
                                alt="background"
                                className="lg:rounded-4xl 2xl:rounded-2xl sm:rounded-sm"
                            />
                            <div  className="absolute inset-0 flex h-full flex-col items-start justify-start p-6 lg:px-9 lg:py-10">  
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-green-500 p-4">
                                        <Image src={board.svg_icon as string}  alt="logo" width={28} height={28} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[18px] font-bold text-white">{board.service_name}</h4>
                                        <p className="text-[14px] font-normal text-white">Wellness Spa</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="flex -space-x-4 overflow-hidden">
                                            {/* avatars can go here */}
                                    </span>
                                    <p className="text-[16px] font-bold text-white md:text-[20px]">
                                        {board.amount_of_people}+ Joined
                                    </p>
                                </div>
                    
                            </div>    
                        </div>
                    ))}
                </div>
                <div className=" flex items-end justify-end mt-10 px-6 lg:-mt-60 lg:mr-6">
                    <div className=" bg-amber-300 p-8 lg:max-w-125 xl:max-w-183.5 xl:rounded-5xl xl:px-16 xl:py-20 relative w-full overflow-hidden rounded-3xl">
                        <h2  className=" text-[24px] font-normal md:text-[32px] md:font-normal 2xl:text-[64px] 2xl:font-normal 2xl:leading-[120%] capitalize text-white">
                            <strong>Feeling Lost</strong>
                        </h2>
                        <p className="text-[14px] font-normal xl:text-[16px] xl:font-normal mt-5 text-white">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut
                            assumenda excepturi exercitationem quasi. In deleniti eaque aut
                            repudiandae et a id nisi.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServiceBoard