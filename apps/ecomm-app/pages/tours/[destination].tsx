import {
  City,
  fetchCities,
  fetchTours,
  fetchToursByDestination,
  Tour,
  ToursResults,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { Search as SearchView } from '@visit/ecomm-lib/feature';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ req, res, locale, query, ..._etc }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature

      const city = Array.isArray(query.destination)
        ? query.destination.toString()
        : query.destination;

      // Validating page number and offset
      const page = Number(query.page ?? 1);
      const offset = Number(query.offset ?? 15);
      const date = query.date?.toString() ?? null;
      const tag = query.tag?.toString() ?? null;
      const sort = query.sort?.toString() ?? null;

      const cities = await fetchCities();
      const searchResults = await fetchToursByDestination(
        city,
        page,
        offset,
        date,
        tag,
        sort
      );
      const mostPopularTours = await fetchTours();

      return {
        props: {
          cities,
          tours: mostPopularTours,
          searchResults,
          page,
          offset,
          date,
          tag,
          sort,
          ...(await serverSideTranslations(
            locale,
            ['common', 'search', 'footer'],
            i18nConfig
          )),
        },
      };
    }
);

interface SearchProps {
  cities: City[];
  tours: Tour[];
  searchResults: ToursResults;
  // filter variables we may get from the query string
  page?: number;
  offset?: number;
  date?: string;
  tag?: string;
  sort?: string;
}

export function Search({
  cities,
  tours,
  searchResults,
  page,
  offset,
  date,
  tag,
  sort,
}: SearchProps) {
  return (
    <SearchView
      cities={cities}
      tours={tours}
      searchResults={searchResults}
      page={page}
      offset={offset}
      date={date}
      tag={tag}
      sort={sort}
    />
  );
}

export default Search;
