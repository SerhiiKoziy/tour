import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { useTranslation } from 'react-i18next';
import { DesktopPagination, MobilePagination } from './pagination';
import userEvent from '@testing-library/user-event';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => 0),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str: string): string => str);
const useTranslationSpy = useTranslation as jest.Mock;

useTranslationSpy.mockReturnValue({
  t: tSpy,
});

describe('Pagination', () => {
  describe('Desktop Pagination', () => {
    it('should render successfully', async () => {
      const clickSpy = jest.fn();
      const { baseElement } = render(
        <DesktopPagination
          t={tSpy}
          currentPage={1}
          totalPages={20}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement).toBeTruthy();
      const pages = baseElement.querySelectorAll('a');

      expect(pages.length).toBe(7);

      await userEvent.click(pages[0]);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should render 1, 2, 3, 4, and 5 page buttons', async () => {
      const clickSpy = jest.fn();
      const { baseElement: baseElement1, unmount: unmount1 } = render(
        <DesktopPagination
          t={tSpy}
          currentPage={1}
          totalPages={1}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement1).toBeTruthy();
      expect(baseElement1.querySelectorAll('a').length).toBe(3);

      unmount1();

      const { baseElement: baseElement2, unmount: unmount2 } = render(
        <DesktopPagination
          t={tSpy}
          currentPage={1}
          totalPages={2}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement2).toBeTruthy();
      expect(baseElement2.querySelectorAll('a').length).toBe(4);

      unmount2();

      const { baseElement: baseElement3, unmount: unmount3 } = render(
        <DesktopPagination
          t={tSpy}
          currentPage={1}
          totalPages={3}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement3).toBeTruthy();
      expect(baseElement3.querySelectorAll('a').length).toBe(5);

      unmount3();

      const { baseElement: baseElement4, unmount: unmount4 } = render(
        <DesktopPagination
          t={tSpy}
          currentPage={1}
          totalPages={4}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement4).toBeTruthy();
      expect(baseElement4.querySelectorAll('a').length).toBe(6);

      unmount4();

      const { baseElement: baseElement5, unmount: unmount5 } = render(
        <DesktopPagination
          t={tSpy}
          currentPage={1}
          totalPages={5}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement5).toBeTruthy();
      expect(baseElement5.querySelectorAll('a').length).toBe(7);

      unmount5();
    });

    it('should render 9 buttons if the current page is in the middle of the range', async () => {
      const clickSpy = jest.fn();
      const { baseElement } = render(
        <DesktopPagination
          t={tSpy}
          currentPage={10}
          totalPages={20}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement).toBeTruthy();
      const pages = baseElement.querySelectorAll('a');
      expect(pages.length).toBe(9);

      expect(screen.queryAllByText('...').length).toBe(2);
    });
  });

  describe('Mobile Pagination', () => {
    it('should render successfully', async () => {
      const clickSpy = jest.fn();
      const { baseElement } = render(
        <MobilePagination
          t={tSpy}
          currentPage={1}
          totalPages={20}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement).toBeTruthy();
      const pages = baseElement.querySelectorAll('a');
      expect(pages.length).toBe(6);

      await userEvent.click(pages[0]);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should render 1, 2, 3, and 4 page buttons', async () => {
      const clickSpy = jest.fn();
      const { baseElement: baseElement1, unmount: unmount1 } = render(
        <MobilePagination
          t={tSpy}
          currentPage={1}
          totalPages={1}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement1).toBeTruthy();
      expect(baseElement1.querySelectorAll('a').length).toBe(3);

      unmount1();

      const { baseElement: baseElement2, unmount: unmount2 } = render(
        <MobilePagination
          t={tSpy}
          currentPage={1}
          totalPages={2}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement2).toBeTruthy();
      expect(baseElement2.querySelectorAll('a').length).toBe(4);

      unmount2();

      const { baseElement: baseElement3, unmount: unmount3 } = render(
        <MobilePagination
          t={tSpy}
          currentPage={1}
          totalPages={3}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement3).toBeTruthy();
      expect(baseElement3.querySelectorAll('a').length).toBe(5);

      unmount3();

      const { baseElement: baseElement4, unmount: unmount4 } = render(
        <MobilePagination
          t={tSpy}
          currentPage={1}
          totalPages={4}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement4).toBeTruthy();
      expect(baseElement4.querySelectorAll('a').length).toBe(6);

      unmount4();

      const { baseElement: baseElement5, unmount: unmount5 } = render(
        <MobilePagination
          t={tSpy}
          currentPage={1}
          totalPages={5}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement5).toBeTruthy();
      expect(baseElement5.querySelectorAll('a').length).toBe(6);

      unmount5();
    });

    it('should render 6 buttons if the current page is in the middle of the range', async () => {
      const clickSpy = jest.fn();
      const { baseElement } = render(
        <MobilePagination
          t={tSpy}
          currentPage={10}
          totalPages={20}
          onPageChange={(page: number) => clickSpy(page)}
        />
      );
      expect(baseElement).toBeTruthy();
      const pages = baseElement.querySelectorAll('a');
      expect(pages.length).toBe(6);

      expect(screen.queryAllByText('...').length).toBe(1);
    });
  });
});
