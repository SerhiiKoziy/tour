import { render, screen } from '@testing-library/react';

import TopDestinations from './top-destinations';

import { useTranslation } from 'react-i18next';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useTheme: jest.fn().mockImplementation(() => ({
      colors: { gradientOverlay: { dark: '', light: '' } },
    })),
  };
});

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

describe('TopDestinations', () => {
  it('should render successfully', () => {
    const cities = [
      { city: 'Paris', path: '/paris' },
      { city: 'London', path: '/london' },
    ];
    const { baseElement } = render(<TopDestinations cities={cities} />);
    expect(screen.findByText('topDestinations.title')).toBeTruthy();
    expect(
      screen.findByText('topDestinations.experienceTheWorld')
    ).toBeTruthy();
    expect(screen.findByText('Paris')).toBeTruthy();
    expect(screen.findByText('London')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
