import * as React from "react";

const SvgCart = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.208 20.625V19.25M8.25 20.625V19.25m0-11.688V3.208a1.833 1.833 0 0 1 1.833-1.833h2.292a1.834 1.834 0 0 1 1.833 1.833v4.354m-.537 4.125H8.787m4.884 3.438H8.787M7.333 7.792h7.792c1.012 0 1.833.82 1.833 1.833v7.792c0 1.012-.82 1.833-1.833 1.833H7.333A1.833 1.833 0 0 1 5.5 17.417V9.625c0-1.013.82-1.833 1.833-1.833Z"
      stroke="#2B2E2F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgCart;
