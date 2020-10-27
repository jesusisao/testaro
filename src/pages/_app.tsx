import "normalize.css";
import "styles/globals.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "src/components/Layout/Layout";
import { GA_ID } from "src/lib/gtag";

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
        <link rel="manifest" href="/manifest.json" />
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
          }}
        />
      </Head>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
