

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
 import otherImg from "../../src/assets/others.webp"
const metafile = require("../../src/meta/home.json");
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
        let metaData;
        let ogImage ="";
        if(tag==="lifestyle"){
            headImage=(lifestyleImg);
            metaData = metafile.lifestyle;
            ogImage = "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693076889/aarin/it4bh1wv9alk4zblxjqh.jpg"
        }else if(tag==="beauty"){
            headImage=(beautyImg);
            metaData = metafile.beauty;
            ogImage = "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693075502/aarin/beauty.jpg"
        }else if(tag==="foods"){
            headImage=(foodImg);
            metaData = metafile.foods;
            ogImage = "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693077056/WhatsApp_Image_2023-08-27_at_00.40.32_uuryfq.jpg"
        }else if(tag==="books"){
            headImage=(booksImg);
            metaData = metafile.books;
            ogImage = "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693077547/WhatsApp_Image_2023-08-27_at_00.48.25_vnwqta.jpg"
        }else if(tag==="fashion"){
            headImage=(fashionImg);
            metaData = metafile.fashion;
            ogImage = "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693076998/WhatsApp_Image_2023-08-27_at_00.22.30_mt0uda.jpg"
        }else if(tag==="travel"){
            headImage=(travelImg);
            metaData = metafile.travel;
            ogImage = "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693078030/aarin/wcslager4m3ebiahzpwi.jpg"
        }else if(tag === "others"){
            headImage = otherImg;
            metaData = metafile.other;
            ogImage ="https://res.cloudinary.com/dqxuucjcd/image/upload/v1693078577/aarin/g8icgraebhcnqihlvlsd.jpg"
        }
            
        
         
        
        return ({
            props:{postsData,headImage,metaData,ogImage},revalidate: 600
        })
     
 }
 export async function getStaticPaths(){
   const pages = ["lifestyle","travel","beauty","foods","books","fashion","others"]
    const paths = pages.map((page) => ({
        params: { tag: page },
      }))
    return { paths, fallback: false }
 }

export default function Posts({postsData,headImage,metaData,ogImage}){





    return(
        
        <Root>
        <div  >
            <Head>
            
            <title>{metaData.title  }</title>
           
            <meta name='description' content={metaData.metades} />
            <meta name="keywords" content={metaData.keywords} />

            <meta name="twitter:card" content="summary"></meta>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="blog" />
            <meta property="og:title" content={metaData.title}/>
            <meta property="og:description" content={metaData.Metades}/>
            <meta property="og:url" content="https://aarin.netlify.app/" />
            <meta property="og:image" content={ogImage ? ogImage : "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693074119/aarin/aarin.png"} />

            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="627" />
        </Head>
            
           
            <Image priority className='md:px-20   h-[150px] mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full  '  src={headImage} alt={metaData.altpic} />
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