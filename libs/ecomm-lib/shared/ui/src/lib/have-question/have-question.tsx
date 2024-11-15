import React, { useState } from "react";
import {
  Box,
  FormLabel,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Button, Email, FormikInput, FormikTextArea } from "@visit/shared/ui";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { orderCheckoutSchema } from "@visit/shared/utils";

interface QuestionValues {
  ask: string;
  name: string;
  email: string;
}

export const QuestionInitialValues: QuestionValues =  {
  ask: "",
  name: "",
  email: "",
}

const SendQuestionForm = () => {
  const [values, setValues] = useState<QuestionValues>(QuestionInitialValues);
  const { t } = useTranslation("common");

  const handleValues = (formValues: QuestionValues) => {
    setValues({...values, ...formValues});
  };

  return (
    <Formik
      initialValues={QuestionInitialValues}
      validationSchema={orderCheckoutSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleValues(values)
        setSubmitting(false)
      }}
    >
      {(formik) => (
        <Stack
          as={Form}
          spacing="6"
          bg={{ base: "inherit", lg: "gray.300" }}
          p={{ base: "0", lg: "6" }}
          borderRadius="lg"
        >
          <FormLabel fontSize="xl" fontWeight="bold" lineHeight="7" mb="0">
            {t("haveQuestion.sendQuestion")}
          </FormLabel>
          <Field
            name="ask"
            placeholder={t("haveQuestion.iWant")}
            label={t("haveQuestion.yourQuestion")}
            component={FormikTextArea}
            bg="gray.100"
            styles={{
              group: {
                height: "44",
                maxHeight: "fit-content",
              },
              label: {
                fontSize: "sm",
                color: "gray.500",
                mb: "1"
              }
            }}
          />
          <Field
            name="name"
            placeholder="Joe"
            label={t("haveQuestion.yourName")}
            component={FormikInput}
            bg="gray.100"
            styles={{
              label: {
                fontSize: "sm",
                color: "gray.500",
                mb: "1"
              }
            }}
          />
          <Field
            name="email"
            placeholder="joe.doe@gmail.com"
            label={t("haveQuestion.contactEmail")}
            component={FormikInput}
            leftIcon={<Email />}
            bg="gray.100"
            styles={{
              label: {
                fontSize: "sm",
                color: "gray.500",
                mb: "1"
              }
            }}
          />
          <Button variant="gradient" size="lg" fontSize="md" disabled={!(formik.isValid && formik.dirty)}>
            {t("haveQuestion.sendQuestion")}
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

const EMAIL_INFO = "info@visit.com";
const PHONE_NUMBER = "+1 888 290 5595";

const HaveQuestion = () => {
  const { t } = useTranslation("common");

  const email = `mailto:${EMAIL_INFO}`;
  const callPhone = `tel:${PHONE_NUMBER}`;

  return (
    <Stack spacing="5">
      <Box>
        <Text fontSize="3xl" fontWeight="extrabold">
          {t("haveQuestion.stillHave")}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" lineHeight="7">
          {t("haveQuestion.sendMessage")}
        </Text>
      </Box>
      <Box>
        <Text>{t("haveQuestion.alsoYouCan")}</Text>
        <Link href={email}>
          <Text color="primary.500" cursor="pointer">
            {EMAIL_INFO}
          </Text>
        </Link>
      </Box>
      <Box>
        <Text>{t("haveQuestion.phoneCalls")}</Text>
        <Link href={callPhone}>
          <Text color="primary.500" cursor="pointer">
            {PHONE_NUMBER}
          </Text>
        </Link>
      </Box>
    </Stack>
  );
};

export function HaveQuestionWrapper() {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap="4">
      <GridItem>
        <HaveQuestion />
      </GridItem>
      <GridItem>
        <SendQuestionForm />
      </GridItem>
    </Grid>
  );
}

export default HaveQuestion;
