import dynamic from 'next/dynamic';
import { Links } from '.';
import styles from '../index.module.scss';

const EcommLibSharedUi = dynamic(
  () =>
    import('@visit/ecomm-lib/shared/ui').then(
      (mod) => mod.EcommLibSharedUi
    ),
  {
    ssr: false,
  }
);

export function DynamicImport() {
  return (
    <div className={styles.page}>
      Some test page to be pre-loaded. This won&#39;t throw a hydration error
      because of server HTML is not the same as client side We would need to use
      the dynamic import to avoid the issue
      <br />
      <EcommLibSharedUi />
      <Links />
    </div>
  );
}

export default DynamicImport;
