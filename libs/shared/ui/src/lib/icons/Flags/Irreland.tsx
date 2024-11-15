import * as React from "react";

const SvgIrreland = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#irreland_svg__a)">
      <path
        d="M2.444 3.056A2.444 2.444 0 0 0 0 5.5v11a2.444 2.444 0 0 0 2.444 2.445h4.89V3.055h-4.89Z"
        fill="#169B62"
      />
      <path d="M7.333 3.056h7.334v15.889H7.334V3.055Z" fill="#EEE" />
      <path
        d="M19.555 3.056h-4.889v15.889h4.89A2.445 2.445 0 0 0 22 16.5v-11a2.444 2.444 0 0 0-2.445-2.444Z"
        fill="#FF883E"
      />
    </g>
    <defs>
      <clipPath id="irreland_svg__a">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgIrreland;
