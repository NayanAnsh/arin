// `pages/_app.js`
import '../styles/global.css';
import '../styles/globaltailwind.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}