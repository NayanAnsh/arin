import axios from 'axios';
//require("dotenv").config();
//const URI = 'http://localhost:3002/blogs/';
const URI = process.env.NEXT_PUBLIC_BASEURL + "/blogs/";
export async function  getAllPosts(){

    try{
        console.log(URI);
        const res = await axios.get(URI);
        return res.data;

    }catch(err){
        console.log("error from get all posts " + err)
        return [];

    }
    

}
export async function getAllPaths(){
    try{
        const res = await axios.get(`${URI}paths/`); 
        return res.data;
    }catch(e){
        console.log("Error in requesting all path data - " +e);
        return [];
    }
}
export async function  getPostswithTagWithQuantity(tag,quantity){

    try{
        const Tag = tag.toLowerCase();
        const res = await axios.get(`${URI}posts/${Tag}/${quantity}`);
        return res.data;

    }catch(err){
        console.log("error from get getposttags with quantity " + err)
        return [];

    }
    

}
export async function  getPostswithTag(tag){

    try{
        const Tag = tag.toLowerCase();
        const res = await axios.get(`${URI}posts/${Tag}`);
        return res.data;

    }catch(err){
        console.log("error from get getposttags " + err)
        return [];

    }
    

}

export async function  getPostswithid(id){
    console.log("req with id");
    try{
        
        const res = await axios.get(`${URI}posts/id/${id}`);
        return res.data;

    }catch(err){
        console.log("error from get getpostid " + err)
        return [];

    }
    

}


export async function  getPostswithnameLink(id){

    try{
        
        const res = await axios.get(`${URI}posts/namelink/${id}`);
        return res.data;

    }catch(err){
        console.log("error from get getPostswithnameLink " + err)
        return [];

    }
    

}
export async function deletePost(id){
    try{
        
        const res = await axios.post(`${URI}delete/${id}`,[]);
        return res.data;

    }catch(err){
        console.log("error from get deletePost " + err)
        return [];

    }
}
export async function updatePost(id){
    try{
        
        const res = await axios.post(`${URI}update/${id}`);
        return res.data;

    }catch(err){
        console.log("error from get updatePost " + err)
        return [];

    }
}
export async function addPost(data){
    try{
        console.log("In axios"+data);
        const res = await axios.post(`${URI}add`,data);
        console.log("OUt of axios"+data);
        return res.data;

    }catch(err){
        
        console.log("error from get addPost " + err)
        console.log(`${URI}add`);
        return [];

    }
}
//getAllPosts();