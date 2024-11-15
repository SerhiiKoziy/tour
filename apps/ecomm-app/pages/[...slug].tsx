import {
  City,
  fetchCities,
  fetchTours,
  formatSeoResults,
  getResultByTag,
  getResultByType,
  Tour,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../next-i18next.config';
import { Slug as SlugView } from '@visit/ecomm-lib/feature';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ locale, query }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature

      const { slug } = query;

      const lastSlug = slug[slug.length - 1];

      const type = await getResultByTag(lastSlug);
      const results = await getResultByType(lastSlug, type);
      const formattedResults = await formatSeoResults(results, type);

      // TODO this should be in a provider
      const cities = await fetchCities();
      const tours = await fetchTours();
      // END TODO

      // Validating page number and offset
      // TODO this should be validated only for the Search view
      const page = Number(query.page ?? 1);
      const offset = Number(query.offset ?? 15);
      const date = query.date?.toString() ?? null;
      const tag = query.tag?.toString() ?? null;
      const sort = query.sort?.toString() ?? null;

      return {
        props: {
          results: formattedResults,
          type,
          cities,
          tours,
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

interface SlugProps {
  results: Tour | Tour[] | null;
  type: string;
  // Provider values
  cities: City[];
  tours: Tour[];
  // filter variables we may get from the query string
  page?: number;
  offset?: number;
  date?: string;
  tag?: string;
  sort?: string;
}

export function Slug({
  results,
  type,
  cities,
  tours,
  page,
  offset,
  date,
  tag,
  sort,
}: SlugProps) {
  return (
    <SlugView
      type={type}
      results={results}
      cities={cities}
      tours={tours}
      page={page}
      offset={offset}
      date={date}
      tag={tag}
      sort={sort}
    />
  );
}

export default Slug;
