import { NextPage } from "next";
import dynamic from "next/dynamic";
import Loading from "src/components/Common/Loading";
const DynamicComponent = dynamic(
  () => import("src/components/PdfGenerator/PdfGenerator"),
  { loading: () => <Loading />, ssr: false }
);

const PdfGenerator: NextPage = () => {
  return <DynamicComponent />;
};

export default PdfGenerator;
