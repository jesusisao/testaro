import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import dynamic from "next/dynamic";
import Loading from "src/components/Common/Loading";
const DynamicComponent = dynamic(
  () => import("src/components/PdfGenerator/PdfGenerator"),
  { loading: () => <Loading />, ssr: false }
);

const PdfGenerator: NextPage = () => {
  const title = "ダミーPDF生成";
  const description = "異なる文字の書かれたテスト用のPDFを大量に生成できます。";

  return (
    <>
      <MetaHeader title={title} description={description} />
      <DynamicComponent />
    </>
  );
};

export default PdfGenerator;
