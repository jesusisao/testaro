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
        <meta
          name="description"
          content="アプリケーション開発時の手動テストを、少しだけ楽にするためのサービスです。"
        />
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
