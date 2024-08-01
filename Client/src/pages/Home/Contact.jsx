import React from 'react'

const Contact = () => {
    return (
        <div className='h-screen flex flex-col gap-12'>
            <div className="contact-header min-h-[50vh] flex items-center bg-black/70 w-full p-4">
                <div className="h-auto flex items-start justify-center flex-col text-white w-1/2 text-[2rem] uppercase bg-white/20 ml-4 backdrop-blur-md p-4">
                    <h1>KFS Fitness Contact us</h1>
                    <p className=' capitalize text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, magnam accusamus sapiente quae delectus!</p>
                </div>
            </div>
            {/* form section */}
            <div className="flex items-center justify-around gap-12 p-12">
                <div className="w-1/2 py-12">
                 <div className="inner_child ">
                    <div className="heading p-4">
                        <h1 className='text-[3rem] pt-12'>We are here to help you! To Setup your Dream Gym</h1>
                        <p className='leading-8 text-xl'>Are you dreaming of owning your own gym? Let us help you turn that dream into a reality. Our expert team can assist with everything from equipment selection to installation and setup. Contact us today to get started!</p>
                    </div>
                    <div className="body flex gap-2 leading-10  flex-wrap">
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Visit-Us at:</h1>
                            <span className='w-24 h-2 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Kuber Tower, Ajronda, Sec- 20B 
                            Faridabad,
                            Haryana, India 121002
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Opening Hours:</h1>
                            <span className='w-20 h-1 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Kuber Tower, Ajronda, Sec- 20B 
                            Faridabad,
                            Haryana, India 121002
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Reach-Us at:</h1>
                            <span className='w-24 h-2 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Kuber Tower, Ajronda, Sec- 20B 
                            Faridabad,
                            Haryana, India 121002
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Follow-us On:</h1>
                            <span className='w-24 h-2 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Kuber Tower, Ajronda, Sec- 20B 
                            Faridabad,
                            Haryana, India 121002
                            </p>
                        </div>
                    </div>
                 </div>
                </div>






















                {/* form section */}
                <div className="w-1/2 p-2 bg-gray-100 space-y-12">
                  <div className="flex items-start mx-12 justify-around flex-col">
                  <h3 className='text-3xl text-center relative p-2'>Leave Us Your Message</h3>
                  <span className='h-2 w-12 bg-red-500 rounded-md mx-2'></span>
                  </div>
                    <div class="container">
                       <form>

                       </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
