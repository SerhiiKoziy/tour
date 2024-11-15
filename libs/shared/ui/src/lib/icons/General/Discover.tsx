interface SvgDiscoverProps {
  size?: number | string;
  fill?: string | string[];
}

const SvgDiscover = ({ size = 22, fill }: SvgDiscoverProps) => {
  let color = '#CCC',
    background = '';

  if (typeof fill === 'string') {
    color = fill;
    background = fill;
  }
  if (Array.isArray(fill) && fill.length > 1) {
    color = fill[0];
    background = fill[1];
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill={background}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0002 20.1666C16.0628 20.1666 20.1668 16.0625 20.1668 10.9999C20.1668 5.93731 16.0628 1.83325 11.0002 1.83325C5.93755 1.83325 1.8335 5.93731 1.8335 10.9999C1.8335 16.0625 5.93755 20.1666 11.0002 20.1666Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6.87516 15.1249L8.93766 8.93742L15.1252 6.87492L13.0627 13.0624L6.87516 15.1249Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0002 11.9166C11.5064 11.9166 11.9168 11.5062 11.9168 10.9999C11.9168 10.4936 11.5064 10.0833 11.0002 10.0833C10.4939 10.0833 10.0835 10.4936 10.0835 10.9999C10.0835 11.5062 10.4939 11.9166 11.0002 11.9166Z"
        fill={color}
      />
    </svg>
  );
};

export default SvgDiscover;
