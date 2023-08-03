import React, { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import { AiOutlineClose,AiOutlineMenu } from 'react-icons/ai'
import Footer from './footer';
import { NavLink, Navigate, Outlet, redirect, useNavigation,useParams } from 'react-router-dom';
import SpinningLoader from './SpinningLoader';
import LoadingScreen from './LoadingScreen';


const Root = () =>{
    const navigation = useNavigation();
    const [menu,setmenu] = useState(false);
    const handlePhoneMenu = (e)=>{
            console.log(e);
            setmenu(!menu);
    } 
    const menuCSSClass = "font-serif font-bold uppercase  nav_items";
    const p =   useParams();
    //{navigation.state === "loading" ? "loading":""}
    console.log()
    return(
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
            
            
            
            <nav className=" w-full hidden sm:flex  bg-white  justify-between pl-20">
                <ul className="flex my-4" >
                <li className="font-serif  font-bold uppercase nav_items  " >
                    <NavLink to={`/`} className={({isActive,isPending})=>
                        (isActive? "active": "") + " no-underline"
                    }>
                    All post
                    </NavLink> 
                    
                    </li>
                <li className="font-serif font-bold uppercase nav_items" >
                    
                    <NavLink to={`/home/lifestyle`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    lifestyle
                    </NavLink>
                    
                    
                    </li>
                <li className="font-serif font-bold uppercase nav_items" >
                <NavLink to={`/home/travel`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    travel
                    </NavLink>
                    
                    </li>
                <li className="font-serif font-bold uppercase nav_items" >
                <NavLink to={`/home/beauty`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    beauty
                    </NavLink>
                    </li>
                <li className="font-serif font-bold uppercase nav_items" >
                <NavLink to={`/home/foods`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    food
                    </NavLink>
                    </li>
                <li className={"font-serif font-bold uppercase nav_items"} >
                <NavLink to={`/home/books`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    books
                    </NavLink>
                    </li>
                <li className="font-serif font-bold uppercase nav_items" >
                <NavLink to={`/home/fashion`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    fashion
                    </NavLink>
                    </li>
                </ul>
                <FiSearch className='icons my-auto mr-4 bg-[#FFE3AA] p-1 border-black border-2  rounded-full ' />
                
            </nav>

    </div>
        
        <div className=  {navigation.state === "loading" ? "  relative opacity-25 transition-opacity delay-200 ":" "} >
            <div className={navigation.state === "loading" ?'absolute z-10 top-1/2 left-1/2 ':"hidden"} >
                <SpinningLoader/>
            </div>
            
            

            
            <Outlet/>
        </div>  
        
        <div onClick={handlePhoneMenu} className={menu ?"fixed h-full left-0 bg-white top-0 w-[50%] md:w-[30%] border-r border-r-gray-900 ease-in-out duration-500 ":"fixed ease-in-out -left-full  duration-500 "}>
            <h1 className=' text-3xl font-fold border-b-2 border-black py-2  my-4 text-center' >AARIN</h1>

            <ul className="flex flex-col ml-4  space-y-4 divide-black my-4" >
                <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                    <NavLink to={`/allposts`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    All post
                    </NavLink> 
                    
                </li>
                <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                    
                    <NavLink to={`/lifestyle`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    lifestyle
                    </NavLink>
                    
                    
                    </li>
                <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                <NavLink to={`/travel`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    travel
                    </NavLink>
                    
                    </li>
                <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                <NavLink to={`/beauty`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    beauty
                    </NavLink>
                    </li>
                <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                <NavLink to={`/foods`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    food
                    </NavLink>
                    </li>
                <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                <NavLink to={`/books`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    books
                    </NavLink>
                    </li>
                <li className="font-serif font-bold uppercase  border-slate-400 border-spacing-2 border-b-2 p-2 nav_items" >
                <NavLink to={`/fashion`} className={({isActive,isPending})=>
                        isActive? "active": ""
                    }>
                    fashion
                    </NavLink>
                    </li>
                </ul>
        </div>
        
        <Footer/>
</div>
    )
}
export default Root;