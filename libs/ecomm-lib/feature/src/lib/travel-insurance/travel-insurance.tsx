import { Container } from "@chakra-ui/react";
import { City } from "@visit/ecomm-lib/shared/data-access";
import { PurchaseTravelInsurance } from "@visit/shared/ui";
import { PlainLayout } from "libs/ecomm-lib/shared/ui/src/lib/base-layout/base-layout";

interface TravelInsuranceWrapperProps {
  cities: City[];
}

export function TravelInsuranceWrapper({ cities }: TravelInsuranceWrapperProps) {
  return (
    <PlainLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", md: "40" }}
        paddingY="12"
        backgroundColor="gray.100"
      >
        <PurchaseTravelInsurance />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: "4", lg: "40" }}
        paddingY="12"
      >
        Add All Our Destinations!
      </Container>
    </PlainLayout>
  )
}

export default TravelInsuranceWrapper;
