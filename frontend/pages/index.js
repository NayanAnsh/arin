// import Card from "../components/Card";
// import lifestyleImg from "../components/resources/lifestyle.png"
 import allpostsImg from "../src/assets/AllPosts.webp"
 import allpostsImgPNG from "../src/assets/AllPosts.png"
// import beautyImg from "../components/resources/Beauty.png"
// import booksImg from "../components/resources/Books.png"
// import fashionImg from "../components/resources/Fashion.png"
// import travelImg from "../components/resources/Travel.png"
// import foodImg from "../components/resources/Food.png"
// import LoadingScreen from "../components/LoadingScreen";
import { useEffect,useState } from "react";
import { getAllPosts, getPostswithTag } from "../server/blogs";
//import { useLoaderData } from "react-router-dom";
import {useParams} from 'next/navigation'
import Head from 'next/head';
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen"
import NoStoryYet from "../components/NoStoryYet";
import Image from "next/image";
import Root from "../components/Root";
const metaData = require('../src/meta/index.json')
// export async function getServerSideProps(){

//                 let postsData;
//                 let posts =await  getAllPosts()
                
//                     if(posts.length !==0){
//                         postsData = posts;
//                     }else{
//                         postsData = ["no_posts"];
//                     }

//         return ({
//             props:{postsData}
//         })
        
     
//  }
export async function getStaticProps(){
        let postsData;
        let posts =await  getAllPosts()
        
            if(posts.length !==0){
                postsData = posts;
            }else{
                postsData = ["no_posts"];
            }
    console.log(metaData)
    return ({
    props:{postsData} ,revalidate: 600,
    })

}
//  export async function getStaticPaths(){
//     pages = ["","lifestyle","travel","beauty","food","books","fashion"]
//     const paths = pages.map((post) => ({
//         params: { id: post.id },
//       }))
//     return { paths, fallback: false }
//  }


export default  function Posts({postsData}){

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
      }
    const getOptimizedImageUrl = ({src,width,quality})=>{
        const imageSrc = "https://res.cloudinary.com/dqxuucjcd/image/upload/v1693074119/aarin/aarin.png"
        const pos = getPosition(imageSrc,"/",6)
        const url = imageSrc.substring(0,pos);
        const name = imageSrc.substring(pos);
        const parameters = `/b_auto,c_fill_pad,g_auto,w_${width},q_${quality|| 75}`
        return (url + parameters+ name);
    }
    return(
        
      
        <Root>
        <div  >
            <Head>
            
            <title>{metaData.title  }</title>
           
            <meta name='description' content={metaData.Metades}/>
            <meta name="keywords" content={metaData.Keywords} />

            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="blog" />
            <meta property="og:title" content={metaData.title}/>
            <meta property="og:description" content={metaData.Metades}/>
            <meta property="og:url" content="https://aarin.netlify.app/" />

            <meta property="og:image" content={getOptimizedImageUrl({width:1200})} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="627" />

        </Head>
            
          
            <Image priority={true} className='md:px-20   h-[150px] mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full  ' height={400} width={1000} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"  src={allpostsImg} alt={metaData.altpic} />
             
            <div className={postsData[0] !== "no_posts"? " grid grid-cols-2   sm:grid-cols-3 lg:grid-cols-4 m-2   sm:gap-4": "flex"} >
            
            { postsData.length !== 0 && postsData[0] !== "no_posts" ? ( postsData.map((post)=> {
                
            return <Card key={post._id} title={post.title} cardimagealt = {post.cardimagealt} body = {post.text} tag= {post.tag} nameLink = {post.nameLink} imageSrc= {post.cardimage} id = {post._id} />
        })
        ): postsData[0]==="no_posts"?  <NoStoryYet/>  : <LoadingScreen/>
        
        }
        </div>
    </div>
    </Root>
    );

}

