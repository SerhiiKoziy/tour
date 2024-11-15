interface SvgCheckProps {
  size?: number | string;
  fill?: string;
}

const SvgCheck = ({ size = 22, fill = '#2B2E2F' }: SvgCheckProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5835 11.0003L9.16683 15.5837L18.3335 6.41699"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgCheck;
