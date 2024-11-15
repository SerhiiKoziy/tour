import {
  fetchCities,
  fetchTourById,
  fetchTourComments,
  fetchTourProposalCards,
  fetchCartSummary,
  City,
  Tour,
  TourProposal,
  CartData,
  TourComment,
  wrapper,
} from "@visit/ecomm-lib/shared/data-access";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "../../next-i18next.config";
import { ProductDetails } from "@visit/ecomm-lib/feature";

const DEFAULT_COMMENTS_TO_TAKE = 4;

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ req, res, locale, ..._etc}) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature

      const cities = await fetchCities();
      const tour = await fetchTourById("colosseum-dungeons-tour-with-roman-forum-palantine-hill");
      const tourProposalCards = await fetchTourProposalCards();
      const tourComments = await fetchTourComments(tour.id, DEFAULT_COMMENTS_TO_TAKE);
      const cartSummary = await fetchCartSummary();

      return {
        props: {
          cities,
          tour,
          tourProposalCards,
          cartSummary,
          tourComments,
          ...(await serverSideTranslations(
            locale,
            ["common", "footer"],
            i18nConfig
          )),
        },
      };
    }
);

interface TourDetailsProps {
  cities: City[];
  tour: Tour;
  tourProposalCards: TourProposal[];
  cartSummary: CartData[];
  tourComments: TourComment[];
}

export function TourDetails({
  cities,
  tour,
  tourProposalCards,
  cartSummary,
  tourComments
  }: TourDetailsProps) {
  return (
    <ProductDetails
      cities={cities}
      tour={tour}
      tourProposalCards={tourProposalCards}
      cartSummary={cartSummary}
      tourComments={tourComments}
    />
  );
}

export default TourDetails;
