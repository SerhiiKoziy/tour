import { render, screen } from '@testing-library/react';
import { Box } from '@chakra-ui/react';
import React from 'react';

import AccordionWrapper from './accordion-wrapper';

describe('AccordionWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AccordionWrapper title="Title">
        <Box>{'Description'}</Box>
      </AccordionWrapper>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('Title')).toBeTruthy();
    expect(screen.queryByText('Description')).toBeTruthy();
  });
});
