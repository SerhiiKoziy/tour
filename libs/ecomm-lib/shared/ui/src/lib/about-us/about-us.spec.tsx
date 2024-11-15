import { render, screen } from '@testing-library/react';

import AboutUs from './about-us';

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

describe('AboutUs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutUs />);
    expect(baseElement).toBeTruthy();
    expect(screen.findByText('aboutUs.title')).toBeTruthy();
    expect(screen.findByText('aboutUs.aboutUsDetails')).toBeTruthy();
    expect(screen.findByText('aboutUs.yearsInTourism')).toBeTruthy();
    expect(screen.findByText('aboutUs.yearsInTourismDetails')).toBeTruthy();
    expect(screen.findByText('aboutUs.uniqueTours')).toBeTruthy();
    expect(screen.findByText('aboutUs.uniqueToursDetails')).toBeTruthy();
    expect(screen.findByText('aboutUs.happyCustomers')).toBeTruthy();
    expect(screen.findByText('aboutUs.happyCustomersDetails')).toBeTruthy();
  });
});
