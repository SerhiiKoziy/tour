import { useTranslation } from 'next-i18next';
import { City } from '@visit/ecomm-lib/shared/data-access';
import { InformationView } from '../information-view/information-view';

interface CancellationPolicyProps {
  cities: City[];
}

export function CancellationPolicy({ cities }: CancellationPolicyProps) {
  const { t } = useTranslation('cancellation-policy');

  return (
    <InformationView
      cities={cities}
      t={t}
      defaultSection="payments-refunds-and-cancellations"
    />
  );
}

export default CancellationPolicy;
