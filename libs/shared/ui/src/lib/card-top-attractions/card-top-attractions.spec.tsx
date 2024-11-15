import { render, screen } from '@testing-library/react';

import AttractionCard from './card-top-attractions';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useTheme: jest.fn().mockImplementation(() => ({
      colors: { gradientOverlay: { halfLinearDark: '' } },
    })),
  };
});

describe('AttractionCard', () => {
  it('should render successfully', () => {
    const city = { city: 'Miami', path: '/miami', src: '' };
    const { baseElement } = render(<AttractionCard attraction={city} />);
    expect(screen.findByText('Miami')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
