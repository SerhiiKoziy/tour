import * as React from 'react';

const SvgFavorite = ({ stroke = '#2B2E2F', ...props }) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.875 3.667a5.042 5.042 0 0 0-5.042 5.042c0 5.041 5.959 9.625 9.167 10.69 3.209-1.065 9.167-5.649 9.167-10.69A5.042 5.042 0 0 0 11 5.809a5.036 5.036 0 0 0-4.125-2.142Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgFavorite;
