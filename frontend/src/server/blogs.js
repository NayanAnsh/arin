import axios from 'axios';
const URI = 'http://localhost:3002/blogs/';
export async function  getAllPosts(){

    try{
        const res = await axios.get(URI);
        return res.data;

    }catch(err){
        console.log("error from get all posts " + err)
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

    try{
        
        const res = await axios.get(`${URI}posts/id/${id}`);
        return res.data;

    }catch(err){
        console.log("error from get getpostid " + err)
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
        console.log(data);
        const res = await axios.post(`${URI}add`,data);
        return res.data;

    }catch(err){
        console.log("error from get updatePost " + err)
        return [];

    }
}
//getAllPosts();