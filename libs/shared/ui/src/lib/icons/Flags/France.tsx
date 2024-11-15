import * as React from "react";

const SvgFrance = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#france_svg__a)">
      <path
        d="M22 16.5a2.444 2.444 0 0 1-2.445 2.445h-4.889V3.055h4.89A2.444 2.444 0 0 1 22 5.5v11Z"
        fill="#ED2939"
      />
      <path
        d="M2.444 3.056A2.444 2.444 0 0 0 0 5.5v11a2.444 2.444 0 0 0 2.444 2.445h4.89V3.055h-4.89Z"
        fill="#002495"
      />
      <path d="M7.333 3.056h7.334v15.889H7.334V3.055Z" fill="#EEE" />
    </g>
    <defs>
      <clipPath id="france_svg__a">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgFrance;
