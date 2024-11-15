import * as React from "react";

const SvgSquareDown = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.583 8.708 11 13.292 6.417 8.708M4.125 2.75h13.75c.76 0 1.375.616 1.375 1.375v13.75c0 .76-.616 1.375-1.375 1.375H4.125c-.76 0-1.375-.616-1.375-1.375V4.125c0-.76.616-1.375 1.375-1.375Z"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgSquareDown;
