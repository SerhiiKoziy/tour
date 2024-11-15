import { render, screen } from '@testing-library/react';
import { cities } from '@visit/ecomm-lib/shared/data-access';

import BaseLayout, { PlainLayout } from './base-layout';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';

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

// TODO this should be in a helper/mock lib

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));

// TODO this should be in a helper/mock lib

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockReturnValue(true),
  };
});

describe('BaseLayout', () => {
  it('should render PlainLayout successfully', () => {
    const { baseElement } = render(<PlainLayout cities={cities} />);
    expect(baseElement).toBeTruthy();
    // Header section
    expect(baseElement.querySelector('header')).toBeTruthy();
    // Footer section
    expect(baseElement.querySelector('footer')).toBeTruthy();
  });

  it('should render BaseLayout successfully', () => {
    const { baseElement } = render(<BaseLayout cities={cities} />);
    expect(baseElement).toBeTruthy();
    // Header section
    expect(baseElement.querySelector('header')).toBeTruthy();
    // Subscribe Banner
    expect(screen.getByText('subscribe.subscribeForDiscounts')).toBeTruthy();
    expect(screen.getByText('subscribe.youWillReceiveDiscounts')).toBeTruthy();

    // Most Popular Cities
    expect(screen.getByText('mostPopularCities.title')).toBeTruthy();

    // Footer
    expect(screen.getByText('letsPartner')).toBeTruthy();
  });
});
