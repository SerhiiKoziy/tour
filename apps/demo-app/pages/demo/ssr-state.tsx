import {
  wrapper,
  addClientFavourite,
  fetchFavourite,
  addServerFavourite,
  fetchFavouriteThunk,
  useAppDispatch,
} from '@visit/ecomm-lib/shared/data-access';
import { EcommLibSharedUi } from '@visit/ecomm-lib/shared/ui';
import { Links } from '.';
import styles from '../index.module.scss';

/**
 * Notes:
 * - WARNING: we should not use the store in the server side, in this way we will avoid many headaches,
 * but in case it is needed, this is an example about how to do it.
 * - DANGER: try to avoid using the getInitialProps in _app.tsx file, if you do, this will disable the Automatic Static Optimization
 * - DANGER (this applies if you want to have a persisted store from the server):
 *   It seems we need to block the UI rendering on the UI side until the store is rehydrated. Or we may dispatch all the events/values
 *   sent for the server through serverProps from the client side to avoid this issue
 * according to https://nextjs.org/docs/messages/opt-out-auto-static-optimization
 * and https://github.com/kirill-konshin/next-redux-wrapper/tree/master#wrapperusewrappedstore
 */

// TODO check why when we use this way to import things, the UI rendering is not shown
// const EcommLibSharedUi = dynamic(() => import("@visit/ecomm-lib/shared/ui").then(mod => mod.EcommLibSharedUi), { ssr: false,});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, locale, ...etc }) => {
      const newFavourite = await fetchFavourite(100);
      store.dispatch(addServerFavourite(newFavourite));
      return {
        props: {
          newFavourite,
        },
      };
    }
);

export function SSRState(props) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.page}>
      Some test page to be pre-loaded. This may throw a hydration error because
      of server HTML is not the same as client side We would need to use the
      dynamic import to avoid the issue
      <br />
      <button onClick={() => dispatch(fetchFavouriteThunk(200))}>
        Lets add a new favourite using an async function
      </button>
      <br />
      <button onClick={() => dispatch(addClientFavourite(300))}>
        Lets add a new favourite using the addClientFavourite function
      </button>
      <br />
      <EcommLibSharedUi />
      <Links />
    </div>
  );
}

export default SSRState;
