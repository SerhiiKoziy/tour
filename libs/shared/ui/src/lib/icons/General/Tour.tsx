import * as React from "react";

const SvgTour = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.833 2.917V2m0 .917v7.333m0-7.333 12.834 3.666L6.833 10.25m0 0v10.083m0 0H5m1.833 0h1.834"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgTour;
