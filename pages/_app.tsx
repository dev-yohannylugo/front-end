
import type { AppProps } from 'next/app'
import "../public/globals.css";
import "../public/ProducDialog.module.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
