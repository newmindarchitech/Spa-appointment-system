const Banner=({image,content,percent_drop})=>{
    return(
        <div className=" relative w-full h-87.5 flex justify-center items-center">
            <img src={image} alt="" className="absolute h-full top-0 z-10 object-cover"/>
            <div className=" border border-white z-20 w-[90%] h-full mx-auto">
                <div className=" absolute pl-12 flex flex-col items-baseline justify-center h-full">
                    <h4 className=" text-yellow-400 lg:text-[40px] font-extrabold ">{percent_drop}%</h4>
                    <h3 className=" lg:text-[40px] uppercase font-bold pb-4 w-4/5">{content}</h3>
                    <a href='/services' className="btn btn-soft btn-success ">Book Now</a>
                </div>
            </div>
        </div>
    )
}

export default Banner