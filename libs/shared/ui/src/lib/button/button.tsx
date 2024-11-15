import {
  ButtonProps as ChakraButtonProps,
  Center,
  Icon,
  Text,
  Button as ChakraButton,
  useBoolean,
  useToken,
} from '@chakra-ui/react';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ChakraButtonProps {
  leftIcon?: any;
  size?: string;
  variant?: string;
  colorScheme?: string;
  onClick?: () => void;
  isDisabled?: boolean | undefined;
  children?: JSX.Element | string;
}

// type ButtonProps = ChakraButtonProps;

// This seems silly, but this ChakraButton has many features that can not be covered just by using
// return <ChakraButton {...props} /> as wrapper.
// The idea of having this in this way is to add a bit of abstraction in case we want to change the button implementation easily
// TODO check why when I do "export const Button = ChakraButton", the date picker fails
export const Button = ({ leftIcon, children, ...rest }: ButtonProps) => {
  return (
    <ChakraButton p={leftIcon ? 2 : 4} borderRadius="lg" {...rest}>
      <Center>
        {leftIcon && <Icon as={leftIcon} w="auto" h="100%" />}
        {children && <Text ml={leftIcon ? 1 : 0}>{children}</Text>}
      </Center>
    </ChakraButton>
  );
};

export const ToogleButton = ({
  leftIcon: LeftIcon,
  colorScheme,
  onClick,
  ...rest
}: ButtonProps) => {
  const [isActive, setIsActive] = useBoolean(false);
  const [color500, gray700] = useToken('colors', [
    `${colorScheme}.500`,
    'gray.700',
  ]);

  const handleClick = () => {
    if (onClick) {
      setIsActive.toggle();
      onClick();
    }
  };

  const ToogleIcon = () => (
    <LeftIcon
      fill={isActive ? color500 : 'none'}
      stroke={isActive ? color500 : gray700}
    />
  );

  return <Button leftIcon={ToogleIcon} onClick={handleClick} {...rest} />;
};

export default Button;
