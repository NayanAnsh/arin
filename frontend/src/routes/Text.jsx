

import { redirect,Form } from 'react-router-dom';
import Editor from '../components/Editor';
import { addPost } from '../server/blogs';
import axios from 'axios';
import { useState } from 'react';


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
let cardImage;
let coverImage;
function handleCardImage(data){
  
  cardImage = data.target.files[0];
  
}
function handleCoverImage(data){
  coverImage = data.target.files[0];
}

const uploadImage = async (img)=>{
  const imageFormData = new FormData();
  imageFormData.append("file",img);
  imageFormData.append("upload_preset","aarinpreset");
  imageFormData.append("cloud_name","dqxuucjcd");
  const cloudRes = await axios.post("https://api.cloudinary.com/v1_1/dqxuucjcd/image/upload",imageFormData);
  return await cloudRes.data.url;
}

export async function add(qdata,request){
  console.log(qdata)
  console.log(request)
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(cardImage);
  console.log(coverImage);
  
  alert("press ok to confirm");
  
  if(cardImage === undefined && coverImage === undefined ){
    console.log("No cover or card image found");
    alert("No cover or card image found");
    return redirect("/e/edit");
  }
 
  console.log("uploading images");
  const cardURL  = await uploadImage(cardImage);
  const coverURL  = await uploadImage(coverImage);
  
  
  console.log("uploading blog");
  await addPost({tag:data.tag ,
                title:data.title ,
                body: qdata.body,
                text:qdata.text,
                cardimage:cardURL,
                coverimage:coverURL,
                metaTags:data.metaTags,
                metaDes:data.metaDes,
                nameLink:data.permaLink
              });
  
  console.log(`/${data.tag}`);
  alert("Data uploaded");
  return redirect(`/${data.tag}`);
}
export default function Text({setQbody}){
let data;
//console.log(data);

const [metaTags,setmetaTags] = useState([]);
const [desWordCount,setDesWordCount] = useState([]);
const handlemetaTags = (e)=>{
      const rawText = e.target.value;
      let rawlist = rawText.split(',');
      
      setmetaTags( rawlist.map((element)=>{
         return  `[${element.trim()}],`
      }));
      
}
const handleMetaDes = (e)=>{
      const rawText = e.target.value;
      setDesWordCount(rawText.trim().split(" ").length);
}
const handlePermaLink = ((e)=>{
  e.target.value = e.target.value.replace(" ","_")
})

    return (
<div className="container mx-auto mt-8  ">
    <div className=" mx-auto bg-white p-8 border-gray-300 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create a New Entry</h2>

      <Form method='post' encType="multipart/form-data" >
        <div className="mb-4">
          <label for="title" className="block  text-gray-700 font-medium mb-2">Title</label>
          <input type="text" id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
        </div>
        <div className="mb-4">
          <label for="metaTags" className="block text-gray-700 font-medium mb-2">metaTags</label>
          <input type="text" onChange={handlemetaTags} id="metaTags" name="metaTags" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
        </div>
         <p>Tags- </p>
          {metaTags}
         <br/>
         <div className="mb-4">
          <label for="metaDes" className="block text-gray-700 font-medium mb-2">meta description</label>
          <input type="text" onChange={handleMetaDes} id="metaDes" name="metaDes" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
          <p>words - {desWordCount}</p>
        </div>
        <div className="mb-4">
          <label for="permaLink" className="block text-gray-700 font-medium mb-2">permaLink</label>
          <div className >
            <p>www.arin.com/page/
          <input type="text" onChange={handlePermaLink} id="permaLink" name="permaLink" className="border-black border-2 rounded-md"/>
          /:pageid
          </p>
          </div>
        </div>
        <label for="lang">genre-</label>
        <select name="tag" id="lang">
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
          <Editor setQbody = {setQbody}/>

        
        </div>
        <div className="flex justify-end">
          <button type="submit"   className="px-4 py-2 bg-indigo-500 text-black rounded-md hover:bg-indigo-600 mr-2">Submit</button>
          <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </Form>
    </div>
  </div>

    );
}