import * as React from "react";

const SvgSpot = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 20.167s6.875-5.5 6.875-11.459a6.875 6.875 0 1 0-13.75 0C4.125 14.667 11 20.167 11 20.167Z"
      fill="url(#spot_svg__a)"
      stroke="url(#spot_svg__b)"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M11 11.458a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <defs>
      <radialGradient
        id="spot_svg__a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(4.62578 35.06248 -11.53753 1.52214 6.374 -2.52)"
      >
        <stop stopColor="#FF2424" />
        <stop offset={1} stopColor="#F40051" />
      </radialGradient>
      <radialGradient
        id="spot_svg__b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(4.62578 35.06248 -11.53753 1.52214 6.374 -2.52)"
      >
        <stop stopColor="#FF2424" />
        <stop offset={1} stopColor="#F40051" />
      </radialGradient>
    </defs>
  </svg>
);

export default SvgSpot;
