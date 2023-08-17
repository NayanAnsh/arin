import Image from 'next/image'
import React from 'react'
// import facebookLogo from './resources/facebookLogo.jpg'
// import twitter from './resources/twitter.jpg'
// import pintrest from './resources/pintrestlogo.jpg'
// import instagram from './resources/instagram.jpg'
// import mail from './resources/maillogo.jpg'
// import footer_img from './resources/footer_logo.png'
const Footer = () => {
  return (
   
    <div className='footer  mt-auto    bottom-0 flex flex-row sm:grid sm:grid-flow-col  sm:justify-between  w-full  '>
        <div className="  sm:border-r-2 border-white border-opacity-50  " >
        <Image width={144} height={144} src="/assets/footer_logo.png" className=' mx-auto my-auto h-36 sm:h-32 p-3   ' alt="" />
        </div>
        <div className = 'flex sm:hidden mx-auto flex-col sm:flex-row ' >
         
          <p className="uppercase text-white mx-auto mt-2" >CONTACT</p>
          <div className=' flex   sm:flex-row  h-24 sm:h-32  space-x-2 sm:mr-4 sm:space-x-4 border-l-2 border-white border-opacity-50    my-auto'>
            
            <Image width={30} height={30} src="/assets/facebookLogo.jpg" className=" ml-2 my-auto sm:ml-10 icons  rounded-full " alt="" />
            <Image width={30} height={30} src="/assets/twitter.jpg" className=" my-auto icons rounded-full" alt="" />
            <Image width={30} height={30} src="/assets/pintrestlogo.jpg" className=" my-auto hidden sm:block icons rounded-full " alt="" />
            <Image width={30} height={30} src="/assets/instagram.jpg" className=" my-auto icons rounded-full" alt="" />
            <Image width={30} height={30} src="/assets/maillogo.jpg" className=" my-auto icons hidden sm:block rounded-full" alt="" />
            </div>
        </div>

        <p className=" hidden sm:block  uppercase text-white mx-auto mt-2" >CONTACT</p>
        <div className='  hidden   sm:flex-row sm:flex  h-24 sm:h-32  space-x-2 sm:mr-4 sm:space-x-4 border-l-2 border-white border-opacity-50    my-auto'>
            
            <Image width={30} height={30} src="/assets/facebookLogo.jpg"  className=" ml-2 my-auto sm:ml-10 icons  rounded-full " alt="" />
            <Image width={30} height={30} src="/assets/twitter.jpg" className=" my-auto icons rounded-full" alt="" />
            <Image width={30} height={30} src="/assets/pintrestlogo.jpg" className=" my-auto hidden sm:block icons rounded-full " alt="" />
            <Image width={30} height={30} src="/assets/instagram.jpg" className=" my-auto icons rounded-full" alt="" />
            <Image width={30} height={30} src="/assets/maillogo.jpg" className=" my-auto icons hidden sm:block rounded-full" alt="" />
        </div>
        
        
    </div>

    
    
  )
}

export default Footer