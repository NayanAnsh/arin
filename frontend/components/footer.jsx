import Image from 'next/image'
import React from 'react'
import facebookLogo from '../src/assets/facebookLogo.webp'
import twitter from '../src/assets/twitter.webp'
import pintrest from '../src/assets/pintrestlogo.webp'
import instagram from '../src/assets/instagram.webp'
import mail from '../src/assets/maillogo.webp'
import footer_img from '../src/assets/footer_logo.webp'
const Footer = () => {
  return (
   
    <div className='footer  mt-auto    bottom-0 flex flex-row sm:grid sm:grid-flow-col  sm:justify-between  w-full  '>
        <div className="  sm:border-r-2 border-white border-opacity-50  " >
        <Image  src={footer_img} className=' mx-auto my-auto h-36 w-36 sm:h-36  p-3 ' alt="" />
        </div>
        <div className = 'flex sm:hidden mx-auto flex-col sm:flex-row ' >
         
          <p className="uppercase text-white mx-auto mt-2" >CONTACT</p>
          <div className=' flex   sm:flex-row  h-24 sm:h-32  space-x-2 sm:mr-4 sm:space-x-4 border-l-2 border-white border-opacity-50    my-auto'>
            
            <Image src={facebookLogo} className=" ml-2 my-auto sm:ml-10 icons  rounded-full " alt="" />
            <Image  src={twitter} className=" my-auto icons rounded-full" alt="" />
            <Image  src={pintrest} className=" my-auto hidden sm:block icons rounded-full " alt="" />
            <Image  src={instagram} className=" my-auto icons rounded-full" alt="" />
            <Image  src={mail}className=" my-auto icons hidden sm:block rounded-full" alt="" />
            </div>
        </div>

        <p className=" hidden sm:block  uppercase text-white mx-auto mt-2" >CONTACT</p>
        <div className='  hidden   sm:flex-row sm:flex  h-24 sm:h-32  space-x-2 sm:mr-4 sm:space-x-4 border-l-2 border-white border-opacity-50    my-auto'>
            
        <Image src={facebookLogo} className=" ml-2 my-auto sm:ml-10 icons  rounded-full " alt="" />
            <Image  src={twitter} className=" my-auto icons rounded-full" alt="" />
            <Image  src={pintrest} className=" my-auto hidden sm:block icons rounded-full " alt="" />
            <Image  src={instagram} className=" my-auto icons rounded-full" alt="" />
            <Image  src={mail}className=" my-auto icons hidden sm:block rounded-full" alt="" />
        </div>
        
        
    </div>

    
    
  )
}

export default Footer