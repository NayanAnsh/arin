import Head from "next/head";
import Script from "next/script";


export default function layout({children}){
    return(
        
        <div>
        <Head>
                        
           

                <meta charset="utf-8" />
                
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />

                <link rel="apple-touch-icon" href="%PUBLIC_URL%/footer_logo.png" />

                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

                
                <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6818M6MRG"></Script>
        <Script>{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-W6818M6MRG');
                `
                }
        </Script>
        </Head>
      
        
        
        <main>{children}</main>
        </div>
       
    )

}