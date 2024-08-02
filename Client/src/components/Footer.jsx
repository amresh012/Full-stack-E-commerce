import React from 'react'
import Logo from './reusablesUI/Logo'

const Footer = () => {
  return (
   <footer className='h-[20rem] bg-black w-full text-white'>
    <div className="top-footer">
        <div className="p-4">
            <Logo/>
            <p>KFS FITNESS-
            Adding fuel to every fitness fanatic’s
             passion with the best equipment. Experts in setting home/commercial
              Gyms & CrossFit boxes PAN India</p>
              <p>Kuber Tower, Ajronda, Sec- 20B Faridabad,
              Haryana, India 121002</p>
              <div className=""></div>
        </div>
    </div>
   </footer>
  )
}

export default Footer
