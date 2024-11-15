import { fireEvent, render, screen } from '@testing-library/react';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';

import { useTranslation } from 'react-i18next';
import AttractionsControlFilter, { Attractions } from './attractions-control';

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

describe('AttractionsControl', () => {
  let tours: Tour[];
  let attractions: {
    [key: string]: Tour[];
  };

  beforeAll(() => {
    tours = mockedTours;
    attractions = tours.reduce((attractions: Attractions, tour: Tour) => {
      tour.attractions.forEach((attr: string) => {
        const toursByAttr = attractions[attr] || (attractions[attr] = []);
        toursByAttr.push(tour);
      });
      return attractions;
    }, {});
  });

  it('should render successfully grouped cities', () => {
    const mockSetAttraction = jest.fn();
    const { baseElement } = render(
      <AttractionsControlFilter
        city=""
        attraction=""
        attractions={attractions}
        setAttraction={mockSetAttraction}
      />
    );

    Object.keys(attractions)
      .slice(0, 4)
      .forEach((attraction) => {
        expect(screen.getByText(attraction)).toBeTruthy();
      });

    expect(mockSetAttraction).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should show all Attractions when clicking View All Attractions button', () => {
    render(
      <AttractionsControlFilter
        city=""
        attraction=""
        attractions={attractions}
        setAttraction={jest.fn()}
      />
    );

    const allAttractionsBtn = screen.getByRole('button', {
      name: /search.sidebar.attractions.allAttractions/i,
    });
    fireEvent.click(allAttractionsBtn);

    Object.keys(attractions).forEach((attraction) => {
      expect(screen.getByText(attraction)).toBeTruthy();
    });
  });

  it('should show All Rome Tours item when selecting Rome in Destinations filter', () => {
    render(
      <AttractionsControlFilter
        city="Rome"
        attraction=""
        attractions={attractions}
        setAttraction={jest.fn()}
      />
    );

    expect(
      screen.getByText(
        /search.sidebar.attractions.all Rome search.sidebar.attractions.tours/i
      )
    ).toBeTruthy();
  });

  it('should handle default Colosseum attraction selected', () => {
    const { getByLabelText } = render(
      <AttractionsControlFilter
        city=""
        attraction="Colosseum"
        attractions={attractions}
        setAttraction={jest.fn()}
      />
    );

    const colosseumAttr = getByLabelText(/colosseum/i) as HTMLInputElement;
    const vaticanAttr = getByLabelText(/vatican/i) as HTMLInputElement;

    expect(colosseumAttr.checked).toBeTruthy();
    expect(vaticanAttr.checked).toBeFalsy();
  });

  it('should handle Attraction button callback successfully', () => {
    const mockSetAttraction = jest.fn();
    const { getByLabelText } = render(
      <AttractionsControlFilter
        city=""
        attraction="Colosseum"
        attractions={attractions}
        setAttraction={mockSetAttraction}
      />
    );
    const vaticanAttr = getByLabelText(/vatican/i) as HTMLInputElement;

    expect(mockSetAttraction).not.toHaveBeenCalled();

    fireEvent.click(vaticanAttr);

    expect(mockSetAttraction).toHaveBeenCalledTimes(1);
  });
});
