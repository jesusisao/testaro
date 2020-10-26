import React from "react";
import Head from "next/head";

const MetaHeader: React.FC<{ title: string; description?: string }> = (
  prop
) => {
  return (
    <Head>
      <title>{prop.title} - Testaro</title>
      {typeof prop.description === "string" && (
        <meta name="description" content={prop.description} />
      )}
    </Head>
  );
};

export default MetaHeader;
