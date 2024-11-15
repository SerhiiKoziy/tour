import styles from './ecomm-lib-feature.module.scss';

/* eslint-disable-next-line */
export interface EcommLibFeatureProps {}

export function EcommLibFeature(props: EcommLibFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EcommLibFeature!</h1>
    </div>
  );
}

export default EcommLibFeature;
