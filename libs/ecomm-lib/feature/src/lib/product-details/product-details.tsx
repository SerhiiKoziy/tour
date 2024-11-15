import { useState } from "react";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import {
  City,
  Tour,
  TourProposal,
  CartData,
  TourComment,
} from "@visit/ecomm-lib/shared/data-access";
import {
  BaseLayout,
  UniqueExperience,
  HeroTour,
} from "@visit/ecomm-lib/shared/ui";
import {
  BookNow,
  TourHeader,
  WhatIncluded,
  Itinerary,
  Ratings,
  SelectDate,
  TourProposalCard,
  TourOverview,
} from "@visit/shared/ui";

interface ProductDetailsProps {
  cities: City[];
  tour: Tour;
  tourProposalCards: TourProposal[];
  cartSummary: CartData[];
  tourComments: TourComment[];
}

export function ProductDetails({
  cities,
  tour,
  tourProposalCards,
  cartSummary,
  tourComments
}: ProductDetailsProps) {
  const [fetchedProposalsCards, setFetchedProposalsCards] = useState<TourProposal[] | null>(null);
  const { t } = useTranslation("common");

  const onSelectDate = () => {
    setFetchedProposalsCards(tourProposalCards);
  };

  return (
    <BaseLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        pt={{ base: "12", md: "12" }}
      >
        <TourHeader tour={tour} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        pt={{ base: "12", md: "12" }}
      >
        <HeroTour tour={tour} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        pt={{ base: "12", md: "12" }}
      >
        <HeroTour tour={tour} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY={{ base: "12", md: "12" }}
      >

        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem
            colSpan={{ base: 12, lg: 8 }}
            rowSpan={{ base: 1, lg: 2 }}
            pr={{ base: "0", lg: "4" }}
          >
            <Box
              minWidth="100%"
              maxWidth="100%"
              pt={{ base: "12", lg: "6" }}
            >
              <WhatIncluded tour={tour} />
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              paddingY={{ base: "12", lg: "12" }}
            >
              <Itinerary itineraries={tour.itineraries} />
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              pt="12"
            >
              <SelectDate tour={tour} onSelectDate={onSelectDate} />
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              pb="2"
            >
              {fetchedProposalsCards &&
                fetchedProposalsCards.map((tourProposalCard: TourProposal) => (
                  <TourProposalCard
                    key={tourProposalCard.id}
                    tourProposal={tourProposalCard}
                    cartSummary={cartSummary}
                  />
                ))}
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              paddingY={{ base: "12", lg: "12" }}
            >
              <TourOverview
                title={t("tourOverview.title")}
                description={tour.tourOverview}
              />
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              paddingY={{ base: "12", lg: "12" }}
            >
              <TourOverview
                title={t("meetingDropOff.title")}
                description={tour.meetingDropOff}
              />
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              paddingY={{ base: "12", lg: "12" }}
            >
              <TourOverview
                title={t("whatToBring.title")}
                description={tour.whatToBring}
              />
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              paddingY={{ base: "12", lg: "12" }}
            >
              <Ratings rating={tour.rating} />
            </Box>
            <Box
              minWidth="100%"
              maxWidth="100%"
              paddingY={{ base: "12", lg: "12" }}
            >
              <TourOverview title={t("faqs.title")} faqs={tour.faqs} />
            </Box>
          </GridItem>

          <GridItem
            display={{ base: "none", lg: "inherit" }}
            colSpan={{ base: 0, lg: 4 }}
            rowSpan={1}
          >
            <Box
              minWidth="100%"
              maxWidth="100%"
              pt={{ base: "0", lg: "9" }}
            >
              <BookNow />
            </Box>
          </GridItem>
        </Grid>

      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        pt="12"
      >
        <UniqueExperience/>
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        pb="2"
      >
        {fetchedProposalsCards &&
          fetchedProposalsCards.map((tourProposalCard: TourProposal) => (
            <TourProposalCard
              key={tourProposalCard.id}
              tourProposal={tourProposalCard}
              cartSummary={cartSummary}
            />
          ))}
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY={{ base: "12", md: "12" }}
      >
        <TourOverview
          title={t("tourOverview.title")}
          description={tour.tourOverview}
        />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY={{ base: "12", md: "12" }}
      >
        <TourOverview
          title={t("meetingDropOff.title")}
          description={tour.meetingDropOff}
        />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY={{ base: "12", md: "12" }}
      >
        <TourOverview
          title={t("whatToBring.title")}
          description={tour.whatToBring}
        />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY={{ base: "12", md: "12" }}
      >
        <Ratings tourId={tour.id} rating={tour.rating} tourComments={tourComments} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY={{ base: "12", md: "12" }}
      >
        <TourOverview title={t("faqs.title")} faqs={tour.faqs} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY={{ base: "12", md: "12" }}
      >
        <UniqueExperience />
      </Container>
    </BaseLayout>
  );
}

export default ProductDetails;
