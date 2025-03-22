import React from "react";
import Head from "next/head";

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
    <>
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
      </Head>
    </>
  );
};

export default MetaHeader;
