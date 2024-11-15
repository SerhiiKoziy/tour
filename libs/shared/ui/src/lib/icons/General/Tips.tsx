import * as React from "react";

const SvgTips = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.638 16.011a7.333 7.333 0 1 0-5.276 0m5.276 0-.312 3.735a.458.458 0 0 1-.456.42H9.13a.458.458 0 0 1-.457-.42l-.311-3.735m5.276 0H8.362m-.112-8.22v2.75L11 9.168l2.75 1.375v-2.75"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgTips;
