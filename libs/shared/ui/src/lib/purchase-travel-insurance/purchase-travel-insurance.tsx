import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import Button from "../button/button";
import { useTranslation } from "next-i18next";
import { Image } from "@visit/shared/ui";
import insurance from "./assets/insurance.png";

interface InsuranceCardProps {
  title: string;
  description1: string;
  description2: string;
}

const InsuranceCard = ({
  title,
  description1,
  description2
  }: InsuranceCardProps) => {
  return (
    <GridItem borderRadius="lg" bg="gray.300" p={{ base: "4", md: "6" }}>
      <Stack spacing="2">
        <Text fontSize="xl" fontWeight="bold" lineHeight="7">{title}</Text>
        <Text>{description1}</Text>
        <Text>{description2}</Text>
      </Stack>
    </GridItem>
  )
}

const WrapperInsuranceCards = () => {
  const { t } = useTranslation("common");

  return (
    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap="4" pt="12">
      <InsuranceCard
        title={t("travelInsurance.howItWorks")}
        description1={t("travelInsurance.ourPolicy")}
        description2={t("travelInsurance.weRecommendTravelInsurance")}
      />
      <InsuranceCard
        title={t("travelInsurance.recommendations")}
        description1={t("travelInsurance.weRecommendTravelGuard")}
        description2={t("travelInsurance.onePiece")}
      />
    </Grid>
  )
}

export function PurchaseTravelInsurance() {
  const { t } = useTranslation("common");

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: "column-reverse", lg: "row" }}
      >
        <Stack spacing="4" w={{ base: "full", lg: "50%" }}>
          <Heading
            fontWeight="extrabold"
            lineHeight="10"
            fontSize={{ base: "4xl", lg: "6xl" }}
          >
            {t("travelInsurance.title")}
          </Heading>
          <Text>{t("travelInsurance.description")}</Text>
          <Button variant="gradient" size="lg" fontSize="md" w={{ base: "full", lg: "56" }}>
            {t("travelInsurance.btnTitle")}
          </Button>
        </Stack>
        <Box>
          <Image src={insurance} alt="insurance" w="full" h="full" />
        </Box>
      </Flex>

      <WrapperInsuranceCards />
    </>
  );
}

export default PurchaseTravelInsurance;
