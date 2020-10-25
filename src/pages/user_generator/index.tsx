import { NextPage } from "next";
import dynamic from "next/dynamic";
import Loading from "src/components/Common/Loading";
const DynamicComponent = dynamic(
  () => import("src/components/UserGenerator/UserGenerator"),
  { loading: () => <Loading />, ssr: false }
);

const UserGenerator: NextPage = () => {
  return <DynamicComponent />;
};

export default UserGenerator;
