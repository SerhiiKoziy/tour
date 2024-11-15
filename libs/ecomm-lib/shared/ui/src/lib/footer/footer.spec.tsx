import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './footer';

// TODO this should be in a beforeEach or beforeAll block to allow 
// spies to be reset
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str: string, config: unknown): string|Array<string> => (config ? ["dummy phone"] : str));
const useTranslationSpy = useTranslation as jest.Mock;

useTranslationSpy.mockReturnValue({
  t: tSpy,
});

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeTruthy();
  });
  it('should display a list if I click on international contact', () => {
    const { baseElement } = render(<Footer />);

    userEvent.click(screen.getByText('contactInternational.description'));
    expect(screen.findByText('dummy phone')).toBeTruthy();
    
    expect(baseElement).toBeTruthy();
  });
});
