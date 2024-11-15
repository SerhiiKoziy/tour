import {
  City,
  HelpCenterQuestion,
  fetchCities,
  fetchHelpCenterQuestion,
  wrapper,
} from "@visit/ecomm-lib/shared/data-access";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "../../next-i18next.config";
import { HelpWrapper } from "@visit/ecomm-lib/feature";

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ locale }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature
      const cities = await fetchCities();
      const questionsList = await fetchHelpCenterQuestion();
      return {
        props: {
          cities,
          questionsList,
          ...(await serverSideTranslations(
            locale,
            ["common", "footer", "cancellation-policy"],
            i18nConfig
          )),
        },
      };
    }
);

interface HelpCenterProps {
  cities: City[];
  questionsList: HelpCenterQuestion[];
}

export function HelpCenter({ cities, questionsList }: HelpCenterProps) {
  return <HelpWrapper cities={cities} questionsList={questionsList} />
}

export default HelpCenter;
