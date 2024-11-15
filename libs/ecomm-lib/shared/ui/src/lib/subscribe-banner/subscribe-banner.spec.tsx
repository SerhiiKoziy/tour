import { fireEvent, render, screen } from '@testing-library/react';

import SubscribeBanner from './subscribe-banner';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
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

describe('SubscribeBanner', () => {
  it('should render the form to subscribe if the user is not subscribed', async () => {
    const clickSpy = jest.fn();

    const { baseElement } = render(
      <SubscribeBanner isSubscribed={false} onClickCallback={clickSpy} />
    );
    const subscribeButton = screen.getByText('subscribe.ctaText');
    expect(subscribeButton).toBeTruthy();
    expect(screen.queryByText('subscribe.subscriptionThanks')).not.toBeTruthy();
    expect(baseElement).toBeTruthy();

    fireEvent.click(subscribeButton);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should render a sucessfull message if the user is already subscribed', () => {
    const { baseElement } = render(<SubscribeBanner isSubscribed={true} />);
    expect(screen.queryByText('subscribe.ctaText')).not.toBeTruthy();
    expect(screen.findByText('subscribe.subscriptionThanks')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
