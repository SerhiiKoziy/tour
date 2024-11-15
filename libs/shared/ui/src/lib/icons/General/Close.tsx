import * as React from "react";

const SvgClose = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.53 4.47a.75.75 0 0 0-1.06 1.06l1.06-1.06Zm10.94 13.06a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-12-1.06a.75.75 0 1 0 1.06 1.06l-1.06-1.06ZM17.53 5.53a.75.75 0 0 0-1.06-1.06l1.06 1.06Zm-13.06 0 12 12 1.06-1.06-12-12-1.06 1.06Zm1.06 12 12-12-1.06-1.06-12 12 1.06 1.06Z"
      fill="#2B2E2F"
    />
  </svg>
);

export default SvgClose;
