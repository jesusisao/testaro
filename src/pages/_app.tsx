import "normalize.css";
import "styles/globals.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "src/components/Layout/Layout";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Testaro</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
