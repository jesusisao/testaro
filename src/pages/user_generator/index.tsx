import React, { Suspense, lazy } from "react";
import Loading from "src/components/Common/Loading";
const LazyComponent = lazy(
  () => import("src/components/UserGenerator/UserGenerator")
);

const UserGenerator: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export default UserGenerator;
