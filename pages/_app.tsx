import "../styles/globals.scss";
import { AppProps } from "next/app";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
