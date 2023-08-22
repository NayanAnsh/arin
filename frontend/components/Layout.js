import Head from "next/head";
import Script from "next/script";


export default function layout({children}){
    return(
        
        <div>
        <Head>
                        
           

                <meta charset="utf-8" />
                
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />

                
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                
               
                
                
        </Head>
      
        
        
        <main>{children}</main>
        </div>
       
    )

}