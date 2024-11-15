import { fireEvent, render, screen } from '@testing-library/react';

import { useTranslation } from 'react-i18next';
import DurationControl from './duration-control';

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

describe('DurationControl', () => {
  it('should render successfully', () => {
    const mockSetDuration = jest.fn();

    const { baseElement } = render(
      <DurationControl duration={[]} setDuration={mockSetDuration} />
    );

    expect(screen.getByText(/search.sidebar.duration.0/i)).toBeTruthy();
    expect(screen.getByText(/search.sidebar.duration.3/i)).toBeTruthy();
    expect(screen.getByText(/search.sidebar.duration.5/i)).toBeTruthy();
    expect(screen.getByText(/search.sidebar.duration.8/i)).toBeTruthy();

    expect(mockSetDuration).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle default "0 to 2.5 Hours" and "3 to 4.5 Hours" durations default selected', () => {
    const { getByLabelText } = render(
      <DurationControl duration={['0', '3']} setDuration={jest.fn()} />
    );

    const zeroCheck = getByLabelText(
      /search.sidebar.duration.0/i
    ) as HTMLInputElement;
    const threeCheck = getByLabelText(
      /search.sidebar.duration.3/i
    ) as HTMLInputElement;

    expect(zeroCheck.checked).toBeTruthy();
    expect(threeCheck.checked).toBeTruthy();
  });

  it('should handle Duration buttons callback successfully', () => {
    const mockSetDuration = jest.fn();

    const { getByLabelText } = render(
      <DurationControl duration={[]} setDuration={mockSetDuration} />
    );
    const morningTime = getByLabelText(
      /search.sidebar.duration.0/i
    ) as HTMLInputElement;

    expect(mockSetDuration).not.toHaveBeenCalled();

    fireEvent.click(morningTime);

    expect(mockSetDuration).toHaveBeenCalledTimes(1);
  });
});
