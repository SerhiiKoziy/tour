import { Trans } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { City } from '@visit/ecomm-lib/shared/data-access';
import { BaseLayout } from '@visit/ecomm-lib/shared/ui';
import {
  Box,
  Container,
  Heading,
  HeadingProps,
  Link,
  LinkProps,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

interface InformationViewProps {
  cities: City[];
  t: (message: string, options?: any) => string | any;
  defaultSection?: string;
}

interface NavLinkProps extends LinkProps {
  isActive?: boolean;
  children?: string;
}

type DescriptionElement = any; // TODO this is tricky to type, please feel free to type it

export interface InformationElements {
  title: string;
  description: DescriptionElement[];
}

const NavLink = ({ isActive, children, ...rest }: NavLinkProps) => {
  return (
    <Link
      color={isActive ? 'gray.700' : 'gray.500'}
      borderLeftColor={isActive ? 'gray.700' : 'none'}
      borderLeftWidth="2px"
      paddingX="3"
      {...rest}
    >
      {children?.toUpperCase()}
    </Link>
  );
};

const Subtitle = ({ children, ...rest }: HeadingProps) => (
  <Heading as="h5" size="md" fontWeight="semibold" {...rest}>
    {children}
  </Heading>
);

const PrivacyCard = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <Stack spacing="4" background="gray.300" borderRadius="lg" padding="6">
      <Heading as="h4" size="md" fontWeight="bold">
        {title}
      </Heading>
      {children}
    </Stack>
  );
};

const MiniTitle = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <Box>
      <Heading as="h5" size="xs" fontWeight="normal" color="gray.500">
        {title.toUpperCase()}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
};

const List = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <UnorderedList spacing="2">{children}</UnorderedList>;
};

const customElement = (
  content: DescriptionElement
): JSX.Element | string | null => {
  let descriptionElement: string | JSX.Element | null = null;

  if (typeof content === 'string') {
    descriptionElement = <Text>{content}</Text>;
  }

  if (typeof content === 'object') {
    const { type } = content;

    if (type === 'subtitle') {
      const { subtitle } = content;

      descriptionElement = <Subtitle>{subtitle}</Subtitle>;
    }

    if (type === 'padding-subtitle') {
      const { subtitle } = content;

      descriptionElement = <Subtitle paddingTop="10">{subtitle}</Subtitle>;
    }

    if (type === 'card') {
      const {
        title,
        elements,
      }: { title: string; elements: DescriptionElement[] } = content;

      descriptionElement = (
        <PrivacyCard title={title}>
          {elements.map((element, index) => (
            <React.Fragment key={index}>
              {customElement(element)}
            </React.Fragment>
          ))}
        </PrivacyCard>
      );
    }

    if (type === 'mini-title') {
      const {
        title,
        elements,
      }: { title: string; elements: DescriptionElement[] } = content;

      descriptionElement = (
        <MiniTitle title={title}>
          {elements.map((element, index) => (
            <React.Fragment key={index}>
              {customElement(element)}
            </React.Fragment>
          ))}
        </MiniTitle>
      );
    }

    if (type === 'list') {
      const { elements }: { elements: DescriptionElement[] } = content;

      descriptionElement = (
        <List>
          {elements.map((element, index) => (
            <ListItem key={index} marginInlineStart="1em">
              {customElement(element)}
            </ListItem>
          ))}
        </List>
      );
    }
  }

  return descriptionElement;
};

export function InformationView({
  cities,
  t,
  defaultSection,
}: InformationViewProps) {
  const elements: Record<string, InformationElements> = t('elements', {
    returnObjects: true,
  });

  const titles = Object.keys(elements);
  const [activeSection, setActiveSection] = useState(defaultSection ?? '');

  useEffect(() => {
    // NOTE: this way to detect the current element in the viewport is too slow, but accurate since
    // IntersectionObserver does not work well with fast scroll events
    // I add this feature here because this will be a lightweight page
    // DO NOT use it with too many elements
    const elements = Array.from(
      document.getElementsByClassName('section')
    ) as HTMLElement[];

    const contentOffsetTop = document.getElementById('content')?.offsetTop ?? 0;

    // using debounce to avoid repeating too many calculations
    const handler = debounce(() => {
      const offsetY = window.pageYOffset + contentOffsetTop;

      // Using every to be able to break the loop if we find the current active section
      elements.every((element) => {
        const isInside =
          offsetY >= element.offsetTop &&
          offsetY <= element.offsetTop + element.offsetHeight;

        if (isInside) {
          setActiveSection(element.id);
          return false;
        }

        return true;
      });
    }, 150);

    window.addEventListener('scroll', handler, false);

    return () => {
      window.removeEventListener('scroll', handler, false);
    };
  }, [setActiveSection]);

  return (
    <BaseLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '40' }}
        paddingY="12"
        backgroundColor="gray.100"
      >
        <Stack spacing="12">
          <Stack spacing="3">
            <Heading as={'h1'} size="4xl" fontWeight="extrabold">
              {t('title')}
            </Heading>
            <Heading as="h3" size="lg" fontWeight="bold">
              {t('subtitle')}
            </Heading>
          </Stack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '12', md: '32' }}
          >
            <Stack
              pos={{ base: 'initial', md: 'sticky' }}
              alignSelf={{ base: 'none', md: 'baseline' }}
              top={{ base: '0', md: '12' }}
              spacing="4"
              minWidth={{ md: '80' }}
              fontSize="small"
            >
              {titles.map((title) => (
                <NavLink
                  isActive={activeSection === title ? true : false}
                  href={`#${title}`}
                  onClick={() => setActiveSection(title)}
                  key={title}
                >
                  {elements[title].title.replace(/(<([^>]+)>)/gi, '')}
                </NavLink>
              ))}
            </Stack>
            <Stack spacing="12" id="content">
              {titles.map((title: string) => {
                let titleText: string | JSX.Element = elements[title].title;
                // NOTE: this might be refactored, but it is too specific for now
                // if you see this is used in many places, you can consider a refactor :)
                if (titleText.includes('<container>')) {
                  titleText = (
                    <Trans
                      i18nKey={`elements.${title}.title`}
                      t={t}
                      components={{
                        container: (
                          <Text color="primary.600" display="inline" />
                        ),
                      }}
                    />
                  );
                }

                return (
                  <Stack spacing="4" className="section" id={title} key={title}>
                    <Heading as="h3" size="lg">
                      {titleText}
                    </Heading>
                    <Stack spacing="4">
                      {elements[title].description.map(
                        (content: DescriptionElement, index) => {
                          // TODO type this content is tricky since we have a several variations. Feel free to type it if you find a good way :)
                          let descriptionElement: string | null | JSX.Element =
                            customElement(content);

                          // NOTE: this might be refactored, but it is too specific for now
                          // if you see this is used in many places, you can consider a refactor :)

                          if (typeof content === 'string') {
                            if (content.includes('<red-link>')) {
                              descriptionElement = (
                                <Trans
                                  i18nKey={`elements.${title}.description.${index}`}
                                  t={t}
                                  components={{
                                    'red-link': (
                                      <Text
                                        color="primary.600"
                                        display="inline"
                                      />
                                    ),
                                  }}
                                />
                              );
                            }
                          }

                          return (
                            <React.Fragment key={index}>
                              {descriptionElement}
                            </React.Fragment>
                          );
                        }
                      )}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </BaseLayout>
  );
}

export default InformationView;
