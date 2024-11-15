import { useTranslation } from 'next-i18next';
import { City } from '@visit/ecomm-lib/shared/data-access';
import { InformationView } from '../information-view/information-view';

interface TermsConditionsProps {
  cities: City[];
}

export function TermsConditions({ cities }: TermsConditionsProps) {
  const { t } = useTranslation('terms-conditions');

  return <InformationView cities={cities} t={t} defaultSection="definitions" />;
}

export default TermsConditions;
