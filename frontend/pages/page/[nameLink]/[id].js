

import Head from "next/head";
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

import { getAllPaths, getPostswithid } from "../../../server/blogs";
import Root from "../../../components/root";
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
        const {id} = params;
        console.log("Getting data...");
        const posts = await getPostswithid(id);
        var cfg ={};
      //  console.log(posts.body.ops);
        var converter = new QuillDeltaToHtmlConverter(posts.body.ops,cfg);
        var html  = converter.convert();
       // console.log("HTML----");
        posts.body = html;
      //  console.log(posts);
        
        //console.log("DDATA");
        return {
            props: {
              "postsData":posts,
            },
          };
       // return {"postsData":posts};
}
export default function Page({postsData}){
        
        
  //  const [postsData,setpostData] = useState([]);
   // const {id} = useParams();
   
    // useEffect(()=>{
            
    //        getPostswithid(id).then((posts)=>{
           
    //        setpostData(posts);
          
      
    //     });
   
        
    // },[id])
    
    
    //const postsData = null;
    
    
    return (
    <Root>
    <div>
        <Head>
            <title>{postsData?.title}</title>
            <link rel='icon' href= {"/assets/footer_logo.png"} />
            <meta name='description' content={postsData?.metaDes} />
            <meta name="keywords" content={postsData?.metaTags} />
        </Head>
        
        <div style={{backgroundImage:`url(${postsData?.coverimage})`,overflow: 'hidden'}}  className=" page max-w-7xl p-5  relative mx-auto    " >
        <div className=" m-10 mx-auto  bg-white  rounded-xl p-2 max-w-5xl mt-24 sm:mt-52 md:mt-64       " >

            <h1 className=" lg:text-7xl mt-4   text-4xl w-fit mx-auto lg:px-11 px-5   ">{postsData?.title}</h1>
            <div className="flex ml-auto my-8 sm:space-x-4 sm:mr-4 w-max flex-row">
                <img src="/assets/facebookLogo.jpg" className=" p-1 sm:p-0  my-auto sm:ml-10 icons  rounded-full " alt="" />
                <img src="/assets/instagram.jpg" className=" p-1 sm:p-0 my-auto icons rounded-full" alt="" />
                <img src="/assets/twitter.jpg" className=" p-1 sm:p-0  sm:mr-8 my-auto icons rounded-full" alt="" />

            </div>
            <div className="p-10 sm:mx-4    pageblog rounded-sm" dangerouslySetInnerHTML={{__html:postsData.body}} />
        </div>
        
    </div> 
        
       
        </div>
        </Root>
    );
    //<QuilReader data ={postsData} /> <QuillNoSSRWrapper data={postsData} />
   // <img className="  rounded-xl  " src={postsData.coverimage} alt=" No image" />
}
//