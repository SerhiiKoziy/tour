import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';

import WhatIncluded from './what-included';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str: string, config: unknown): string | Array<string> =>
  config ? ['dummy phone'] : str
);
const useTranslationSpy = useTranslation as jest.Mock;

useTranslationSpy.mockReturnValue({
  t: tSpy,
});

describe('WhatIncluded', () => {
  it('should render successfully', () => {
    const tour: Tour = mockedTours[0];
    const { baseElement } = render(<WhatIncluded tour={tour} />);

    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('whatIncluded.title')).toBeTruthy();
    tour.includes.forEach((include) => {
      expect(screen.queryByText(include.label)).toBeTruthy();
    });
  });
});
