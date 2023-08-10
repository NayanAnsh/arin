import React, { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import { AiOutlineClose,AiOutlineMenu } from 'react-icons/ai'
import Footer from './footer';
//import { Link, Outlet, useNavigation,useParams } from 'react-router-dom';
import Link from "next/link";
import { useParams } from 'next/navigation';

import SpinningLoader from './SpinningLoader';
import LoadingScreen from './LoadingScreen';
import Layout from "./Layout"
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Root = ({children,params}) =>{
    const navigation = usePathname();
    const router = useRouter();
    const [menu,setmenu] = useState(false);
    const handlePhoneMenu = (e)=>{
            console.log(e);
            setmenu(!menu);
    } 
    const menuCSSClass = "font-serif font-bold uppercase  nav_items";
    const p =   useParams();
    //{navigation.state === "loading" ? "loading":""}
    console.log("ROUTERR -- "+router.pathname)
    // <div className={navigation.state === "loading" ?'absolute z-10 top-1/2 left-1/2 ':"hidden"} >
    //                         <SpinningLoader/>
    //                     </div>
    return(
        <Layout>
            <div className="flex flex-col min-h-screen">
                <div className="w-full ">
                        <div >
                            <div className=" w-full flex relative flex-row bg-[#FFE3AA]">
                                <div onClick={handlePhoneMenu} className='block absolute top-1/4 right-4 sm:hidden'>
                                { menu ?  <AiOutlineClose size={25} /> :<AiOutlineMenu size={25}/> }

                                </div>
                            <p  className="mx-auto  w-fit text-2xl sm:text-4xl py-3 sm:py-5 font-bold  ">
                                AARIN
                            </p>
                            </div>
                        </div>
                        
                        
                        
                        <nav className=" w-full hidden sm:flex bg-white   justify-between pl-20">
                            <ul className="flex  my-4 " >
                            <li className={(router.pathname == "/" ? "active" : "")+"  font-serif font-bold uppercase   nav_items"} >
                                <Link href={`/`} >
                                All post
                                </Link> 
                                
                                </li>
                            <li className="font-serif font-bold uppercase nav_items" >
                                
                                <Link href={`/home/lifestyle`}  activeclassname={"active"}>
                                lifestyle
                                </Link>
                                
                                
                                </li>
                            <li className="font-serif font-bold uppercase nav_items" >
                            <Link href={`/home/travel`}  activeclassname={"active"}>
                                travel
                                </Link>
                                
                                </li>
                            <li className="font-serif font-bold uppercase nav_items" >
                            <Link href={`/home/beauty`}  activeclassname={"active"}>
                                beauty
                                </Link>
                                </li>
                            <li className="font-serif font-bold uppercase nav_items" >
                            <Link href={`/home/foods`}  activeclassname={"active"}>
                                food
                                </Link>
                                </li>
                            <li className={"font-serif font-bold uppercase nav_items"} >
                            <Link href={`/home/books`}  activeclassname={"active"}>
                                books
                                </Link>
                                </li>
                            <li className="font-serif font-bold uppercase nav_items" >
                            <Link href={`/home/fashion`}  activeclassname={"active"}>
                                fashion
                                </Link>
                                </li>
                            </ul>
                            <FiSearch className='icons my-auto mr-4 bg-[#FFE3AA] p-1 border-black border-2  rounded-full ' />
                            
                        </nav>

                </div>
                    
                    <div className=  "  " >
                        <main>{children}</main>
                    </div>  
                    
                    <div onClick={handlePhoneMenu} className={menu ?"fixed h-full left-0 bg-white top-0 w-[50%] md:w-[30%] border-r border-r-gray-900 ease-in-out duration-500 ":"fixed ease-in-out -left-full  duration-500 "}>
                        <h1 className=' text-3xl font-fold border-b-2 border-black py-2  my-4 text-center' >AARIN</h1>

                        <ul className="flex flex-col ml-4  space-y-4 divide-black my-4" >
                            <li className={(router.pathname == "/" ? "active" : "")+"  font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items"} >
                                <Link href={`/`}  className={router.pathname == "/" ? "active" : ""}>
                                All post
                                </Link> 
                                
                            </li>
                            <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                                
                                <Link href={`/home/lifestyle`}  activeclassname={"active"}>
                                lifestyle
                                </Link>
                                
                                
                                </li>
                            <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                            <Link href={`/home/travel`}  activeclassname={"active"}>
                                travel
                                </Link>
                                
                                </li>
                            <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                            <Link href={`/home/beauty`}  activeclassname={"active"}>
                                beauty
                                </Link>
                                </li>
                            <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                            <Link href={`/home/foods`}  activeclassname={"active"}>
                                food
                                </Link>
                                </li>
                            <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                            <Link href={`/home/books`}  activeclassname={"active"}>
                                books
                                </Link>
                                </li>
                            <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                            <Link href={`/home/fashion`}  activeclassname={"active"}>
                                fashion
                                </Link>
                                </li>
                            </ul>
                    </div>
                    
                    <Footer/>
            </div>
        </Layout>    
    )
}
export default Root;