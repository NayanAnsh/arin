import { useCallback } from "react"
import Quill from "quill";
 export default function QuilReader( data ){
    const wrapperRef = useCallback((wrapper)=>{
        if(wrapper == null) return ""
        wrapper.innerHTML ="";
        const edit = document.createElement("div");
        wrapper.append(edit);
        const q= new Quill(edit,{theme:"bubble"})
        q.setText("Under construction");
        console.log(data.data.body)
        if(data != null){
            q.setContents(data.data.body);
        }
        q.enable(false);
        

    })
    return (
        <div  ref={wrapperRef} className=" p-10 sm:mx-4  no-tailwind pageblog rounded-sm "  >Editor</div>
      )
}
//shadow-black shadow-sm