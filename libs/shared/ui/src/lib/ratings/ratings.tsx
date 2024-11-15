import * as React from "react";
import { useMemo, useState } from 'react';
import { Box, Flex, Text, Progress } from "@chakra-ui/react";
import { StarFilled } from "../icons";
import Button from "../button/button";
import {
  fetchTourComments,
  TourComment,
  TourRating,
  TourStatistic,
} from "@visit/ecomm-lib/shared/data-access";
import { useTranslation } from "next-i18next";
import AccordionWrapper from "../accordion-wrapper/accordion-wrapper";
import Certificate from '../icons/General/Certificate';

interface RatingsStarsProps {
  rating: number;
  maxCount?: number;
}

const RatingsStars = ({ rating, maxCount = 5 }: RatingsStarsProps) => {
  const stars = [];
  for (let i = 0; i < maxCount; i++) {
    stars.push(
      <StarFilled
        key={i}
        color={rating > i ? "orange.100" : "gray.400"}
        mr="1"
        fontSize="lg"
      />
    );
  }

  return <Box>{stars}</Box>;
};

interface CommentProps {
  name: string;
  date: string;
  comment: string;
  rating: number;
}

const Comment = ({ name, date, comment, rating }: CommentProps) => (
  <Box p="6" mb="2" border="1px solid" borderColor="gray.400" borderRadius="8">
    <Flex mb="2">
      <RatingsStars rating={rating} />
    </Flex>
    <Flex mb="2" alignItems="end">
      <Text mr="2" color="gray.700">
        {name}
      </Text>
      <Text color="gray.500" fontSize="sm">
        {date}
      </Text>
    </Flex>
    <Text color="gray.600">{comment}</Text>
  </Box>
);

interface RatingLineProps {
  allComments: number;
  statistic: TourStatistic;
}

const RatingLine = ({ allComments, statistic }: RatingLineProps) => {
  const { name, count } = statistic;
  const ratingPercentage = (count / allComments) * 100;

  return (
    <Flex mt="4" alignItems="center">
      <Flex mr="8" flexDirection="row" alignItems="center">
        <StarFilled color="gray.500" mr="1" fontSize="lg" />
        <Text>{name}</Text>
      </Flex>

      <Progress
        variant="orange"
        w="full"
        size="xs"
        value={ratingPercentage}
        bg="gray.400"
      />

      <Box minW="16" textAlign="end" color="gray.500">
        {count}
      </Box>
    </Flex>
  );
};

export interface RatingsProps {
  rating: TourRating;
  tourComments: TourComment[];
  tourId: number;
}

const NEW_COMMENTS = 10;

export function Ratings({ rating, tourComments, tourId }: RatingsProps) {
  const [comments, setComments] = useState<TourComment[] | undefined>(tourComments || []);
  const { t } = useTranslation("common");
  const allComments = rating?.count;
  const averageRating = Number(rating?.value.toFixed(2).substring(0, 3));

  const sortedRatingLine = useMemo(() => {
    return rating?.statistics.sort((a, b) => a.count <= b.count ? 1 : -1);
  },[rating]);

  const loadMoreComments = async() => {
    const moreComments = await fetchTourComments(tourId, NEW_COMMENTS);
    setComments(moreComments || [])
  }

  return (
    <AccordionWrapper title={t("ratings.title")} defaultIndex={[0]} icon={<Certificate />}>
      <Box pt="5" mb="6">
        <Flex justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="end">
            <StarFilled color="orange.100" fontSize="4xl" />
            <Text ml="2" mr="4" fontSize="2xl" fontWeight="800">
              {averageRating}
            </Text>

            <Text color="gray.500" lineHeight="7">
              {allComments}
              {t("ratings.ratings")}
            </Text>
          </Box>
          <Button
            variant="outline"
            color="primary.600"
            fontWeight="500"
            borderRadius="8"
          >
            {t("ratings.leaveReview")}
          </Button>
        </Flex>

        {sortedRatingLine?.map((statistic) => (
          <RatingLine
            key={statistic.name}
            allComments={allComments}
            statistic={statistic}
          />
        ))}
      </Box>

      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          rating={comment.rating}
          name={comment.name}
          date={comment.date}
          comment={comment.message}
        />
      ))}

      <Button
        variant="outline"
        color="primary.600"
        size="lg"
        fontSize="md"
        w="full"
        borderRadius="8"
        onClick={loadMoreComments}
      >
        {t("ratings.more")}
      </Button>
    </AccordionWrapper>
  );
}

export default Ratings;
