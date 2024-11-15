import { render } from '@testing-library/react';

import EcommLibFeature from './ecomm-lib-feature';

describe('EcommLibFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EcommLibFeature />);
    expect(baseElement).toBeTruthy();
  });
});
