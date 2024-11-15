import { render, screen } from '@testing-library/react';
import Slug from './slug';

jest.mock('./../product-details/product-details', () => ({
  ProductDetails: () => 'Product Details View',
}));
jest.mock('./../search/search', () => ({ Search: () => 'Search View' }));

describe('Slug', () => {
  it('should render Search successfully if the type is country, destination, or category', () => {
    const { baseElement: countryElement, unmount: countryUnmount } = render(
      <Slug
        type="country"
        results={{
          tours: [],
          total: 0,
        }}
        user={undefined}
        cities={[]}
        tours={[]}
        isLogged={false}
        page={1}
        offset={15}
      />
    );
    expect(countryElement).toBeTruthy();
    expect(screen.queryByText('Search View')).toBeTruthy();

    countryUnmount();
    expect(screen.queryByText('Search View')).not.toBeTruthy();

    const { baseElement: destinationElement, unmount: destinationUnmount } =
      render(
        <Slug
          type="country"
          results={{
            tours: [],
            total: 0,
          }}
          user={undefined}
          cities={[]}
          tours={[]}
          isLogged={false}
          page={1}
          offset={15}
        />
      );
    expect(destinationElement).toBeTruthy();
    expect(screen.queryByText('Search View')).toBeTruthy();

    destinationUnmount();
    expect(screen.queryByText('Search View')).not.toBeTruthy();

    const { baseElement: categoryElement, unmount: categoryUnmount } = render(
      <Slug
        type="country"
        results={{
          tours: [],
          total: 0,
        }}
        user={undefined}
        cities={[]}
        tours={[]}
        isLogged={false}
        page={1}
        offset={15}
      />
    );
    expect(categoryElement).toBeTruthy();
    expect(screen.queryByText('Search View')).toBeTruthy();

    categoryUnmount();
  });

  it('should render ProductDetails successfully if the type is product', () => {
    const { baseElement } = render(
      <Slug
        type="product"
        results={{
          tours: [],
          total: 0,
        }}
        user={undefined}
        cities={[]}
        tours={[]}
        isLogged={false}
        page={1}
        offset={15}
      />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('Product Details View')).toBeTruthy();
  });
});
