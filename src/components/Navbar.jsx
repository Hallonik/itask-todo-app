import React from 'react'

const Navbar = () => {
  return (
    <div>
         <nav className='flex justify-between bg-slate-700 text-white p-4 items-start w-full'>
            <div className="logo">
                <span className='font-bold text-xl mx-8 text-[30px]'>iTask</span>
            </div>
            <ul className="flex gap-10  justify-evenly  ">
                <li className='cursor-pointer font-semibold  xl:hover:font-bold transition-all duration-100 mx-auto w-20'>Home</li>
                <li className='cursor-pointer font-semibold xl:hover:font-bold transition-all duration-100 mx-auto w-20'>Your Tasks</li>
                <li className='cursor-pointer font-semibold xl:hover:font-bold transition-all duration-100 mx-auto w-20 hidden md:block '>About</li>
                <li className='cursor-pointer font-semibold xl:hover:font-bold transition-all duration-100 mx-auto w-[90px] hidden md:block'>Contact Us</li>

            </ul>
         </nav>
    </div>
  )
}

export default Navbar