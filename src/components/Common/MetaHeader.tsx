import React from "react";
import Head from "next/head";
import { GA_ID } from "src/lib/gtag";

const siteName = "Testaro";
const host = "https://testaro.netlify.app";
const imageUrl = `${host}/icon-ogp.png`;

const defaultDescription =
  "アプリケーション開発時の手動テストを、少しだけ楽にするためのサービスです。";

type Prop = {
  title?: string;
  description?: string;
  url?: string;
};

const MetaHeader: React.FC<Prop> = (prop) => {
  const titleResult =
    typeof prop.title === "string" ? `${prop.title} - ${siteName}` : siteName;
  const descriptionResult =
    typeof prop.description === "string"
      ? prop.description
      : defaultDescription;
  const urlResult = typeof prop.url === "string" ? `${host}${prop.url}` : host;
  return (
    <Head>
      <title>{titleResult}</title>
      <meta name="description" content={descriptionResult} />
      {/* OGPタグ https://ogp.me/#metadata */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={titleResult} />
      <meta property="og:description" content={descriptionResult} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={urlResult} />
      {/* Twitterカード */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@jesus_isao" />
      {/* その他 */}
      <link rel="icon" href="/favicon-32x32.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+Rounded+1c&display=swap"
        rel="stylesheet"
      />
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
  );
};

export default MetaHeader;
