import React from 'react'

const Contact = () => {
    return (
        <div className='h-screen flex flex-col gap-12'>
            <div className="contact-header min-h-[50vh] flex items-center bg-black/50 w-full p-4">
                <div className="h-auto flex items-start justify-center flex-col text-white w-1/2 text-[2rem] uppercase bg-white/20 ml-4 backdrop-blur-md p-4">
                    <h1>KFS Fitness Contact us</h1>
                    <p className=' capitalize text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, magnam accusamus sapiente quae delectus!</p>
                </div>
            </div>
            {/* form section */}
            <div className="flex items-center justify-around gap-12">
                <div className="w-1/2"></div>
                {/* form section */}
                <div className="w-1/2 p-2 bg-gray-100 space-y-12">
                  <div className="flex items-start mx-12 justify-around flex-col">
                  <h3 className='text-3xl text-center relative p-2'>Leave Us Your Message</h3>
                  <span className='h-2 w-12 bg-red-500 rounded-md mx-2'></span>
                  </div>
                    <div class="container">
                        <form action="/action_page.php">
                            <label for="fname" className='text-xl'>First Name</label>
                            <input type="text" id="fname" value="John Doe"  name="firstname" placeholder="Your name.." />
{/* 
                            <label for="lname" className='text-xl'>Mobile No</label>
                            <input type="number" id="lname" name="lastname" placeholder="Your last name.." /> */}

                            <label for="country" className='text-xl'>Purpose</label>
                            <select id="country" name="country" className='h-12'>
                                <option value="australia">Gym Equipment</option>
                                <option value="canada">Home Gym</option>
                                <option value="usa">Individual</option>
                            </select>

                            <label for="subject" className='text-xl'>Subject</label>
                            <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"200px"}}></textarea>
                             <div className="p-2 text-xl">
                                <p>Address</p>
                                <div className="flex items-center justify-around">
                                    <div className="">
                                        <label htmlFor="">City</label>
                                        <input type="text" className='h-12'/>
                                    </div>
                                    <div className="">
                                        <label htmlFor="">State</label>
                                        <input type="text" className='h-12'/>
                                    </div>
                                </div>
                             </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
