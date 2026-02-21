

const Achievements=()=>{
    return(
        <div className=" my-8">
            <h2 className="text-2xl text-center items-center justify-center font-bold">Quality of Service</h2>
            <p className="mt-2 text-center text-gray-600 items-center justify-center">Some descriptive text or call to action.</p>

        <section className=" gap-8 m-auto px-20 py-4 text-center grid md:grid-cols-3 items-center justify-center mt-8 ">
            <div className=" px-8 py-4 text-center  rounded-4xl shadow-sm ">
                <h4 className=" text-pink-300 text-7xl font-medium">
                    10+
                </h4>
                <p>
                    Years in Experience
                </p>
            </div>
            <div className=" px-8 py-4 text-center  rounded-4xl shadow-sm ">
                <h4 className=" text-black font-medium text-7xl">
                    500K
                </h4>
                <p>
                   Happy Customers
                </p>
            </div>
            <div className=" px-8 py-4 text-center  rounded-4xl shadow-sm">
                <h4 className=" text-yellow-300 font-medium text-7xl">
                    4.8★
                </h4>
                <p>
                   Overall Ratings
                </p>
            </div>
        </section>
        </div>
    )
}

export default Achievements