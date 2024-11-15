import { render, screen } from '@testing-library/react';

import { useTranslation } from 'react-i18next';

import Hero, { HeroSearch } from './hero';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => ({
      base: 160,
      sm: 500,
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

describe('Hero', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hero />);
    expect(screen.findByText('Need better opening text')).toBeTruthy();
    expect(
      screen.findByText('Find the Best Tours & Attractions across the world')
    ).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render Hero Search successfully', () => {
    const { baseElement } = render(
      <HeroSearch
        title="The Best Rome Tours"
        subtitle="Don’t miss out on Rome’s deep history with our local guides"
        description="Some tour description"
      />
    );
    expect(screen.getByText('The Best Rome Tours')).toBeTruthy();
    expect(
      screen.getByText(
        'Don’t miss out on Rome’s deep history with our local guides'
      )
    ).toBeTruthy();
    expect(screen.getByText('Some tour description')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
