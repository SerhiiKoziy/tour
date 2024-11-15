import { EcommLibSharedUi, Footer } from '@visit/ecomm-lib/shared/ui';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';

import { Links } from '.';
import styles from '../index.module.scss';

export async function getServerSideProps({ locale }) {
  console.log(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      // Will be passed to the page component as props
    },
  };
}

export function Test() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      Some test page to be pre-loaded. This will throw a hydration error because
      of server HTML is not the same as client side We would need to use the
      dynamic import to avoid the issue
      <br />
      <EcommLibSharedUi />
      <Links />
      <Footer />
    </div>
  );
}

export default Test;
