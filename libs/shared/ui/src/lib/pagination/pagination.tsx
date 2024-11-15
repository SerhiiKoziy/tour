import {
  Square,
  HStack,
  IconButton,
  SquareProps,
  Hide,
  Show,
  Link,
  IconButtonProps,
} from '@chakra-ui/react';
import { ArrowLeft, ArrowRight } from '@icon-park/react';
import { useTranslation } from 'next-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  numberOfButtons?: number;
  deltaStartButton?: number;
  deltaEndButton?: number;
  onPageChange: any; // This a bit difficult to type, let's do it later
}

interface InternalPaginationProps extends PaginationProps {
  t: (message: string) => string;
}

interface PageButtonProps extends IconButtonProps {
  isActive?: boolean;
  children?: number | string;
}

const PageButton = ({
  children,
  isActive,
  onClick,
  ...rest
}: PageButtonProps) => {
  return (
    <IconButton
      as={Link}
      {...rest}
      fontSize="md"
      size="lg"
      variant="outline"
      color={isActive ? 'primary.600' : ''}
      onClick={onClick}
      // href={null}
      icon={<>{children}</>}
    >
      {children}
    </IconButton>
  );
  /*return (
    <Square
      as={Link}
      size="12"
      fontSize="md"
      variant="outline"
      color={isActive ? 'primary.600' : ''}
      onClick={onClick}
      href="#"
    >
      {children}
    </Square>
  );*/
};

export const DesktopPagination = ({
  currentPage = 1,
  totalPages = 24,
  numberOfButtons = 7,
  deltaStartButton = 2,
  deltaEndButton = 4,
  onPageChange,
  t,
}: InternalPaginationProps) => {
  const pages = [];

  // sanitazing where the last dots button will be
  deltaEndButton =
    deltaEndButton >= numberOfButtons ? numberOfButtons - 1 : deltaEndButton;

  // preious page: page before the current page number
  let previousPage = currentPage - 1 >= 1 ? currentPage - 1 : 1;
  // next pagg: the page number right afterrr the current page number
  let nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;

  // calculating if we need the last dots button
  deltaEndButton =
    nextPage === totalPages - 1 ||
    nextPage + 1 === totalPages - 1 ||
    totalPages < numberOfButtons
      ? -1
      : nextPage + 1;

  // calculating if we ned the initial dots button
  deltaStartButton = previousPage > 3 ? 2 : -1;

  // to show 3 pages at least when the current page is the first one
  if (currentPage === 1) {
    deltaEndButton++;
    nextPage++;
  }

  // to show 3 pages at least when the current page is the last one
  if (currentPage === totalPages) {
    previousPage--;
  }

  // to show the page number if the next page button and the last page aare just 2 numbers of distance
  if (nextPage === totalPages - 2) {
    deltaEndButton = -1;
  }

  // not to show the dots page button if the previous page button and the first page aare just 2 numbers of distance
  if (previousPage - 2 === 1) {
    deltaStartButton = -1;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === deltaStartButton) {
      i = previousPage - 1;
      pages.push(
        <PageButton
          aria-label={`${t('pagination.page')} ${i}`}
          onClick={() => onPageChange(i)}
          key={i}
        >
          ...
        </PageButton>
      );
      continue;
    }

    if (i === deltaEndButton) {
      const dotsPage = i;
      pages.push(
        <PageButton
          aria-label={`${t('pagination.page')} ${dotsPage}`}
          onClick={() => onPageChange(dotsPage)}
          key={dotsPage}
        >
          ...
        </PageButton>
      );
      i = totalPages - 1;
      continue;
    }

    pages.push(
      <PageButton
        aria-label={`${t('pagination.page')} ${i}`}
        onClick={() => onPageChange(i)}
        isActive={i === currentPage}
        key={i}
      >
        {i}
      </PageButton>
    );
  }

  return (
    <HStack>
      <IconButton
        size="lg"
        fontSize="md"
        variant="outline"
        aria-label={t('pagination.previousPage')}
        icon={<ArrowLeft />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        as={Link}
        href="#"
      />
      {pages}
      <IconButton
        size="lg"
        fontSize="md"
        variant="outline"
        aria-label={t('pagination.nextPage')}
        icon={<ArrowRight />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        as={Link}
        href="#"
      />
    </HStack>
  );
};

export const MobilePagination = ({
  currentPage = 1,
  totalPages = 24,
  numberOfButtons = 4,
  onPageChange,
  t,
}: InternalPaginationProps) => {
  const pages = [];
  // const { t } = useTranslation('common');
  // preious page: page before the current page number
  const previousPage = currentPage - 1 >= 1 ? currentPage - 1 : 1;
  // next pagg: the page number right after the current page number
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;

  // calculating if we need the last dots button
  const deltaEndButton =
    nextPage === totalPages - 1 ||
    previousPage + 2 === totalPages ||
    totalPages <= numberOfButtons
      ? -1
      : previousPage + 2;

  // Calculate initial page
  const initialPage =
    totalPages <= numberOfButtons
      ? 1
      : totalPages - previousPage < numberOfButtons
      ? totalPages - numberOfButtons + 1
      : previousPage;

  for (let i = initialPage; i <= totalPages; i++) {
    if (i === deltaEndButton) {
      const dotsPage = i;
      pages.push(
        <PageButton
          aria-label={`${t('pagination.page')} ${dotsPage}`}
          onClick={() => onPageChange(dotsPage)}
          key={dotsPage}
        >
          ...
        </PageButton>
      );
      i = totalPages - 1;
      continue;
    }

    pages.push(
      <PageButton
        aria-label={`${t('pagination.page')} ${i}`}
        onClick={() => onPageChange(i)}
        isActive={i === currentPage}
        key={i}
      >
        {i}
      </PageButton>
    );
  }

  return (
    <HStack>
      <IconButton
        as={Link}
        size="lg"
        fontSize="md"
        variant="outline"
        aria-label={t('pagination.previousPage')}
        icon={<ArrowLeft />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        href="#"
      />
      {pages}
      <IconButton
        as={Link}
        size="lg"
        fontSize="md"
        variant="outline"
        aria-label={t('pagination.nextPage')}
        icon={<ArrowRight />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        href="#"
      />
    </HStack>
  );
};

export const Pagination = ({
  currentPage = 1,
  totalPages = 24,
  numberOfButtons = 7,
  deltaStartButton = 2,
  deltaEndButton = 4,
  onPageChange,
}: PaginationProps) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Hide above="lg">
        <MobilePagination
          t={t}
          currentPage={currentPage}
          totalPages={totalPages}
          numberOfButtons={numberOfButtons}
          deltaStartButton={deltaStartButton}
          deltaEndButton={deltaEndButton}
          onPageChange={onPageChange}
        />
      </Hide>
      <Show above="lg">
        <DesktopPagination
          t={t}
          currentPage={currentPage}
          totalPages={totalPages}
          numberOfButtons={numberOfButtons}
          deltaStartButton={deltaStartButton}
          deltaEndButton={deltaEndButton}
          onPageChange={onPageChange}
        />
      </Show>
    </>
  );
};

export default Pagination;
