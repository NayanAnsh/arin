
import dynamic from "next/dynamic"


const QuillNoSSRWrapper = dynamic(import('../../components/Editor'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

import axios from 'axios';
import { useCallback, useState } from 'react';
import { redirect } from 'next/navigation';
import { addPost } from '../../server/blogs';
import { useRouter } from 'next/navigation';
import Root from "../../components/Root";
import Head from "next/head";


/*
        <label for="cover" className="block text-gray-700 font-medium mb-2"   >Cover Image</label>
        <input type="file" id="cover" name="coverImage" />
        */
      /* <CKEditor  editor={ClassicEditor } 
            name = "body"
             onChange={ ( event, editor ) => {
             data = editor.getData();
             console.log( { event, editor, data } );
        } }

          />
*/



export default function Text(){
let data;
//console.log(data);
const [title , setTitle] = useState("");
const [metaTags,setmetaTags] = useState([]);
const [metaTagsHTML,setmetaTagsHTML] = useState([]);
const [metaDes, setMetaDes] = useState([]);
const [permaLink,setpermaLink] = useState("");
const [tag,setTag] = useState("lifestyle");
const [cardImage, setCardImage] = useState("");
const [coverImage,setCoverImage]= useState("");
const [qdata,setQbody] = useState([]);

const [desWordCount,setDesWordCount] = useState([]);

const handlemetaTags = (e)=>{
      const rawText = e.target.value;
      let rawlist = rawText.split(',');
      setmetaTags(rawText);
      setmetaTagsHTML( rawlist.map((element)=>{
         return  `[${element.trim()}],`
      }));
      
}
const handleTitle = (e)=>{
    
    setTitle(e.target.value)
    //console.log(title)
}
const handleMetaDes = (e)=>{
      const rawText = e.target.value;
      setMetaDes(rawText);
      setDesWordCount(rawText.trim().split(" ").length);
}
const handlePermaLink = ((e)=>{
        e.target.value = e.target.value.replace(" ","_")
        setpermaLink(e.target.value);
})

    //handle image
    function handleCardImage(data){
    
    setCardImage(data.target.files[0]);
    
    }
    function handleCoverImage(data){
    setCoverImage(data.target.files[0]);
    }
    const handleTag = (e)=>{
        setTag(e.target.value);
    }
    //upload image
    const uploadImage = async (img)=>{
        const imageFormData = new FormData();
        imageFormData.append("file",img);
        imageFormData.append("upload_preset","aarinpreset");
        imageFormData.append("cloud_name","dqxuucjcd");
        const cloudRes = await axios.post("https://api.cloudinary.com/v1_1/dqxuucjcd/image/upload",imageFormData);
        return await cloudRes.data.url;
      }
      //upload finale file to database
      const { push } = useRouter();
         async function handleSubmit(event){
            // console.log(qdata)
            // console.log(request)
            // const formData = await request.formData();
            // const data = Object.fromEntries(formData);
            // console.log(cardImage);
            // console.log(coverImage);
            event.preventDefault();
            alert("press ok to confirm");
            
            if(cardImage === undefined && coverImage === undefined ){
            console.log("No cover or card image found");
            alert("No cover or card image found");
            return redirect("/e/edit");
            }
        
            console.log("uploading images");
            const cardURL  = await uploadImage(cardImage);
            const coverURL  = await uploadImage(coverImage);
            
            const data = {tag:tag ,
                title:title ,
                body: qdata.body,
                text:qdata.text,
                cardimage:cardURL,
                coverimage:coverURL,
                metaTags:metaTags,
                metaDes:metaDes,
                nameLink:permaLink
                };
            console.log("uploading blog");
            console.log(data);
            await addPost(data);
            
            console.log(`/home/${data.tag}`);
            alert("Data uploaded");
            
    
            push(`/home/${data.tag}`);
          
        }
    return (
        <Root>
          <Head>
          <Script src="//cdn.quilljs.com/1.2.2/quill.min.js"></Script>  

          </Head>
<div className="container mx-auto mt-8  ">
    <div className=" mx-auto bg-white p-8 border-gray-300 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create a New Entry</h2>

      <form method='post' onSubmit={handleSubmit}  encType="multipart/form-data" >
        <div className="mb-4">
          <label for="title" className="block  text-gray-700 font-medium mb-2">Title</label>
          <input type="text" onChange={handleTitle} id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
        </div>
        <div className="mb-4">
          <label for="metaTags" className="block text-gray-700 font-medium mb-2">metaTags</label>
          <input type="text" onChange={handlemetaTags} id="metaTags" name="metaTags" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
        </div>
         <p>Tags- </p>
          {metaTagsHTML}
         <br/>
         <div className="mb-4">
          <label for="metaDes" className="block text-gray-700 font-medium mb-2">meta description</label>
          <input type="text" onChange={handleMetaDes} id="metaDes" name="metaDes" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
          <p>words - {desWordCount}</p>
        </div>
        <div className="mb-4">
          <label for="permaLink"  className="block text-gray-700 font-medium mb-2">permaLink</label>
          <div className >
            <p>www.arin.com/page/
          <input type="text" onChange={handlePermaLink} id="permaLink" name="permaLink" className="border-black border-2 rounded-md"/>
          /:pageid
          </p>
          </div>
        </div>
        <label for="lang">genre-</label>
        <select name="tag" onChange={handleTag} id="lang">
            <option value="lifestyle">lifeStyle</option>
            <option value="travel">Travel</option>
            <option value="beauty">Beauty</option>
            <option value="foods">Food</option>
            <option value="books">Books</option>
            <option value="fashion">Fashion</option>
       
        </select>
        
        <label for="cardImage" className="block text-gray-700 font-medium mb-2"   >Card Image</label>
        <input type="file"  id="cardImage" onChange={handleCardImage}  name="cardImage" />

        <label for="cover" className="block text-gray-700 font-medium mb-2"   >Cover Image</label>
        <input type="file" id="coverImage" onChange={handleCoverImage} name="coverImage" />

        <div className="mb-4">
          <label for="content" className="block text-gray-700 font-medium mb-2">Content</label>
          <QuillNoSSRWrapper setQbody = {setQbody}/>

        
        </div>
        <div className="flex justify-end">
          <button type="submit"   className="px-4 py-2 bg-indigo-500 text-black rounded-md hover:bg-indigo-600 mr-2">Submit</button>
          <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  </Root>

    );
}