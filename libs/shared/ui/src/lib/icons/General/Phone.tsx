import * as React from "react";

const SvgPhone = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.855 3.45c.327 0 .627.178.786.463L9.739 5.89c.144.26.15.573.018.838L8.699 8.845s.306 1.577 1.59 2.86c1.283 1.284 2.854 1.585 2.854 1.585l2.116-1.058a.898.898 0 0 1 .838.018l1.985 1.103a.898.898 0 0 1 .461.785v2.278c0 1.16-1.077 1.998-2.176 1.627-2.258-.762-5.762-2.212-7.983-4.433-2.221-2.221-3.671-5.725-4.433-7.983-.371-1.099.467-2.176 1.627-2.176h2.277Z"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgPhone;
