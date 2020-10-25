import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "src/components/Common/Loading";
const DynamicComponent = dynamic(
  () => import("src/components/UserGenerator/UserGenerator"),
  { loading: () => <Loading />, ssr: false }
);

const UserGenerator: NextPage = () => {
  const title = "ダミーユーザー情報生成";
  return (
    <>
      <Head>
        <title>{title} | Testaro</title>
      </Head>
      <DynamicComponent />
    </>
  );
};

export default UserGenerator;
