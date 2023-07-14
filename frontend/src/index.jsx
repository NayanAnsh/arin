import Posts from './routes/posts';
import React, { Children, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './preflightTailwind.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import NoStoryYet from './routes/NoStoryYet';

import Text,{add} from './routes/Text';
import Page from './routes/page';
import { HelmetProvider } from "react-helmet-async";


function Route(){
  const [Qbody, setQbody] = useState({body:"This is a sample blog", text:"This is text only"});

  const router = createBrowserRouter([
    {
      path: "/",
      element : <Root/>,
      errorElement:<NoStoryYet/>,
     children:[
      
     {
      path:":tag",
      element:<Posts/>
        
     }, 
    {
      path:"/e/edit",
      
      element: <Text setQbody= {setQbody} />,
      action: async ({request})=>{
          console.log("Router");
          
          return await add(Qbody,request)
      }   
    },
    {
      path:"/page/:name/:id",
      element:<Page/>
    }
  
  ],}])
  return <RouterProvider router= {router} />;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Route/>
    </HelmetProvider>

  </React.StrictMode>
);
