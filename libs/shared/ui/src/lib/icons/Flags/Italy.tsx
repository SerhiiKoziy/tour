import * as React from "react";

const SvgItaly = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 16.5a2.444 2.444 0 0 1-2.445 2.445h-4.889V3.055h4.89A2.444 2.444 0 0 1 22 5.5v11Z"
      fill="#CE2B37"
    />
    <path
      d="M2.444 3.056A2.444 2.444 0 0 0 0 5.5v11a2.444 2.444 0 0 0 2.444 2.445h4.89V3.055h-4.89Z"
      fill="#009246"
    />
    <path d="M7.333 3.056h7.334v15.889H7.334V3.055Z" fill="#EEE" />
  </svg>
);

export default SvgItaly;
