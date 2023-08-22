

import { useEffect,useState } from "react";

import Root from "../../components/Root";
import Head from "next/head";
import Image from "next/image";
import NoStoryYet from "../../components/NoStoryYet";
import LoadingScreen from "../../components/LoadingScreen";
import { useParams, useRouter } from "next/navigation";
import Card from "../../components/Card";
import { getAllPosts, getPostswithTag } from "../../server/blogs";

export async function getServerSideProps({params}){
            
            const {tag} = params;
           
            console.log("post loader running-" + tag);
            let postsData; 
            if( tag && tag !== "allposts"){
                const posts = await getPostswithTag(tag)
                if(posts.length !==0 ){
                    postsData = posts;
                }else{
                    postsData = ["no_posts"];
                
                }
        
            
        }else {
            console.log("post loader runndsfging-" + tag);
                const posts  =await  getAllPosts()
                
                    if(posts.length !==0){
                        postsData = posts;
                    }else{
                        postsData = ["no_posts"];
                    }
                
                
        }
        const headImage = `/assets/${tag}.png`
        
        return ({
            props:{postsData,headImage}
        })
     
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
            
            { headImage ?
            <Image priority className='md:px-20 transition-all  h-[150px] mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full  ' height={150} width={1000} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"  src={headImage} alt="Working" />
            : <div className='  md:px-20 ease-in transition-all  h-[150px]  mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full bg-slate-200   ' /> }       
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