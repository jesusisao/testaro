import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "src/components/Common/Loading";
const DynamicComponent = dynamic(
  () => import("src/components/PdfGenerator/PdfGenerator"),
  { loading: () => <Loading />, ssr: false }
);

const PdfGenerator: NextPage = () => {
  const title = "ダミーPDF生成";
  return (
    <>
      <Head>
        <title>{title} | Testaro</title>
      </Head>
      <DynamicComponent />
    </>
  );
};

export default PdfGenerator;
