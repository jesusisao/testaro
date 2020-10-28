import "normalize.css";
import "styles/globals.scss";
import { AppProps } from "next/app";
import MetaHeader from "src/components/Common/MetaHeader";
import Layout from "src/components/Layout/Layout";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaHeader />
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
