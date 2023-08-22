// import Card from "../components/Card";
// import lifestyleImg from "../components/resources/lifestyle.png"
// import allpostsImg from "../components/resources/AllPosts.png"
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
export async function getServerSideProps(){
            
      
        
            
       
                let postsData;
                let posts =await  getAllPosts()
                
                    if(posts.length !==0){
                        postsData = posts;
                    }else{
                        postsData = ["no_posts"];
                    }
                
                
        
    
        
        return ({
            props:{postsData}
        })
        
     
 }


export default  function Posts({postsData}){

//     const [postsData,setpostData] = useState([]);
//     const [headImage,setHeadImage] = useState([]);
//     
    
//     useEffect(()=>{
        

//             if(tag !== "allposts"){
//            getPostswithTag(tag).then((posts)=>{
//            if(posts.length !==0 ){
//            setpostData(posts);
//            }else{
//             setpostData(["no_posts"]);
            
//            }
           
           
      
//         });
//     }else if (tag === "allposts" || tag ===""){
//             getAllPosts().then((posts)=>{
//                 if(posts.length !==0){
//                 setpostData(posts);
//                 }else{
//                     setpostData(["no_posts"]);
                    
//                 }
           
//              });
//     }
//     if(tag==="lifestyle"){
//         setHeadImage(lifestyleImg);
//    }else if(tag==="beauty"){
//     setHeadImage(beautyImg);
//    }else if(tag==="foods"){
//             setHeadImage(foodImg);
//    }else if(tag==="books"){
//             setHeadImage(booksImg);
//    }else if(tag==="fashion"){
//         setHeadImage(fashionImg);
//    }else if(tag==="travel"){
//         setHeadImage(travelImg);
//    }else if(tag==="allposts"){
//         setHeadImage(allpostsImg);
//    }
        
//     },[tag])
   
    const [headImage,setHeadImage] = useState("/assets/AllPosts.png");
    // const [postsData,setpostData] = useState(["no_posts"]);
    
 
        //console.log("USER DATA - ");
       // console.log(useLoaderData());
     //   const {postsData} = useLoaderData(); 
        
    //<NoStoryYet/>

    return(
        
      
        <Root>
        <div  >
            <Head>
            
            <title>{"AARIN HOME"  }</title>
            <link rel='icon' href= "/assets/footer_logo.png" />
            <meta name='description' content='A blog website about fashion lifestyle beauty food books fashion ' />
            <meta name="keywords" content="lifestyle,travel,beauty,food,books,fashion" />
        </Head>
            
            { headImage ?
            <Image className='md:px-20 transition-all  h-[150px] mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full  ' height={150} width={1000} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"  src={headImage} alt="Working" />
            : <div className='  md:px-20 ease-in transition-all  h-[150px]  mx-auto  mt-4 sm:mt-0 object-cover sm:object-contain  sm:h-auto sm:w-full bg-slate-200   ' /> }       
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

