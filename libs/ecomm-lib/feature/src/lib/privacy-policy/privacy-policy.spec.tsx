import { render } from '@testing-library/react';
import { City } from '@visit/ecomm-lib/shared/data-access';

import PrivacyPolicy from './privacy-policy';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';
import { InformationElements } from '../information-view/information-view';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
  Trans: jest.fn(),
}));

jest.mock('../information-view/information-view', () => {
  const originalModule = jest.requireActual(
    '../information-view/information-view'
  );
  return {
    __esModule: true,
    ...originalModule,
    InformationView: jest.fn(),
  };
});

const tSpy = jest.fn(
  (str: string): string | Record<string, InformationElements> =>
    str === 'elements'
      ? {
          myTitle: {
            title: 'Definitions',
            description: ['Description 1', 'Description 2', 'Description 3'],
          },
          mySpecialTitle: {
            title: 'Special <container>Section</container>',
            description: [
              'Special Description 1',
              'Special Description <red-link>2</red-link>',
              'Special Description 3',
            ],
          },
        }
      : str
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

describe('Privacy Policy', () => {
  let cities: City[], isLogged: boolean;

  beforeAll(() => {
    cities = [];
    isLogged = false;
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <PrivacyPolicy cities={cities} isLogged={isLogged} user={undefined} />
    );
    expect(baseElement).toBeTruthy();
    expect(useTranslationSpy).toHaveBeenCalledWith('privacy-policy');
  });
});
