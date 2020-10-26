import { NextPage } from "next";
import MetaHeader from "src/components/Common/MetaHeader";
import dynamic from "next/dynamic";
import Loading from "src/components/Common/Loading";
const DynamicComponent = dynamic(
  () => import("src/components/UserGenerator/UserGenerator"),
  { loading: () => <Loading />, ssr: false }
);

const UserGenerator: NextPage = () => {
  const title = "ダミーユーザー情報生成";
  const description =
    "テスト用のダミーユーザー情報を大量に生成・ダウンロードできます。セルをクリックすると、中の値がクリップボードにコピーされます。";
  return (
    <>
      <MetaHeader title={title} description={description} />
      <DynamicComponent />
    </>
  );
};

export default UserGenerator;
