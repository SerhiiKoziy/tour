import { City, Tour } from '@visit/ecomm-lib/shared/data-access';
import { ProductDetails } from './../product-details/product-details';
import { Search } from './../search/search';

function chooseView(type: string) {
  let component: typeof Search | typeof ProductDetails = Search;
  switch (type) {
    case 'product':
      component = ProductDetails;
      break;
    case 'category': // TODO validate how to handle people's choice and similar tours (empty results)
    case 'country': // TODO change when we have the country view
    case 'destination': // TODO change when we have the country view
      component = Search;
      break;
  }

  return component;
}

function formatResults(results: any, type: string) {
  let formattedResults = results;
  switch (type) {
    case 'product':
      formattedResults = { tour: results };
      break;
    case 'category':
      formattedResults = {
        searchResults: { tours: results, total: results.length },
      };
      break;
    case 'country':
      formattedResults = {
        searchResults: { tours: results, total: results.length },
      };
      break;
    case 'destination':
      formattedResults = {
        searchResults: { tours: results, total: results.length },
      };
      break;
  }

  return formattedResults;
}

interface SlugProps {
  results: any;
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
  const Component = chooseView(type.toLowerCase());
  const resultsProps = formatResults(results, type.toLowerCase());
  return (
    <Component
      cities={cities}
      tours={tours}
      page={page}
      offset={offset}
      date={date}
      tag={tag}
      sort={sort}
      {...resultsProps}
    />
  );
}

export default Slug;
