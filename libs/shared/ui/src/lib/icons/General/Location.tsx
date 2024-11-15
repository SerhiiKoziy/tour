import * as React from 'react';

const SvgLocation = ({ stroke = '#2B2E2F', ...props }) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 20.166s6.875-5.5 6.875-11.458a6.875 6.875 0 1 0-13.75 0C4.125 14.666 11 20.166 11 20.166Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M11 11.458a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgLocation;
