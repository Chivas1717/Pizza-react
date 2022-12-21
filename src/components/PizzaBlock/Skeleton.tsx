import React from 'react';
import ContentLoader from 'react-content-loader';

type SkeletonProps = {
  key: number;
};

const Skeleton: React.FC<SkeletonProps> = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="275" rx="14" ry="14" width="280" height="31" />
    <rect x="0" y="315" rx="11" ry="11" width="280" height="85" />
    <rect x="0" y="419" rx="8" ry="8" width="106" height="28" />
    <rect x="172" y="410" rx="19" ry="19" width="108" height="45" />
  </ContentLoader>
);

export default Skeleton;
