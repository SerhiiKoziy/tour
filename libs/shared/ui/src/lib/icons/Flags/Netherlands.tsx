import * as React from "react";

const SvgNetherlands = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#netherlands_svg__a)">
      <path d="M0 8.556h22v4.889H0v-4.89Z" fill="#EEE" />
      <path
        d="M19.556 3.056H2.444A2.444 2.444 0 0 0 0 5.5v3.056h22V5.5a2.444 2.444 0 0 0-2.444-2.444Z"
        fill="#AE1F28"
      />
      <path
        d="M2.444 18.944h17.112A2.444 2.444 0 0 0 22 16.5v-3.056H0V16.5a2.444 2.444 0 0 0 2.444 2.444Z"
        fill="#20478B"
      />
    </g>
    <defs>
      <clipPath id="netherlands_svg__a">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgNetherlands;
