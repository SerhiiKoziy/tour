import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@visit/ecomm-lib/shared/data-access';

import EcommLibSharedUi from './ecomm-lib-shared-ui';

describe('EcommLibSharedUi', () => {
  xit('should render successfully', () => {
    // isServer is true because:
    // 1. we do not need to persist the state
    // 2. the store in the client side is returning a message saying
    // Warning: An update to EcommLibSharedUi inside a test was not wrapped in act(...).
    // 3. we need to check this because we will need to check those components in the client side too
    const store = makeStore();

    // TODO this should be the approach, but Jest is throwing a warning about how we instantiate the JSX
    // For now, we will use the approach with Provider because it was faster to set up and it is good enough
    // to test our code
    // const { baseElement } = render(wrapper.withRedux(<EcommLibSharedUi />));
    // const { baseElement } = render(<Element ></Element>);

    const { baseElement } = render(
      <Provider store={store}>
        <EcommLibSharedUi />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
