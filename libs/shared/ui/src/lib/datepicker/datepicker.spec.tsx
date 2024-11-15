import { render } from '@testing-library/react';

import Datepicker from './datepicker';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => 0),
  };
});

describe('Datepicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Datepicker />);
    expect(baseElement).toBeTruthy();
  });
});
