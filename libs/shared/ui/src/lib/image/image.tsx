import NextImage, { StaticImageData } from 'next/image';
import { Box, BoxProps } from '@chakra-ui/react';

export const Image = ({
  src,
  alt,
  ...rest
}: { src: string | StaticImageData; alt: string } & Omit<BoxProps, 'as'>) => {
  return (
    <Box position="relative" {...rest}>
      <NextImage objectFit="cover" src={src} alt={alt} />
    </Box>
  );
};

export default Image;
