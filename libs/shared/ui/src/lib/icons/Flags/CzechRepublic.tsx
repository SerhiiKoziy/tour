import * as React from "react";

const SvgCzechRepublic = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#czech-republic_svg__a)">
      <path
        d="M.845 18.317c.433.406 1.006.63 1.6.627h17.11c1.35 0 2.445-1.094 2.445-2.75V11H10.694L.845 18.317Z"
        fill="#D7141A"
      />
      <path
        d="M19.556 3.056H2.445c-.596 0-1.172.218-1.617.614L10.695 11H22V5.5a2.444 2.444 0 0 0-2.444-2.444Z"
        fill="#EEE"
      />
      <path
        d="M.845 18.316 10.695 11 .826 3.67A2.435 2.435 0 0 0 0 5.5v10.694c0 .905.328 1.64.845 2.122Z"
        fill="#11457E"
      />
    </g>
    <defs>
      <clipPath id="czech-republic_svg__a">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgCzechRepublic;
