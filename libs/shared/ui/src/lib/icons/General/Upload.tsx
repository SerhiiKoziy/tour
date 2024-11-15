import * as React from "react";

const SvgUpload = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.352 9.29a4.585 4.585 0 1 0 2.317 8.87m8.856-8.87a4.585 4.585 0 1 1-2.317 8.87M16.5 9.167a5.5 5.5 0 1 0-11 0m2.322 3.612L11 9.59l3.269 3.243m-3.27 4.584v-6.205"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgUpload;
