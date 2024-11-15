import { Center, useBreakpointValue } from '@chakra-ui/react';
import { Carousel, Image } from '@visit/shared/ui';

import forbes from './assets/forbes.png';
import rickSteves from './assets/rick-steves.png';
import travel from './assets/travel.png';
import traveler from './assets/traveler.png';
import lonelyPlanet from './assets/lonely-planet.png';
import frommers from './assets/frommers.png';
import variety from './assets/variety.png';
import { useTranslation } from 'next-i18next';

export function MentionsInPress() {
  const { t } = useTranslation('common');

  const { perView, autoplay, spacing } =
    useBreakpointValue({
      base: { perView: 2.85, autoplay: true, spacing: 32 },
      md: { perView: 4.85, autoplay: true, spacing: 32 },
      lg: { perView: 7, autoplay: false, spacing: 16 },
    }) ?? {};

  return (
    <Carousel slides={{ perView, spacing }} autoplay={autoplay} loop={autoplay}>
      <Center height="100%">
        <Image alt={t('mentionsInPress.forbes')} width="105px" src={forbes} />
      </Center>
      <Center height="100%">
        <Image
          alt={t('mentionsInPress.rickSteves')}
          width="105px"
          src={rickSteves}
        />
      </Center>
      <Center height="100%">
        <Image
          alt={t('mentionsInPress.travelChannel')}
          width="105px"
          src={travel}
        />
      </Center>
      <Center height="100%">
        <Image
          alt={t('mentionsInPress.traveler')}
          width="105px"
          src={traveler}
        />
      </Center>
      <Center height="100%">
        <Image
          alt={t('mentionsInPress.lonelyPlanet')}
          width="105px"
          src={lonelyPlanet}
        />
      </Center>
      <Center height="100%">
        <Image
          alt={t('mentionsInPress.frommers')}
          width="105px"
          src={frommers}
        />
      </Center>
      <Center height="100%">
        <Image alt={t('mentionsInPress.variety')} width="105px" src={variety} />
      </Center>
    </Carousel>
  );
}

export default MentionsInPress;
