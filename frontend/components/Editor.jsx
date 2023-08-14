import React, { useCallback,useEffect, useImperativeHandle, useState } from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import {Socket, io} from 'socket.io-client'
import ImageCompress from 'quill-image-compress';
import  ImageResize  from 'quill-image-resize';
Quill.register('modules/imageCompress', ImageCompress);
Quill.register('modules/imageResize', ImageResize);
const SAVE_INTERVAL_MS = 5000
export const documentId = "646ce77d591e3ecb93100f0a"
const TOOLBAR_OPTIONS = [
    [{ header: [ 2, 3, 4, 5] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block","link"],
    ["clean"],
  ]

export default function Editor( {setQbody}  ) {
    const [socket,setSocket] = useState();
    const [quil,setQuil] = useState();
    useEffect(()=>{
      //https://arinserver.onrender.com/ process.env.REACT_APP_BASESOCKETURL
      //process.env.REACT_APP_BASESOCKETURL
      console.log("URL -- "+process.env.NEXT_PUBLIC_BASESOCKETURL)
      const s =  io(process.env.NEXT_PUBLIC_BASESOCKETURL,{maxHttpBufferSize: 1e8})
      setSocket(s);
      return ()=>{
        s.disconnect()
      }
    },[]);

    
    const wrapperRef = useCallback((wrapper)=>{
        if(wrapper == null) return ""
        wrapper.innerHTML ="";
        const edit = document.createElement("div");
        wrapper.append(edit)
       
        
       const q= new Quill(edit, {theme:"snow",
                              modules:{
                                      toolbar:TOOLBAR_OPTIONS,
                                      imageCompress: {
                                        quality: 0.7, // default
                                        maxWidth: 1000, // default
                                        maxHeight: 1000, // default
                                        imageType: 'image/jpeg', // default
                                        debug: true, // default
                                        suppressErrorLogging: false, // default
                                        insertIntoEditor: undefined, // default
                                      },
                                      imageResize: {
                                        // See optional "config" below
                                    }
                                    }})
       q.enable(false)
       q.setText('LOADING...');
        setQuil(q);
    },[])
    
  useEffect(() => {
    if (socket == null || quil == null) return

    socket.once("load-document", document => {
      quil.setContents(document)
      quil.enable()
    })

    socket.emit("get-document", documentId)
  }, [socket, quil])
    useEffect(() => {
      if (socket == null || quil == null) return
  
      const interval = setInterval(() => {
       // console.log(quil.getContents())
        socket.emit("save-document", quil.getContents())
      }, SAVE_INTERVAL_MS)
  
      return () => {
        clearInterval(interval)
      }
    }, [socket, quil])
    
    useEffect(()=>{
      if(socket == null || quil == null) return
      const handler = (delta)=>{
  
        quil.updateContents(delta);
      }
      socket.on('receive-changes',handler );
      return ()=>{
        socket.off('receive-changes',handler);
      }
    },[socket,quil])
    
    useEffect(()=>{
      if(socket == null || quil == null) return
      const handler = (delta,oldDelta,source)=>{
        if(source !== 'user') return
        console.log("QUIL UPDATE");
        setQbody({body:quil.getContents(),text:quil.getText(0,50)});
        socket.emit('send-changes',delta)
      }
      quil.on('text-change',handler );
      return ()=>{
        quil.off('text-change',handler);
      }
    },[socket,quil])
    
  return (
    <div className=' pageblog container  ' ref={wrapperRef} >Editor</div>
  )
}
