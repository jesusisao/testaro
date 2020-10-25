import "normalize.css";
import "styles/globals.scss";
import { AppProps } from "next/app";
import Layout from "src/components/Layout/Layout";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
