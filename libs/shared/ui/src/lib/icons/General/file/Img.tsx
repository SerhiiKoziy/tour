import * as React from "react";

const SvgImg = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.333 6.417V19.25c0 .506-.41.917-.916.917H4.583a.917.917 0 0 1-.916-.917V2.75c0-.506.41-.917.916-.917h9.167m4.583 4.584H13.75V1.833m4.583 4.584L13.75 1.833m-3.667 5.959a1.833 1.833 0 1 1-3.666 0 1.833 1.833 0 0 1 3.666 0Zm-3.208 5.041v4.125h8.25V9.625l-4.359 4.813-3.89-1.605Z"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgImg;
