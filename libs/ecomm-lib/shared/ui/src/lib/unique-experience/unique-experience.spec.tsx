import { render, screen } from '@testing-library/react';

import UniqueExperience from './unique-experience';

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

describe('UniqueExperience', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UniqueExperience />);
    expect(screen.findByText('uniqueExperience.title')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.post.title')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.post.subtitle')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.idea.title')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.idea.subtitle')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.openMap.title')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.openMap.subtitle')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.support.title')).toBeTruthy();
    expect(screen.findByText('uniqueExperience.support.subtitle')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
