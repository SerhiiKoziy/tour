/*
 * Test page to show the capabilities of dynamic routes
 */

import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const destinations = ['rome', 'paris', 'cali'];

const countries = ['italy', 'france', 'colombia'];

const products = ['louvre-visit', 'roman-colosseum-tour', 'topa-tolondra-tour'];

export async function getServerSideProps({ query }) {
  const { slug } = query;
  let pageToShow = 'home';

  const lastSlug = slug[slug.length - 1];

  if (destinations.includes(lastSlug)) {
    pageToShow = 'destination';
  }

  if (countries.includes(lastSlug)) {
    pageToShow = 'country';
  }

  if (products.includes(lastSlug)) {
    pageToShow = 'product';
  }

  return {
    props: {
      slug: query.slug,
      pageToShow,
    },
  };
}

export function Slug({ slug, pageToShow }: any) {
  return (
    <Center>
      <VStack>
        <Text>Our slug params are: {JSON.stringify(slug)}</Text>
        <Box>
          And we can show: <Text color="primary.500">{pageToShow}</Text>
        </Box>
        <Box>
          <Text>We have the following links:</Text>
          <Box>
            <Heading size="lg">By country:</Heading>
            <ul>
              {countries.map((country) => (
                <li key={country}>
                  <Link href={`/tours/${country}`}>{country}</Link>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <Heading size="lg">By destination:</Heading>
            <ul>
              {destinations.map((destination) => (
                <li key={destination}>
                  <Link href={`/tours/imaginary-country/${destination}`}>
                    {destination}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <Heading size="lg">By products:</Heading>
            <ul>
              {products.map((product) => (
                <li key={product}>
                  <Link href={`/tours/imaginary-destination/${product}`}>
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </VStack>
    </Center>
  );
}

export default Slug;
