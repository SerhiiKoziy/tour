import * as React from "react";

const SvgGetDirection = (props) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={-1}
      y={13}
      width={19.799}
      height={19.799}
      rx={3}
      transform="rotate(-45 -1 13)"
      fill="#F40051"
    />
    <path
      d="M16.486 9.514a.687.687 0 1 0-.972.972l.972-.972ZM18 12l.486.486a.687.687 0 0 0 0-.972L18 12Zm-2.486 1.514a.687.687 0 1 0 .972.972l-.972-.972ZM9.313 16a.687.687 0 1 0 1.374 0H9.313Zm1.437-4v-.688V12Zm4.764-1.514 2 2 .972-.972-2-2-.972.972Zm2 1.028-2 2 .972.972 2-2-.972-.972ZM10.688 16v-3.25H9.312V16h1.376Zm0-3.25c0-.034.027-.063.062-.063v-1.374c-.794 0-1.438.643-1.438 1.437h1.376Zm.062-.063H18v-1.374h-7.25v1.374Z"
      fill="#fff"
    />
  </svg>
);

export default SvgGetDirection;
