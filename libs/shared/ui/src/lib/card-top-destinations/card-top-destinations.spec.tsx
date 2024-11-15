import { render, screen } from '@testing-library/react';

import DestinationCard from './card-top-destinations';

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

describe('DestinationCard', () => {
  it('should render successfully', () => {
    const city = { city: 'Miami', path: '/miami', src: '' };
    const { baseElement } = render(<DestinationCard destination={city} />);
    expect(screen.findByText('Miami')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
