

import Image from "next/image";
import Link from "next/link";


export default function Card  ({ title,cardimagealt, body, imageSrc,nameLink, tag,id }){
    var tbody;
    if(body){
     tbody = body.slice(0,30) + "..."
    }else{
        tbody = "This is from an old database"
    }
    
    //https://res.cloudinary.com/demo/image/upload/b_auto,c_fill_pad,g_auto,h_400,w_80/lady.jpg
    //http://res.cloudinary.com/dqxuucjcd/image/upload/v1689079120/aarin/b_auto,c_fill_pad,g_auto,h_142,w_114/th00yyc873gmzyyi0zdg.jpg
    var imgurl = imageSrc;
    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
      }
    if(imageSrc ){
        const pos = getPosition(imageSrc,"/",6)
        const url = imageSrc.substring(0,pos);
        const name = imageSrc.substring(pos);
        const parameters = "/b_auto,c_fill_pad,g_auto,h_300,w_300"
        imgurl = url + parameters+ name;
       
    }
    const getOptimizedImageUrl = ({src,width,quality})=>{
        const pos = getPosition(imageSrc,"/",6)
        const url = imageSrc.substring(0,pos);
        const name = imageSrc.substring(pos);
        const parameters = `/b_auto,c_fill_pad,g_auto,w_${width},q_${quality|| 75}`
        return (url + parameters+ name);
    }
    //loader={()=>imgurl}
    //aspect-[1.33]
    console.log(cardimagealt)
    return (
    
    
<div className="md:max-w-xs max-w-[200px] m-4 sm:m-8 drop-shadow-[5px_5px_3.5px_rgba(0,0,0,0.15)] bg-white  border-[#FFE3AA] rounded-[20px] border-2 border-solid  " >
    <Link href={ nameLink  ? `/page/${nameLink}/${id}` :`/page/blog/${id}`}>
    <div className="p-1" >
    <Image width={300} height={300} sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 10vw" src={"none"} loader={getOptimizedImageUrl} className="rounded-[20px]   w-10/12 my-2 sm:my-0 mx-auto  sm:w-full "  alt={cardimagealt || "AARIN"} />

    </div>
    <div className=" p-2 sm:p-5">
        
            <h2 className=" mb-2  md:text-lg   text-base font-semibold tracking-tight text-[#404040] ">{title}</h2>
        
        <p className="mb-3 font-thin md:text-base text-sm  text-gray-700 dark:text-gray-400">{tbody}</p>
        <p  className="inline-flex p-2 px-2  sm:w-auto sm:h-auto items-center sm:px-3 sm:py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span>{tag}</span>
            <svg aria-hidden="true" className=" w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
        </p>
    </div>
    </Link>
</div>

    
  );
};