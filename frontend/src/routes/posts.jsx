import Card from "../components/Card";
import lifestyleImg from "../components/resources/lifestyle.png"
import allpostsImg from "../components/resources/AllPosts.png"
import beautyImg from "../components/resources/Beauty.png"
import booksImg from "../components/resources/Books.png"
import fashionImg from "../components/resources/Fashion.png"
import travelImg from "../components/resources/Travel.png"
import foodImg from "../components/resources/Food.png"

import { useEffect,useState } from "react";
import { getAllPosts, getPostswithTag } from "../server/blogs";
import { useParams } from "react-router-dom";
import {Helmet} from "react-helmet-async"
import footer_img from '../components/resources/footer_logo.png'
import NoStoryYet from "./NoStoryYet";

export default function Posts(){

    const [postsData,setpostData] = useState([]);
    const [headImage,setHeadImage] = useState([]);
    const {tag} = useParams();
    
    useEffect(()=>{

            if(tag !== "allposts"){
           getPostswithTag(tag).then((posts)=>{
           if(posts.length !=0 ){
           setpostData(posts);
           }else{
            setpostData(["no_posts"]);
            
           }
           if(tag == "lifestyle"){
                setHeadImage(lifestyleImg);
           }else if(tag == "beauty"){
            setHeadImage(beautyImg);
           }else if(tag == "foods"){
                    setHeadImage(foodImg);
           }else if(tag == "books"){
                    setHeadImage(booksImg);
           }else if(tag == "fashion"){
                setHeadImage(fashionImg);
           }else if(tag == "travel"){
                setHeadImage(travelImg);
           }
           
      
        });
    }else if (tag === "allposts" || tag  == ""){
            setHeadImage(allpostsImg);
            getAllPosts().then((posts)=>{
                if(posts.length !=0){
                setpostData(posts);
                }else{
                    setpostData(["no_posts"]);
                    
                }
           
             });
    }
        
    },[tag])
    
    return(
        
        <div >
            <Helmet>
            <title>{"AARIN " + tag  }</title>
            <link rel='icon' href= {footer_img} />
            <meta name='description' content='A blog website about fashion lifestyle beauty food books fashion ' />
            <meta name="keywords" content="lifestyle,travel,beauty,food,books,fashion" />
        </Helmet>
            
       
            <img className='md:px-20  h-[150px] mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full  ' src={headImage} alt="Working" />
            <div className={postsData[0] != "no_posts"? " grid grid-cols-2   sm:grid-cols-3 lg:grid-cols-4 m-2   sm:gap-4": "flex"} >

            { postsData.length != 0 && postsData[0] != "no_posts" ? ( postsData.map((post)=> {
                
            return <Card key={post._id} title={post.title} body = {post.text} tag= {post.tag} nameLink = {post.nameLink} imageSrc= {post.cardimage} id = {post._id} />
        })
        ): postsData[0] == "no_posts"?  <NoStoryYet/> :<h1> Loading...</h1> 
        
        }
        </div>
    </div>
    );

}