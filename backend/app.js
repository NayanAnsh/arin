const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const Document = require('./models/document');
const Blog = require("./models/blog"); 
const app = express()
const port = 3002
const io = require('socket.io')(3001,{
  maxHttpBufferSize: 1e8,
  cors:{
    origin: 'http://localhost:3000',
    methods:['GET','POST']
  }
})
io.on("connection",  socket=>{
  socket.on("get-document", async documentId => {
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
console.log(process.env);
async function main(){
  await mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPass}@cluster0.wnvoeyg.mongodb.net/arin?retryWrites=true&w=majority`);
  console.log("DATABASE connected");
}
main().catch((err)=>{
  console.log(err);
});
app.use(cors());
app.use(bodyParser.json({limit: '10000kb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/blogs",require('./routes/blogs'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
async function findOrCreateDocument(id){
  const doc = await Document.findById(id);
  if(id == null) return 

  if (doc) return doc
  return await Document.create({_id:id,data:" "});
} 
app.listen(port)