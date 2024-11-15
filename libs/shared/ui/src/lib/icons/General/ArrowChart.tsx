import * as React from "react";

const SvgArrowChart = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.292 16.042h5.5m0 0v-5.5m0 5.5-6.79-7.104-4.514 2.75-4.738-5.73"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgArrowChart;
