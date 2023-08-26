import Head from "next/head";
import Script from "next/script";


export default function layout({children}){
    return(
        
        <div>
        <Head>
                        
           

                <meta charset="utf-8" />
                
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                
                <link rel='icon' href='/favicon.png'/>
                <link rel="apple-touch-icon" href="/favicon.png" />
                <link rel="manifest" href="/favicon.png" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-W6818M6MRG"></script>
                <script>{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-W6818M6MRG');
                `}</script>
               
                
                
        </Head>
      
        
        
        <main>{children}</main>
        </div>
       
    )

}