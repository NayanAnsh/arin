

import Head from "next/head";
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

import { getAllPaths, getPostswithTag, getPostswithTagWithQuantity, getPostswithid, getPostswithnameLink } from "../../../server/blogs";
import Root from "../../../components/Root";
import Image from "next/image";
import Script from "next/script";
import { GroupType } from "quill-delta-to-html";
import faceBookImage from "../../../src/assets/facebookLogo.webp"

import twitter from '../../../src/assets/twitter.webp'
import instagram from '../../../src/assets/instagram.webp'
import Card from "../../../components/Card";
import CardRectangle from "../../../components/CardRectangle";
export async function getStaticPaths() {
    const paths = await getAllPaths();
    console.log("PATHSS ---");
    
    const routes = paths.map((path)=> { return ( {params: {nameLink: path.nameLink , id:path._id}})})
    
    return {
        paths:routes,
      fallback: "blocking",
    };
  }
export async function getStaticProps({params}){
        console.log(params)
        const {id,nameLink} = params;
       
        console.log("Getting data...");
        let posts;
        if(id !== "blog" ){
           posts = await getPostswithid(id);
        }else{
          posts = await getPostswithnameLink(nameLink); 
        }
        var cfg ={};
        
        const relatedPosts =  await getPostswithTagWithQuantity(posts.tag,3)
        
       // console.log(posts.body.ops);
        const quillData = posts.body;
        console.log("Data")
        for(let op in quillData.ops) {
          // If we have image op
          if(quillData.ops[op].insert.image) {
              // Set it as custom op and copy original data
              quillData.ops[op].insert.customImage = quillData.ops[op].insert.image;
              // Delete original image op
              delete quillData.ops[op].insert.image;
          }
      }
      var converter = new QuillDeltaToHtmlConverter(quillData.ops,cfg);
//
        converter.renderCustomWith(function(customOp,contextOp){
          
            if(customOp.insert.type === "customImage"){
              
              return (`<img alt= "${customOp.attributes.alt}" src="${customOp.insert.value}"    />`)
            }else{
              return "Unmanageble image"
            }
        })
        var html  = converter.convert();
       // console.log("HTML----");
        posts.body = html;
       // console.log(html);
        
        //console.log("DDATA");
        return {
            props: {
              "postsData":posts,
              "relatedPosts":relatedPosts
            },
          };
       // return {"postsData":posts};
}
export default function Page({postsData,relatedPosts}){
        
        
  //  const [postsData,setpostData] = useState([]);
   // const {id} = useParams();
   
    // useEffect(()=>{
            
    //        getPostswithid(id).then((posts)=>{
           
    //        setpostData(posts);
          
      
    //     });
   
        
    // },[id])
    
    
    //const postsData = null;
    
  console.log(relatedPosts)
    function getPosition(string, subString, index) {
      return string.split(subString, index).join(subString).length;
    }

  const imageSrc =postsData?.coverimage;
  const getOptimizedImageUrl = ({src,width,quality})=>{
    const pos = getPosition(imageSrc,"/",6)
    const url = imageSrc.substring(0,pos);
    const name = imageSrc.substring(pos);
    const parameters = `/b_auto,c_fill_pad,g_auto,w_${width},q_${quality|| 75}`
    return (url + parameters+ name);
}
  
    //style={{backgroundImage:`url(${postsData?.coverimage})`,overflow: 'hidden'}} 
    return (
    <Root>
    <div>
        <Head>
            <title>{postsData?.title}</title>
            <link rel='icon' href= {"/assets/footer_logo.png"} />
            <meta name='description' content={postsData?.metaDes} />
            <meta name="keywords" content={postsData?.metaTags} />
            <meta name="twitter:card" content="summary"></meta>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="blog" />
            <meta property="og:title" content={postsData?.title}/>
            <meta property="og:description" content={postsData.metaDes}/>
            <meta property="og:url" content="https://aarin.netlify.app/" />

            <meta property="og:image" content={getOptimizedImageUrl({width:1200,quality:75})} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="627" />

            


          <Script src="//cdn.quilljs.com/1.2.2/quill.min.js"></Script>  

          
        </Head>
        
        <div  className=" page  p-5   relative mx-auto    " >
        <div className="absolute lg:right-20 lg:left-20 md:right-10 md:left-10 right-0 left-0  top-5 content-center   -z-10 " >
          <Image priority alt={postsData.coverimagealt} width={500} height={600} loader={getOptimizedImageUrl} src={`none`} className="w-full max-h-[600px]   " />
        </div>
        <div className=" m-10 mx-auto  bg-white  rounded-xl p-2 max-w-5xl mt-24 sm:mt-52 md:mt-64       " >

            <h1 className=" lg:text-7xl mt-4   text-4xl w-fit mx-auto lg:px-11 px-5   ">{postsData?.title}</h1>
            <div className="flex ml-auto my-8 sm:space-x-4 sm:mr-4 w-max flex-row">
                <Image src={faceBookImage} className=" p-1 sm:p-0  my-auto sm:ml-10 icons  rounded-full " alt="" />
                <Image src={instagram} className=" p-1 sm:p-0 my-auto icons rounded-full" alt="" />
                <Image  src={twitter} className=" p-1 sm:p-0  sm:mr-8 my-auto icons rounded-full" alt="" />

            </div>
            <div className="p-10 sm:mx-4    pageblog rounded-sm" dangerouslySetInnerHTML={{__html:postsData.body}} />
        </div>
        
    </div> 
    <p class="text-center "> Also check out</p>
    <div class=" grid grid-cols-2   sm:grid-cols-1 lg:grid-cols-2 m-2   sm:gap-4 justify-center   space-x-4 space-y-4 ">

      {relatedPosts.map((post)=> {
                
                return <CardRectangle key={post._id} title={post.title} body = {post.text} tag= {post.tag} nameLink = {post.nameLink} imageSrc= {post.cardimage} cardimagealt = {post.cardimagealt} id = {post._id} />
            
            })}
       
      </div>
        </div>
        </Root>
    );
    //<QuilReader data ={postsData} /> <QuillNoSSRWrapper data={postsData} />
   // <img className="  rounded-xl  " src={postsData.coverimage} alt=" No image" />
}
//