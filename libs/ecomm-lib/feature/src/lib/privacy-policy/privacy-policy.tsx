import { useTranslation } from 'next-i18next';
import { City } from '@visit/ecomm-lib/shared/data-access';
import { InformationView } from '../information-view/information-view';

interface PrivacyPolicyProps {
  cities: City[];
}
export function PrivacyPolicy({ cities }: PrivacyPolicyProps) {
  const { t } = useTranslation('privacy-policy');

  return (
    <InformationView
      cities={cities}
      t={t}
      defaultSection="extra-eu-customers"
    />
  );
}

export default PrivacyPolicy;
