const mongoose = require("mongoose");
require('dotenv').config();
const Document = require('./models/document');
const io = require('socket.io')( process.env.PORT ||3001,{
    maxHttpBufferSize: 1e8,
    cors:{
      origin: process.env.CLIENTURL,
      methods:['GET','POST']
    }
  })
  io.on("connection",  socket=>{
    socket.on("get-document", async documentId => {
      console.log("SOCKET CONNECTION ESTABLISHED")
      const document = await findOrCreateDocument(documentId)
    //  socket.join(documentId)
    
      socket.emit("load-document", document.data)
  
      socket.on("send-changes", delta => {
        socket.broadcast.to(documentId).emit("receive-changes", delta)
      })
      socket.on("save-post", async data =>{
            console.log("Data--- save accepted")
              socket.emit("get-data");
              socket.on("recive-doc",async doc =>{
                  console.log(data)
                  console.log(doc)
              })
      })
      socket.on("save-document", async data => {
      //  console.log("saving");
        await Document.findByIdAndUpdate(documentId, { data })
        
       
      })
    })
   // console.log("Connected");
  
  })
  async function main(){
    await mongoose.connect(`mongodb+srv://nayanansh:${process.env.mongoUserPass}@cluster0.rft7ttq.mongodb.net/?retryWrites=true&w=majority`);
    console.log("DATABASE connected");
  }
  main().catch((err)=>{
    console.log(err);
  });

  async function findOrCreateDocument(id){
    const doc = await Document.findById(id);
    if(id == null) return 
  
    if (doc) return doc
    return await Document.create({_id:id,data:" "});
  } 