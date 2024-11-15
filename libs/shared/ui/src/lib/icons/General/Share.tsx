import * as React from "react";

const SvgShare = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 11.889v5.333c0 .982-.784 1.778-1.75 1.778H5.75C4.784 19 4 18.204 4 17.222V11.89m7 1.778V3m0 0L7.937 6.111M11 3l3.063 3.111"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgShare;
