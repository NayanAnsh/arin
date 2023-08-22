

import { useEffect,useState } from "react";

import Root from "../../components/Root";
import Head from "next/head";
import Image from "next/image";
import NoStoryYet from "../../components/NoStoryYet";
import LoadingScreen from "../../components/LoadingScreen";
import { useParams, useRouter } from "next/navigation";
import Card from "../../components/Card";
import { getAllPosts, getPostswithTag } from "../../server/blogs";
 import beautyImg from "../../src/assets/beauty.webp"
 import booksImg from "../../src/assets/books.webp"
import fashionImg from "../../src/assets/fashion.webp"
 import travelImg from "../../src/assets/travel.webp"
 import foodImg from "../../src/assets/foods.webp"
 import lifestyleImg from "../../src/assets/lifestyle.webp"
// import LoadingScreen from "../components/LoadingScreen";
export async function getStaticProps({params}){
            
            const {tag} = params;
           
            console.log("post loader running-" + tag);
            let postsData; 
            
                const posts = await getPostswithTag(tag)
                if(posts.length !==0 ){
                    postsData = posts;
                }else{
                    postsData = ["no_posts"];
                
                }
        let  headImage;
        if(tag==="lifestyle"){
            headImage=(lifestyleImg);
        }else if(tag==="beauty"){
            headImage=(beautyImg);
        }else if(tag==="foods"){
            headImage=(foodImg);
        }else if(tag==="books"){
            headImage=(booksImg);
        }else if(tag==="fashion"){
            headImage=(fashionImg);
        }else if(tag==="travel"){
            headImage=(travelImg);
        }
            
        
         
        
        return ({
            props:{postsData,headImage}
        })
     
 }
 export async function getStaticPaths(){
   const pages = ["lifestyle","travel","beauty","foods","books","fashion"]
    const paths = pages.map((page) => ({
        params: { tag: page },
      }))
    return { paths, fallback: false }
 }

export default function Posts({postsData,headImage}){





    return(
        
        <Root>
        <div  >
            <Head>
            
            <title>{"AARIN "  }</title>
            <link rel='icon' href= "/assets/footer_logo.png" />
            <meta name='description' content='A blog website about fashion lifestyle beauty food books fashion ' />
            <meta name="keywords" content="lifestyle,travel,beauty,food,books,fashion" />
        </Head>
            
           
            <Image priority className='md:px-20   h-[150px] mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full  '  src={headImage} alt="Working" />
            <div className={postsData[0] !== "no_posts"? " grid grid-cols-2   sm:grid-cols-3 lg:grid-cols-4 m-2   sm:gap-4": "flex"} >
            
            { postsData.length !== 0 && postsData[0] !== "no_posts" ? ( postsData.map((post)=> {
                
            return <Card key={post._id} title={post.title} body = {post.text} tag= {post.tag} nameLink = {post.nameLink} imageSrc= {post.cardimage} cardimagealt = {post.cardimagealt} id = {post._id} />
        })
        ): postsData[0]==="no_posts"?  <NoStoryYet/>  : <LoadingScreen/>
        
        }
        </div>
    </div>
    </Root>
    );

}