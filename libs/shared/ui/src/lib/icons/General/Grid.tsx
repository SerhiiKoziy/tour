import * as React from "react";

const SvgGrid = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.875 2.75H4.125c-.76 0-1.375.616-1.375 1.375v13.75c0 .76.616 1.375 1.375 1.375h13.75c.76 0 1.375-.616 1.375-1.375V4.125c0-.76-.616-1.375-1.375-1.375Z"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M9.625 5.958H5.958v3.667h3.667V5.958ZM16.042 5.958h-3.667v3.667h3.667V5.958ZM9.625 12.375H5.958v3.667h3.667v-3.667ZM16.042 12.375h-3.667v3.667h3.667v-3.667Z"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgGrid;
