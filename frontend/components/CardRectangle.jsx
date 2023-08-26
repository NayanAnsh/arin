import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CardRectangle = ({ title,cardimagealt, body, imageSrc,nameLink, tag,id }) => {
    var imgurl = imageSrc;
    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
      }
    const getOptimizedImageUrl = ({src,width,quality})=>{
        const pos = getPosition(imageSrc,"/",6)
        const url = imageSrc.substring(0,pos);
        const name = imageSrc.substring(pos);
        const parameters = `/b_auto,c_fill_pad,g_auto,w_${width},q_${quality|| 75}`
        return (url + parameters+ name);
    }
    //        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt=""/>

    return (
    <div className="   m-4 sm:m-8 drop-shadow-[5px_5px_3.5px_rgba(0,0,0,0.15)] bg-white  border-[#FFE3AA] rounded-[20px] border-2 border-solid  "  >
 
    <Link href={ nameLink  ? `/page/${nameLink}/${id}` :`/page/blog/${id}`} class="flex flex-col items-center  rounded-[20px]   sm:flex-row md:max-w-xl ">
        <Image width={300} height={300}  src={"none"} loader={getOptimizedImageUrl} className="object-cover rounded-[20px]  rounded-t-lg w-[60vh] md:h-max p-2  md:w-48 md:rounded-none md:rounded-l-lg "  alt={cardimagealt || "AARIN"} />

        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 ">{title}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{body}</p>
        </div>
    </Link>

    </div>
  )
}

export default CardRectangle