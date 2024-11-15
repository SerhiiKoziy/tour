import * as React from "react";

const SvgCleear = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={22} height={22} rx={11} fill="#E8EBED" />
    <path
      d="M7.167 6.106a.75.75 0 0 0-1.061 1.06l1.06-1.06Zm7.666 9.788a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-8.727-1.06a.75.75 0 0 0 1.06 1.06l-1.06-1.06Zm9.788-7.667a.75.75 0 0 0-1.06-1.061l1.06 1.06Zm-9.788 0 8.727 8.727 1.06-1.06-8.726-8.728-1.061 1.06Zm1.06 8.727 8.728-8.727-1.06-1.061-8.728 8.727 1.06 1.061Z"
      fill="#757C7F"
    />
  </svg>
);

export default SvgCleear;
