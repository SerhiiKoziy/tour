import { render } from '@testing-library/react';

import Image from './image';

import mockedImageComponent from 'next/image';

// TODO this should be in a helper/mock lib

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(),
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

describe('Image', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Image src={''} alt={''} />);
    expect(baseElement).toBeTruthy();
    expect(mockedImageComponent).toBeCalledTimes(1);
  });
});
