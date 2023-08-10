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

                <title>React App</title>
                <link rel="stylesheet" href="/style.css"/>
                <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
  
        </Head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6818M6MRG"></Script>
        <Script>{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-W6818M6MRG');
                `
                }
        </Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.20.2/ckeditor.js" integrity="sha512-abfAV2gASfr4b8JYZfgEO6rByKHbXqfHIIQ2QWI/Z8L2XB3MVZhlY8Oy52C6mZbugZBPnzAz7c7RLlYwZT5DBA==" crossorigin="anonymous" referrerpolicy="no-referrer"></Script>
        <Script src="//cdn.quilljs.com/1.2.2/quill.min.js"></Script>  
        
        <main>{children}</main>
        </div>

    )

}