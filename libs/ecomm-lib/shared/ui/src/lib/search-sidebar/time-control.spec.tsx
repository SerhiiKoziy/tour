import { fireEvent, render, screen } from '@testing-library/react';

import { useTranslation } from 'react-i18next';

import TimeControl from './time-control';

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

describe('TimeControl', () => {
  it('should render successfully', () => {
    const mockSetTime = jest.fn();

    const { baseElement } = render(
      <TimeControl time={[]} setTime={mockSetTime} />
    );

    expect(screen.getByText(/search.sidebar.time.morning/i)).toBeTruthy();
    expect(screen.getByText(/search.sidebar.time.noon/i)).toBeTruthy();
    expect(screen.getByText(/search.sidebar.time.3pm/i)).toBeTruthy();
    expect(screen.getByText(/search.sidebar.time.6pm/i)).toBeTruthy();

    expect(mockSetTime).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle default "Morning - Noon" and "3 PM - 6 PM" times default selected', () => {
    const { getByLabelText } = render(
      <TimeControl time={['morning', '3pm']} setTime={jest.fn()} />
    );

    const morning = getByLabelText(
      /search.sidebar.time.morning/i
    ) as HTMLInputElement;
    const noon = getByLabelText(/search.sidebar.time.3pm/i) as HTMLInputElement;

    expect(morning.checked).toBeTruthy();
    expect(noon.checked).toBeTruthy();
  });

  it('should handle Time buttons callback successfully', () => {
    const mockSetTime = jest.fn();

    const { getByLabelText } = render(
      <TimeControl time={[]} setTime={mockSetTime} />
    );
    const morningTime = getByLabelText(
      /search.sidebar.time.morning/i
    ) as HTMLInputElement;

    expect(mockSetTime).not.toHaveBeenCalled();

    fireEvent.click(morningTime);

    expect(mockSetTime).toHaveBeenCalledTimes(1);
  });
});
