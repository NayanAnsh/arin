import React from 'react'

const DummyCard = () => {
  return (
    <div className="  md:max-w-xs opacity-40 max-w-[200px] m-4 sm:m-8 drop-shadow-[5px_5px_3.5px_rgba(0,0,0,0.15)] bg-white  border-[#FFE3AA] rounded-[20px] border-2 border-solid  " >
        <div className="p-1" >
            <div className="rounded-[20px]  aspect-[1] w-10/11 my-2 sm:my-0 mx-auto   bg-slate-400 "  />
        </div>
        <div className=" p-2 sm:p-5">
            
                <h5 className=" mb-2  md:text-lg w-4 bg-slate-400  text-base font-semibold tracking-tight text-[#404040] "></h5>
            
            <p className="mb-3 font-thin w-4 h-6 md:text-base text-sm  text-gray-700 dark:text-gray-400"></p>
            <p  className="inline-flex p-2 px-2  sm:w-auto sm:h-auto items-center sm:px-3 sm:py-2 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                
                <svg aria-hidden="true" className=" w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
            </p>
        </div>

</div>
  )
}

export default DummyCard