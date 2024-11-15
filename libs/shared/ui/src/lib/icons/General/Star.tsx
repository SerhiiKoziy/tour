import * as React from 'react';

const SvgStar = ({ stroke = '#2B2E2F', ...props }) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 2.292 8.197 8.011l-6.365.923 4.61 4.507-1.101 6.268 5.657-3.017 5.66 3.017-1.094-6.268 4.602-4.507-6.33-.923L11 2.292Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgStar;
