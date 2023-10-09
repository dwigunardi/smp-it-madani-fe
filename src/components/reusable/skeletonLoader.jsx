import React from "react";
import { Avatar, Skeleton } from "antd";
import { useBeritaStore } from "../../store/beritaStore";
function SkeletonLoader({ children }) {
  const { loading } = useBeritaStore((state) => state);
  console.log(children, "skeleton");
  return (
    <Skeleton
      avatar
      paragraph={{
        rows: 4,
      }}
      active
    >
      {children}
    </Skeleton>
  );
}

export default SkeletonLoader;
