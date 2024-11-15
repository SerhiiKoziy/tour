import { fireEvent, render, screen } from '@testing-library/react';

import DaysControlFilter from './days-control';

import { useTranslation } from 'react-i18next';

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

describe('DaysControl', () => {
  it('should render successfully', () => {
    const mockSetDays = jest.fn();
    const { baseElement } = render(
      <DaysControlFilter days={''} setDays={mockSetDays} />
    );

    expect(mockSetDays).not.toHaveBeenCalled();
    expect(screen.getByText('+ 1 search.sidebar.tourDate.day')).toBeTruthy();
    expect(screen.getByText('+ 2 search.sidebar.tourDate.days')).toBeTruthy();
    expect(screen.getByText('+ 4 search.sidebar.tourDate.days')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should handle default 2 Days button checked', () => {
    const { getByLabelText } = render(
      <DaysControlFilter days={'2'} setDays={jest.fn()} />
    );

    const radioOneDay = getByLabelText(/\+ 1/i) as HTMLInputElement;
    const radioTwoDays = getByLabelText(/\+ 2/i) as HTMLInputElement;
    const radioFourDays = getByLabelText(/\+ 4/i) as HTMLInputElement;

    expect(radioOneDay.checked).toBeFalsy();
    expect(radioTwoDays.checked).toBeTruthy();
    expect(radioFourDays.checked).toBeFalsy();
  });

  it('should handle Days buttons callback successfully', () => {
    const mockSetDays = jest.fn();
    const { getByLabelText } = render(
      <DaysControlFilter days={'1'} setDays={mockSetDays} />
    );
    const radioTwoDays = getByLabelText(/\+ 2/i) as HTMLInputElement;

    expect(mockSetDays).not.toHaveBeenCalled();

    fireEvent.click(radioTwoDays);

    expect(mockSetDays).toHaveBeenCalledTimes(1);
  });
});
