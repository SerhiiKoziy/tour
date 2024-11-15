import {
  Box,
  Text,
  Flex,
  Heading,
  Stack,
  Button,
  Divider,
  Icon,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { DurationLabel, GuestsLabel, RatingLabel } from "../label/label";
import { CardTags } from "../card/card";
import { Tour } from "@visit/ecomm-lib/shared/data-access";
import { Share, Favorite, Link as LinkIcon, Email } from "../icons";
import { Button as ChakraButton } from "@chakra-ui/button";

interface ShareTourBtnProps {
  title: string;
}

export const ShareTourBtn = ({ title }: ShareTourBtnProps) => {
  const { asPath } = useRouter();
  const { t } = useTranslation("common");

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const URL = `${origin}${asPath}`;

  const copyRoute = () => {
    navigator.clipboard.writeText(URL);
  };

  const emailSender = `mailto:user@example.com?subject=${title}&body=${URL}`;

  return (
    <Box position="relative" w="full">
      <Menu>
        <MenuButton
          as={ChakraButton}
          colorScheme="gray"
          variant="outline"
          w="full"
          rightIcon={null}
          pl={{ base: "none", sm: "3" }}
          pr={{ base: "none", sm: "3" }}
          borderRightRadius="none"
          h="12"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="none"
        >
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Share />
            <Text
              fontSize="md"
              ml="2"
              display={{ base: "inherit", sm: "none" }}
            >
              {t("tourHeader.share")}
            </Text>
          </Stack>
        </MenuButton>
        <MenuList rootProps={{ w: "full" }}>
          <MenuItem>
            <Stack direction="row" align="flex-end" onClick={copyRoute}>
              <Icon as={LinkIcon} width="6" height="6" />
              <Text>{t("tourHeader.copyLink")}</Text>
            </Stack>
          </MenuItem>
          <MenuItem>
            <Link href={emailSender} style={{ textDecoration: "none" }}>
              <Stack direction="row" align="flex-end">
                <Icon as={Email} width="6" height="6" />
                <Text>{t("tourHeader.sendEmail")}</Text>
              </Stack>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export interface TourHeaderProps {
  tour: Tour;
}

export function TourHeader({ tour }: TourHeaderProps) {
  const { t } = useTranslation("common");
  const { title, description, guests, duration, rating } = tour;
  const updateValueRating = rating.value.toFixed(1);

  const updateMarkupDescription = () => {
    return { __html: description }
  }

  return (
    <Flex
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box pr="4">
        <Stack direction="column" spacing="1">
          <Stack direction="row" spacing="2" align="start">
            <CardTags tour={tour} />
          </Stack>
          <Heading
            as="h2"
            color="gray.700"
            fontWeight="extrabold"
            fontSize="3xl"
            letterSpacing="tight"
            lineHeight="10"
          >
            {title}
          </Heading>
          <Heading
            fontWeight="bold"
            color="gray.500"
            fontSize="xl"
            lineHeight="7"
            dangerouslySetInnerHTML={updateMarkupDescription()}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={{ base: "2", lg: "4" }}
          align="start"
          mt="4"
          alignItems="center"
        >
          <RatingLabel rating={updateValueRating} count={rating.count} />
          <Divider orientation="vertical" borderColor="gray.400" h="4" />
          <DurationLabel duration={duration} color="gray.700" />
          <Divider orientation="vertical" borderColor="gray.400" h="4" />
          <GuestsLabel guests={guests} lineHeight="short" color="gray.700" />
        </Stack>
      </Box>
      <Box
        mt={{ base: "6", sm: "0" }}
        maxW={{ base: "full", lg: "fit-content" }}
      >
        <Flex
          direction="row"
          alignItems="center"
          borderRadius="lg"
          borderColor="gray.400"
          borderWidth="1px"
          justifyContent="center"
        >
          <ShareTourBtn title={title} />
          <Divider
            orientation="vertical"
            h={{ base: "5", sm: "12" }}
            color="gray.400"
          />
          <Button
            w={{ base: "100%", lg: "initial" }}
            size="lg"
            borderRadius="7"
            borderLeftRadius="none"
            p="2"
            overflow="hidden"
          >
            <Favorite />
            <Text
              fontSize="md"
              display={{ base: "inherit", sm: "none" }}
              pl="3"
            >
              {t("tourHeader.addToWishlist")}
            </Text>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default TourHeader;
