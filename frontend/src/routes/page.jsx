import { useParams } from "react-router-dom";
import image from "../components/resources/Dummybackground.png"
import { useState,useEffect } from "react";
import facebookLogo from '../components/resources/facebookLogo.jpg'
import twitter from '../components/resources/twitter.jpg'
import instagram from '../components/resources/instagram.jpg'
import footer_img from '../components/resources/footer_logo.png'

import { getPostswithid } from "../server/blogs";
import QuilReader from "../components/quilReader";
import { Helmet } from "react-helmet-async";
export default function Page(){
        
        
    const [postsData,setpostData] = useState([]);
    const {id} = useParams();
   
    useEffect(()=>{
            
           getPostswithid(id).then((posts)=>{
           
           setpostData(posts);
          
      
        });
   
        
    },[id])
    return (
    <div>
        <Helmet>
            <title>{postsData.title}</title>
            <link rel='icon' href= {footer_img} />
            <meta name='description' content={postsData.metaDes} />
            <meta name="keywords" content={postsData.metaTags} />
        </Helmet>
        <div style={{backgroundImage:`url(${postsData.coverimage})`,overflow: 'hidden'}}  className=" page max-w-7xl p-5  relative mx-auto    " >
            <div className=" m-10 mx-auto  bg-white  rounded-xl p-2 max-w-5xl mt-24 sm:mt-52 md:mt-64       " >

                <h1 className=" lg:text-7xl mt-4   text-4xl w-fit mx-auto lg:px-11 px-5   ">{postsData.title}</h1>
                <div className="flex ml-auto my-8 sm:space-x-4 sm:mr-4 w-max flex-row">
                    <img src={facebookLogo} className=" p-1 sm:p-0  my-auto sm:ml-10 icons  rounded-full " alt="" />
                    <img src={twitter} className=" p-1 sm:p-0 my-auto icons rounded-full" alt="" />
                    <img src={instagram} className=" p-1 sm:p-0  sm:mr-8 my-auto icons rounded-full" alt="" />

                </div>
                <QuilReader data ={postsData} />
            </div>
        
        </div>
       
        </div>
    );
   // <img className="  rounded-xl  " src={postsData.coverimage} alt=" No image" />
}
//