const express = require('express')
const router = express.Router();
const Blog = require("../models/blog");
const { reset } = require('nodemon');
const multer = require('multer');

//http://localhost:PORT/blogs
const upload = multer({dest: '../data/images/'});
//@desc - add blog to database
router.post('/add',async(req,res)=>{
    try{
        console.log("Add a blog command received");
        
        
        let tagsText = req.body.metaTags.split(",");
        let tags = tagsText.map((element)=>{return element.trim() })
        req.body.metaTags = tags.join(",");
        console.log(req.body);
        if(!req.body.title){
            console.log("empty title");
            res.send([]);
            return ;
        }
        await Blog.create(req.body);
        res.send(req.body)

    }catch(e){
        console.log("error in adding post from server \n" + e);
        res.send([]);
    }
})

//@desc delete using id
router.post('/delete/:id',async(req,res)=>{
    console.log("HERE");
    
    await Blog.deleteOne({_id:req.params.id});
    const blogs = await Blog.find({})
        .sort({createAt:'desc'})
        .lean();
        json =  JSON.stringify(blogs);
    res.send(json);
})
//@desc find all blogs
router.get('/', async (req,res)=>{

    console.log("All post command received");
        const blogs = await Blog.find({})
        .select("_id title text tag nameLink cardimage")
        .sort('-createdAt')

        .lean();
        blogs.map((blog)=>{
            console.log(blog.text)
        })
        console.log(blogs)
        json =  JSON.stringify(blogs);
        
        res.send(json)


})
//@desc get all paths 
router.get('/paths', async (req,res)=>{
    console.log("Recieved all  paths request");
    const paths = await Blog.find({})
    .select("_id nameLink")
    .sort('-createdAt')
    .lean();
    json = JSON.stringify(paths);
    res.send(json);

})
//@desc find blogs with specific tags
router.get('/posts/:tag',async(req,res)=>{
    console.log(`req with ${req.params.tag}`);
    try{
    const blogs = await Blog.find({tag:req.params.tag})
        .select("_id title text tag nameLink cardimage")
        
        .sort('-createdAt')
        .lean();
        json =  JSON.stringify(blogs);
    
        res.send(json)
    }catch(err){
        console.log("search with tag error - "+err);
        res.send([]);
    }
})
//@desc find post by id
router.get('/posts/id/:id',async (req,res)=>{
    console.log(`req with id- ${req.params.id}`);
    try{
    const blogs = await Blog.findById(req.params.id)
        .lean();
        json =  JSON.stringify(blogs);
    
        res.send(json)
    }catch(err){
        console.log("search with id error - "+err);
        res.send([]);
    }
})
//@desc update
router.post('/update/:id', async (req,res)=>{
    const updateStatus = await Blog.updateOne({_id:req.params.id},req.body);
    
    res.send(` query updated - ${updateStatus.matchedCount} with message ${updateStatus.acknowledged}`);
})
module.exports = router;
