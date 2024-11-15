import { render, screen } from '@testing-library/react';
import { City } from '@visit/ecomm-lib/shared/data-access';

import InformationView, { InformationElements } from './information-view';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation, Trans } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
  Trans: jest.fn(),
}));

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
const translationMocked = Trans as jest.Mock;

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

describe('Information View', () => {
  let cities: City[], isLogged: boolean;

  beforeAll(() => {
    cities = [];
    isLogged = false;
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <InformationView
        cities={cities}
        isLogged={isLogged}
        user={undefined}
        defaultSection="mySpecialTitle"
        t={tSpy}
      />
    );
    expect(baseElement).toBeTruthy();

    expect(screen.queryByText('title')).toBeTruthy();
    expect(screen.queryByText('subtitle')).toBeTruthy();

    expect(tSpy).toHaveBeenNthCalledWith(1, 'elements', {
      returnObjects: true,
    });
    expect(tSpy).toHaveBeenNthCalledWith(2, 'title');
    expect(tSpy).toHaveBeenNthCalledWith(3, 'subtitle');

    expect(translationMocked).toBeCalledTimes(2);
  });
});
