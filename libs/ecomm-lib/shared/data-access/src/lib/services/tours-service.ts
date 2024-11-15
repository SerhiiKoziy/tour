import { formatTour } from '../adapters/format-seo-results';
import {City, TTGResponse} from './destinations-service';
import {filterCities, formatCity} from '../adapters/destinations-adapter';

const LS_HISTORY = 'ttg-history';

export type TourImage = {
  id: number;
  url: string;
  name: string;
  isMain: boolean;
};

export type TourTag = {
  id: number;
  title: string;
  color: string;
};

export type TourPlace = {
  id: number;
  title: string;
  enabled: boolean;
};

export type TourStatistic = {
  name: string;
  count: number;
};

export type TourComment = {
  id: number;
  rating: number;
  name: string;
  date: string;
  message: string;
};

export type TourRating = {
  value: number;
  count: number;
  statistics: TourStatistic[];
};

export type Included = {
  id: number;
  label: string;
  active: boolean;
};

export type ItineraryType = {
  id: number;
  point: string;
  title: string;
  description: string;
};

export interface TourFaqs {
  question: string;
  answer: string;
}

export type Tour = {
  id: number;
  title: string;
  tagId?: string;
  city: string;
  guests: number;
  duration: number;
  description: string;
  attractions: string[];
  rating: TourRating;
  price:  string;
  basePrice: string,
  tourOverview: string; // TODO should this be here and be mandatory?, we can have an extended type
  meetingDropOff: string; // TODO should this be here and be mandatory?, we can have an extended type
  whatToBring: string; // TODO should this be here and be mandatory?, we can have an extended type
  faqs: TourFaqs[]; // TODO should this be here and be mandatory?, we can have an extended type
  itineraries: ItineraryType[]; // TODO should this be here and be mandatory?, we can have an extended type
  participants: string[]; // TODO should this be here and be mandatory?, we can have an extended type
  images: TourImage[];
  tags: TourTag[];
  placesToVisit: TourPlace[]; // TODO should this be here and be mandatory?
  status: number;
  userMessage: string | null;
  systemMessage: string | null;
  stackTrace: string | null;
  debugInfo: string | null;
  generatedAtUtc: Date | string;
};

export type ToursResults = {
  tours: Tour[];
  total: number;
  similarTours?: Tour[];
  peopleChoice?: Tour[];
};

export const tours: Tour[] = [
  {
    id: 8630,
    title: "Athens in a Half Day by Electric Tuk Tuk",
    city: "Athens",
    guests: 4,
    duration: 3.0,
    description: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    attractions: [
      "Colosseum",
      "Vatican, Eiffel Tower",
      "Louvre Museum",
      "Mont Saint Michel"
    ],
    rating: {
      value: 4.9553398058252425,
      count: 515,
      statistics: [
        {
          name: "3",
          count: 2
        },
        {
          name: "4",
          count: 19
        },
        {
          name: "5",
          count: 495
        }
      ]
    },
    price: "0.00",
    basePrice: "0.00",
    tourOverview: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    meetingDropOff: "",
    whatToBring: "",
    faqs: [
      {
        question: "Is it possible to explore the best of Rome in one day?",
        answer: "Well, Rome wasn’t built in a day, but you can see the most iconic places in a day with our experienced, local guides! In just 7 hours, you’ll be mesmerized under the Sistine Chapel, wowed at the Colosseum, and inspired at the Spanish Steps, Trevi Fountain, and much more. Your jam-packed day is stress free since tickets and transportation are included, so you can just enjoy your guide's compelling narratives."
      },
      {
        question: "Is it possible to explore the best of Rome in one day?",
        answer: "Well, Rome wasn’t built in a day, but you can see the most iconic places in a day with our experienced, local guides! In just 7 hours, you’ll be mesmerized under the Sistine Chapel, wowed at the Colosseum, and inspired at the Spanish Steps, Trevi Fountain, and much more. Your jam-packed day is stress free since tickets and transportation are included, so you can just enjoy your guide's compelling narratives."
      },
    ],
    itineraries: [
      {
        id: 4740,
        point: "Starting point",
        title: "thumbnail",
        description: "Tuk Tuk"
      },
      {
        id: 4758,
        point: "Viewpoint 4.00",
        title: "Athens by Tuk Tuk ",
        description: "Tuk Tuk"
      },
      {
        id: 4747,
        point: "Viewpoint 5.00",
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        description: "See the great stadium that has inspired all of modern sport"
      },
      {
        id: 4762,
        point: "Viewpoint 6.00",
        title: "The Neoclassical Academy of Athens",
        description: "See the grand 19th century library, the center of Greek science and culture"
      },
      {
        id: 4764,
        point: "Viewpoint 7.00",
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        description: "Visit the ruins of the ancient Temple renovated under the Greek-loving Roman Emperor Hadrian"
      },
      {
        id: 4997,
        point: "Viewpoint 8.00",
        title: "The Acropolis and Parthenon ",
        description: "The tour ends with the symbols of Ancient Athens and Greek Mythology"
      },
      {
        id: 4766,
        point: "Viewpoint 9.00",
        title: "Ride through Athens' Hippest Neighborhoods",
        description: "See the real Athens as you pass through neighborhoods like Plaka, Psiri, and Thisio"
      },
      {
        id: 4767,
        point: "Viewpoint 10.00",
        title: "Best Views from Lycabettus Hill",
        description: "See the best views of the city atop Lycabettus Hill"
      },
      {
        id: 4759,
        point: "Viewpoint 11.00",
        title: "Unforgettable Memories",
        description: "Enjoy an amazing day discovering Athens"
      }
    ],
    participants: [
      "Adults (18+)",
      "Child (6 or under)",
      "Youth (7-17)"
    ],
    images: [
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/dd165bb6-d29a-4939-97e2-b6c53b09e8e0.jpeg",
        isMain: false,
        id: 5281
      },
      {
        name: "olympic stadium athens tuk tuk.jpeg",
        url: "original/b84cc71f-81a7-4bc4-a777-5b716c5b43f8.jpeg",
        isMain: false,
        id: 5279
      },
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/641d7f02-934a-4d6b-8c78-56ebef882f79.jpeg",
        isMain: false,
        id: 5280
      },
      {
        name: "athens tuk tuk clients.jpeg",
        url: "original/a0af2d2d-7201-413c-bf6f-d9b6d062f5f9.jpeg",
        isMain: false,
        id: 5274
      },
      {
        name: "academy athens tuk tuk.jpeg",
        url: "original/a6f5ba72-21fb-4c29-95ce-c7af4504e410.jpeg",
        isMain: false,
        id: 5278
      },
      {
        name: "hadrians arch athens tuk tuk.jpeg",
        url: "original/f11fc0cf-cac8-4efe-8558-e3e3a1e0ff1d.jpeg",
        isMain: false,
        id: 5277
      },
      {
        name: "athens neighborhood tuk tuk .jpeg",
        url: "original/e81b3f48-18d4-47e9-8abd-f626c0380153.jpeg",
        isMain: false,
        id: 5276
      },
      {
        name: "athens tuk tuk views.jpeg",
        url: "original/ae553750-9d64-4fbb-9b9c-23f4d10dafca.jpeg",
        isMain: false,
        id: 5275
      },
      {
        name: "acropolis tuk tuk.jpg",
        url: "original/0cfd2e6e-e338-4a3f-a9c5-cc7922115a2f.jpg",
        isMain: false,
        id: 5273
      }
    ],
    tags: [
      {
        id: 5126,
        title: "Colosseum Underground tickets",
        color: "blue"
      },
      {
        id: 5127,
        title: "Access to the Arena Floor and Gladiator's Gate",
        color: "blue"
      },
      {
        id: 5128,
        title: "Guided tour of the Colosseum with 1st and 2nd tiers",
        color: "blue"
      },
      {
        id: 5129,
        title: "A guided tour of the Roman Forum with skip-the-line tickets",
        color: "blue"
      },
      {
        id: 5130,
        title: "Walking tour of Palatine Hill",
        color: "blue"
      },
      {
        id: 5131,
        title: "An expert English-speaking guide",
        color: "blue"
      },
      {
        id: 5132,
        title: "A maximum group size of 24",
        color: "blue"
      }
    ],
    placesToVisit: [
      {
        id: 4740,
        title: "thumbnail",
        enabled: true
      },
      {
        id: 4758,
        title: "Athens by Tuk Tuk ",
        enabled: true
      },
      {
        id: 4747,
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        enabled: true
      },
      {
        id: 4762,
        title: "The Neoclassical Academy of Athens",
        enabled: true
      },
      {
        id: 4764,
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        enabled: true
      },
      {
        id: 4997,
        title: "The Acropolis and Parthenon ",
        enabled: true
      },
      {
        id: 4766,
        title: "Ride through Athens' Hippest Neighborhoods",
        enabled: true
      },
      {
        id: 4767,
        title: "Best Views from Lycabettus Hill",
        enabled: true
      },
      {
        id: 4759,
        title: "Unforgettable Memories",
        enabled: true
      }
    ],
    status: 1,
    userMessage: null,
    systemMessage: null,
    stackTrace: null,
    debugInfo: null,
    generatedAtUtc: "2023-01-05T08:18:50.5361081Z",
  },
  {
    id: 8632,
    title: "Athens in a Half Day by Electric Tuk Tuk",
    city: "Athens",
    guests: 4,
    duration: 3.0,
    description: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    attractions: [
      "Colosseum",
      "Vatican, Eiffel Tower",
      "Louvre Museum",
      "Mont Saint Michel"
    ],
    rating: {
      value: 0,
      count: 0,
      statistics: []
    },
    price: "0.00",
    basePrice: "0.00",
    tourOverview: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    meetingDropOff: "",
    whatToBring: "",
    faqs: [],
    itineraries: [
      {
        id: 4740,
        point: "Starting point",
        title: "thumbnail",
        description: "Tuk Tuk"
      },
      {
        id: 4758,
        point: "Viewpoint 4.00",
        title: "Athens by Tuk Tuk ",
        description: "Tuk Tuk"
      },
      {
        id: 4747,
        point: "Viewpoint 5.00",
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        description: "See the great stadium that has inspired all of modern sport"
      },
      {
        id: 4762,
        point: "Viewpoint 6.00",
        title: "The Neoclassical Academy of Athens",
        description: "See the grand 19th century library, the center of Greek science and culture"
      },
      {
        id: 4764,
        point: "Viewpoint 7.00",
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        description: "Visit the ruins of the ancient Temple renovated under the Greek-loving Roman Emperor Hadrian"
      },
      {
        id: 4997,
        point: "Viewpoint 8.00",
        title: "The Acropolis and Parthenon ",
        description: "The tour ends with the symbols of Ancient Athens and Greek Mythology"
      }
    ],
    participants: [
      "Adult (13 - 99)"
    ],
    images: [
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/dd165bb6-d29a-4939-97e2-b6c53b09e8e0.jpeg",
        isMain: false,
        id: 5281
      },
      {
        name: "olympic stadium athens tuk tuk.jpeg",
        url: "original/b84cc71f-81a7-4bc4-a777-5b716c5b43f8.jpeg",
        isMain: false,
        id: 5279
      },
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/641d7f02-934a-4d6b-8c78-56ebef882f79.jpeg",
        isMain: false,
        id: 5280
      },
      {
        name: "athens tuk tuk clients.jpeg",
        url: "original/a0af2d2d-7201-413c-bf6f-d9b6d062f5f9.jpeg",
        isMain: false,
        id: 5274
      },
      {
        name: "academy athens tuk tuk.jpeg",
        url: "original/a6f5ba72-21fb-4c29-95ce-c7af4504e410.jpeg",
        isMain: false,
        id: 5278
      },
      {
        name: "hadrians arch athens tuk tuk.jpeg",
        url: "original/f11fc0cf-cac8-4efe-8558-e3e3a1e0ff1d.jpeg",
        isMain: false,
        id: 5277
      },
      {
        name: "athens neighborhood tuk tuk .jpeg",
        url: "original/e81b3f48-18d4-47e9-8abd-f626c0380153.jpeg",
        isMain: false,
        id: 5276
      },
    ],
    tags: [],
    placesToVisit: [
      {
        id: 4740,
        title: "thumbnail",
        enabled: true
      },
      {
        id: 4758,
        title: "Athens by Tuk Tuk ",
        enabled: true
      },
      {
        id: 4747,
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        enabled: true
      },
      {
        id: 4762,
        title: "The Neoclassical Academy of Athens",
        enabled: true
      },
      {
        id: 4764,
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        enabled: true
      },
      {
        id: 4997,
        title: "The Acropolis and Parthenon ",
        enabled: true
      },
      {
        id: 4766,
        title: "Ride through Athens' Hippest Neighborhoods",
        enabled: true
      },
      {
        id: 4767,
        title: "Best Views from Lycabettus Hill",
        enabled: true
      },
      {
        id: 4759,
        title: "Unforgettable Memories",
        enabled: true
      }
    ],
    status: 1,
    userMessage: null,
    systemMessage: null,
    stackTrace: null,
    debugInfo: null,
    generatedAtUtc: "2023-01-05T08:18:50.5361081Z",
  },
  {
    id: 8634,
    title: "Athens in a Half Day by Electric Tuk Tuk",
    city: "Athens",
    guests: 4,
    duration: 3.0,
    description: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    attractions: [
      "Colosseum",
      "Vatican, Eiffel Tower",
      "Louvre Museum",
      "Mont Saint Michel"
    ],
    rating: {
      value: 0,
      count: 0,
      statistics: []
    },
    price: "0.00",
    basePrice: "0.00",
    tourOverview: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    meetingDropOff: "",
    whatToBring: "",
    faqs: [],
    itineraries: [
      {
        id: 4740,
        point: "Starting point",
        title: "thumbnail",
        description: "Tuk Tuk"
      },
      {
        id: 4758,
        point: "Viewpoint 4.00",
        title: "Athens by Tuk Tuk ",
        description: "Tuk Tuk"
      },
      {
        id: 4747,
        point: "Viewpoint 5.00",
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        description: "See the great stadium that has inspired all of modern sport"
      },
      {
        id: 4762,
        point: "Viewpoint 6.00",
        title: "The Neoclassical Academy of Athens",
        description: "See the grand 19th century library, the center of Greek science and culture"
      },
      {
        id: 4764,
        point: "Viewpoint 7.00",
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        description: "Visit the ruins of the ancient Temple renovated under the Greek-loving Roman Emperor Hadrian"
      },
      {
        id: 4997,
        point: "Viewpoint 8.00",
        title: "The Acropolis and Parthenon ",
        description: "The tour ends with the symbols of Ancient Athens and Greek Mythology"
      },
      {
        id: 4766,
        point: "Viewpoint 9.00",
        title: "Ride through Athens' Hippest Neighborhoods",
        description: "See the real Athens as you pass through neighborhoods like Plaka, Psiri, and Thisio"
      },
      {
        id: 4767,
        point: "Viewpoint 10.00",
        title: "Best Views from Lycabettus Hill",
        description: "See the best views of the city atop Lycabettus Hill"
      },
    ],
    participants: [
      "Adult (13 - 99)"
    ],
    images: [
      {
        name: "olympic stadium athens tuk tuk.jpeg",
        url: "original/b84cc71f-81a7-4bc4-a777-5b716c5b43f8.jpeg",
        isMain: false,
        id: 5279
      },
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/641d7f02-934a-4d6b-8c78-56ebef882f79.jpeg",
        isMain: false,
        id: 5280
      },
      {
        name: "athens tuk tuk clients.jpeg",
        url: "original/a0af2d2d-7201-413c-bf6f-d9b6d062f5f9.jpeg",
        isMain: false,
        id: 5274
      },
      {
        name: "academy athens tuk tuk.jpeg",
        url: "original/a6f5ba72-21fb-4c29-95ce-c7af4504e410.jpeg",
        isMain: false,
        id: 5278
      },
      {
        name: "hadrians arch athens tuk tuk.jpeg",
        url: "original/f11fc0cf-cac8-4efe-8558-e3e3a1e0ff1d.jpeg",
        isMain: false,
        id: 5277
      },
      {
        name: "athens neighborhood tuk tuk .jpeg",
        url: "original/e81b3f48-18d4-47e9-8abd-f626c0380153.jpeg",
        isMain: false,
        id: 5276
      },
      {
        name: "athens tuk tuk views.jpeg",
        url: "original/ae553750-9d64-4fbb-9b9c-23f4d10dafca.jpeg",
        isMain: false,
        id: 5275
      },
      {
        name: "acropolis tuk tuk.jpg",
        url: "original/0cfd2e6e-e338-4a3f-a9c5-cc7922115a2f.jpg",
        isMain: false,
        id: 5273
      }
    ],
    tags: [],
    placesToVisit: [
      {
        id: 4740,
        title: "thumbnail",
        enabled: true
      },
      {
        id: 4758,
        title: "Athens by Tuk Tuk ",
        enabled: true
      },
      {
        id: 4747,
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        enabled: true
      },
      {
        id: 4762,
        title: "The Neoclassical Academy of Athens",
        enabled: true
      },
      {
        id: 4764,
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        enabled: true
      },
      {
        id: 4997,
        title: "The Acropolis and Parthenon ",
        enabled: true
      },
      {
        id: 4766,
        title: "Ride through Athens' Hippest Neighborhoods",
        enabled: true
      },
      {
        id: 4767,
        title: "Best Views from Lycabettus Hill",
        enabled: true
      },
      {
        id: 4759,
        title: "Unforgettable Memories",
        enabled: true
      }
    ],
    status: 1,
    userMessage: null,
    systemMessage: null,
    stackTrace: null,
    debugInfo: null,
    generatedAtUtc: "2023-01-05T08:18:50.5361081Z",
  },
  {
    id: 8635,
    title: "Athens in a Half Day by Electric Tuk Tuk",
    city: "Athens",
    guests: 4,
    duration: 3.0,
    description: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    attractions: [
      "Colosseum",
      "Vatican, Eiffel Tower",
      "Louvre Museum",
      "Mont Saint Michel"
    ],
    rating: {
      value: 0,
      count: 0,
      statistics: [],
    },
    price: "0.00",
    basePrice: "0.00",
    tourOverview: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    meetingDropOff: "",
    whatToBring: "",
    faqs: [],
    itineraries: [
      {
        id: 4740,
        point: "Starting point",
        title: "thumbnail",
        description: "Tuk Tuk"
      },
      {
        id: 4758,
        point: "Viewpoint 4.00",
        title: "Athens by Tuk Tuk ",
        description: "Tuk Tuk"
      },
      {
        id: 4747,
        point: "Viewpoint 5.00",
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        description: "See the great stadium that has inspired all of modern sport"
      },
      {
        id: 4762,
        point: "Viewpoint 6.00",
        title: "The Neoclassical Academy of Athens",
        description: "See the grand 19th century library, the center of Greek science and culture"
      },
      {
        id: 4764,
        point: "Viewpoint 7.00",
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        description: "Visit the ruins of the ancient Temple renovated under the Greek-loving Roman Emperor Hadrian"
      },
      {
        id: 4997,
        point: "Viewpoint 8.00",
        title: "The Acropolis and Parthenon ",
        description: "The tour ends with the symbols of Ancient Athens and Greek Mythology"
      }
    ],
    participants: [
      "Adult (13 - 99)"
    ],
    images: [
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/dd165bb6-d29a-4939-97e2-b6c53b09e8e0.jpeg",
        isMain: false,
        id: 5281
      },
      {
        name: "olympic stadium athens tuk tuk.jpeg",
        url: "original/b84cc71f-81a7-4bc4-a777-5b716c5b43f8.jpeg",
        isMain: false,
        id: 5279
      },
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/641d7f02-934a-4d6b-8c78-56ebef882f79.jpeg",
        isMain: false,
        id: 5280
      },
      {
        name: "athens tuk tuk clients.jpeg",
        url: "original/a0af2d2d-7201-413c-bf6f-d9b6d062f5f9.jpeg",
        isMain: false,
        id: 5274
      },
      {
        name: "academy athens tuk tuk.jpeg",
        url: "original/a6f5ba72-21fb-4c29-95ce-c7af4504e410.jpeg",
        isMain: false,
        id: 5278
      }
    ],
    tags: [],
    placesToVisit: [
      {
        id: 4740,
        title: "thumbnail",
        enabled: true
      },
      {
        id: 4758,
        title: "Athens by Tuk Tuk ",
        enabled: true
      },
      {
        id: 4747,
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        enabled: true
      },
      {
        id: 4762,
        title: "The Neoclassical Academy of Athens",
        enabled: true
      },
      {
        id: 4764,
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        enabled: true
      },
      {
        id: 4997,
        title: "The Acropolis and Parthenon ",
        enabled: true
      },
      {
        id: 4766,
        title: "Ride through Athens' Hippest Neighborhoods",
        enabled: true
      },
      {
        id: 4767,
        title: "Best Views from Lycabettus Hill",
        enabled: true
      },
      {
        id: 4759,
        title: "Unforgettable Memories",
        enabled: true
      }
    ],
    status: 1,
    userMessage: null,
    systemMessage: null,
    stackTrace: null,
    debugInfo: null,
    generatedAtUtc: "2023-01-05T08:18:50.5361081Z",
  },
  {
    id: 8636,
    title: "Athens in a Half Day by Electric Tuk Tuk",
    city: "Athens",
    guests: 4,
    duration: 3.0,
    description: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    attractions: [
      "Colosseum",
      "Vatican, Eiffel Tower",
      "Louvre Museum",
      "Mont Saint Michel"
    ],
    rating: {
      value: 0,
      count: 0,
      statistics: []
    },
    price: "0.00",
    basePrice: "0.00",
    tourOverview: "<p>Visit Athens on a different and unique way, take a ride with us around the city Center, you will enjoy from an unique 360º view, feel free to tell us to stop and enjoy the sights whenever you want.</p>\n<p>Our Tuk Tuks are 100% Electric, Eco Friendly, we provide only private tours for you to enjoy from the best experience while visiting the city. </p>\n<p>A tour only for you, your family or your friends.</p>\n<p>Athens is full of history, culture and amazing monuments. An ideal tour for families, friends and small groups.</p>\n",
    meetingDropOff: "",
    whatToBring: "",
    faqs: [],
    itineraries: [
      {
        id: 4740,
        point: "Starting point",
        title: "thumbnail",
        description: "Tuk Tuk"
      },
      {
        id: 4758,
        point: "Viewpoint 4.00",
        title: "Athens by Tuk Tuk ",
        description: "Tuk Tuk"
      },
      {
        id: 4747,
        point: "Viewpoint 5.00",
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        description: "See the great stadium that has inspired all of modern sport"
      },
      {
        id: 4762,
        point: "Viewpoint 6.00",
        title: "The Neoclassical Academy of Athens",
        description: "See the grand 19th century library, the center of Greek science and culture"
      },
      {
        id: 4764,
        point: "Viewpoint 7.00",
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        description: "Visit the ruins of the ancient Temple renovated under the Greek-loving Roman Emperor Hadrian"
      },
      {
        id: 4997,
        point: "Viewpoint 8.00",
        title: "The Acropolis and Parthenon ",
        description: "The tour ends with the symbols of Ancient Athens and Greek Mythology"
      },
      {
        id: 4766,
        point: "Viewpoint 9.00",
        title: "Ride through Athens' Hippest Neighborhoods",
        description: "See the real Athens as you pass through neighborhoods like Plaka, Psiri, and Thisio"
      },
      {
        id: 4767,
        point: "Viewpoint 10.00",
        title: "Best Views from Lycabettus Hill",
        description: "See the best views of the city atop Lycabettus Hill"
      }
    ],
    participants: [
      "Adult (13 - 99)"
    ],
    images: [
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/dd165bb6-d29a-4939-97e2-b6c53b09e8e0.jpeg",
        isMain: false,
        id: 5281
      },
      {
        name: "olympic stadium athens tuk tuk.jpeg",
        url: "original/b84cc71f-81a7-4bc4-a777-5b716c5b43f8.jpeg",
        isMain: false,
        id: 5279
      },
      {
        name: "athens tuk tuk thumbnail.jpeg",
        url: "original/641d7f02-934a-4d6b-8c78-56ebef882f79.jpeg",
        isMain: false,
        id: 5280
      },
      {
        name: "athens tuk tuk clients.jpeg",
        url: "original/a0af2d2d-7201-413c-bf6f-d9b6d062f5f9.jpeg",
        isMain: false,
        id: 5274
      }
    ],
    tags: [],
    placesToVisit: [
      {
        id: 4740,
        title: "thumbnail",
        enabled: true
      },
      {
        id: 4758,
        title: "Athens by Tuk Tuk ",
        enabled: true
      },
      {
        id: 4747,
        title: "The Panathenaic Stadium (Ancient Olympic Stadium)",
        enabled: true
      },
      {
        id: 4762,
        title: "The Neoclassical Academy of Athens",
        enabled: true
      },
      {
        id: 4764,
        title: "Hadrian's Arch and The Temple of Olympian Zeus",
        enabled: true
      },
      {
        id: 4997,
        title: "The Acropolis and Parthenon ",
        enabled: true
      },
      {
        id: 4766,
        title: "Ride through Athens' Hippest Neighborhoods",
        enabled: true
      },
      {
        id: 4767,
        title: "Best Views from Lycabettus Hill",
        enabled: true
      },
      {
        id: 4759,
        title: "Unforgettable Memories",
        enabled: true
      }
    ],
    status: 1,
    userMessage: null,
    systemMessage: null,
    stackTrace: null,
    debugInfo: null,
    generatedAtUtc: "2023-01-05T08:18:50.5361081Z",
  }
];

export type PriceData = {
  x: number;
  y: number;
};

export type ToursPriceData = {
  name: string;
  data: PriceData[];
};

export const toursPriceData: ToursPriceData[] = [
  {
    name: 'Tours Price',
    data: [
      { x: 1, y: 5 },
      { x: 2, y: 9 },
      { x: 3, y: 3 },
      { x: 4, y: 7 },
      { x: 5, y: 5 },
      { x: 6, y: 8 },
      { x: 7, y: 7 },
      { x: 8, y: 3 },
      { x: 9, y: 9 },
      { x: 10, y: 10 },
      { x: 11, y: 6 },
      { x: 12, y: 8 },
      { x: 13, y: 5 },
      { x: 14, y: 12 },
      { x: 15, y: 7 },
    ],
  },
];

export const ratingComments: TourComment[] = [
  {
    id: 28018,
    rating: 5,
    name: "Amazing tour!",
    date: "2022-12-31T14:10:20.3124672",
    message: "We were fortunate to view the ruins on this tour, including the underground. Lots of history and context included. Our guide was very knowledgeable and welcomed questions. The entire family enjoyed the tour. Quite an experience- so pleased we selected this tour. "
  },
  {
    id: 28017,
    rating: 5,
    name: "Amazing tour!",
    date: "2022-12-31T13:04:53.1800909",
    message: "Giovanni, our tour guide, was knowledgeable, a great story-teller, and funny! We've been on several tours through Italy and Giovanni is the most eloquent one we had. His voice is clear, enunciates well, and attention-grabbing. Small details but really helps you understand 100% of what's said for 3.5 hours.  He provided more than sufficient time for photos as well. Thanks for a great experience!"
  },
  {
    id: 27991,
    rating: 5,
    name: "Fantastic!",
    date: "2022-12-30T20:25:37.3516806",
    message: "Guido was knowledgeable, clearly communicated, and helped us feel we were walking the road with the Romans."
  },
  {
    id: 27989,
    rating: 5,
    name: "Great tour of the ruins",
    date: "2022-12-30T17:59:16.7380746",
    message: "This was a great tour that gave in-depth historical information of the area. Our guide was great! He was very knowledgeable, adjusted for the pace of the group, and had a good sense of humor. Highly recommend this tour!"
  }
]

export async function fetchTourById(tagId: number | string): Promise<Tour | undefined> {
  const response = (await (
    await fetch(
      `https://api2deus2wapp.azurewebsites.net/api/Product/product-details/${tagId}`
    )
  ).json());

  return response.data;
}

export async function fetchTourComments(
  productId: number,
  itemsToTake: number
  ): Promise<TourComment[] | undefined> {
  const response = (await (
    await fetch(
      `https://api2deus2wapp.azurewebsites.net/api/Comments/product-detail-comments?productId=${productId}&itemsToTake=${itemsToTake}`
    )
  ).json());

  return response.data;
}

export async function fetchToursByDestination(
  city: string | undefined,
  page = 1,
  offset = 15,
  date = new Date().toISOString().split('T')[0], // TODO we should use a time library
  _tag = '',
  _sort = ''
): Promise<ToursResults> {
  const timeoutPromise = (timeout: number): Promise<ToursResults> => {
    return new Promise((resolve) => {
      // let's duplicate some mock results
      const total = 368;
      const totalResults =
        page * offset > total ? 0 : Math.min(total - page * offset, offset);
      const results: ToursResults = {
        total,
        tours: [],
        similarTours: [],
        peopleChoice: [],
      };
      for (let i = 0; i < totalResults; i++) {
        const tour = tours.filter((el) => el.city === city)[0] ?? null;
        if (tour) {
          results.tours.push(tour);
        }
      }
      for (let i = 0; i < 2; i++) {
        const tour = tours.filter((el) => el.city === city)[0] ?? null;
        if (tour) {
          results.similarTours?.push(tour);
          results.peopleChoice?.push(tour);
        }
      }

      // TODO we should use a time library
      // mock results only for today
      if (date !== new Date().toISOString().split('T')[0]) {
        results.tours = [];
        results.peopleChoice = [];
      }

      return setTimeout(() => resolve(results), timeout);
    });
  };
  return await timeoutPromise(200);
}

export async function fetchTours(): Promise<Tour[]> {
  const timeoutPromise = (timeout: number): Promise<Tour[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(tours), timeout);
    });
  };
  return await timeoutPromise(200);
}

export function getToursFromStorage(): Tour[] {
  const dataInStorage = window.localStorage.getItem(LS_HISTORY);
  const recentSearches =
    dataInStorage === null ? [] : JSON.parse(dataInStorage);

  return recentSearches;
}

export function addTourToStorageHistory(tour: Tour) {
  const dataInStorage = window.localStorage.getItem(LS_HISTORY);
  let recentSearches = dataInStorage === null ? [] : JSON.parse(dataInStorage);

  recentSearches = recentSearches.filter((el: Tour) => el.id !== tour.id);
  recentSearches.unshift(tour);

  window.localStorage.setItem(LS_HISTORY, JSON.stringify(recentSearches));
}

// TODO the API Base URL should be in an ENV file/variable
export async function getResultByTag(tag: string) {
  return (
    await (
      await fetch(
        `https://api2deus2wapp.azurewebsites.net/api/GetBySeos/${tag}`
      )
    ).text()
  ).toLocaleLowerCase();
}

// TODO this method could be structured in a better way
export async function getResultByType(tag: string, type: string) {
  let results = null;
  switch (type) {
    case 'product':
      {
        const product = await fetchProductBySeoTag(tag);
        results = { data: product };
      }
      break;
    case 'category':
      {
        results = await fetchProductsByCategory(tag);
      }
      break;
    case 'country':
      {
        results = await fetchProductsByCountry(tag);
      }
      break;
    case 'destination':
      {
        results = await fetchProductsByDestination(tag);
      }
      break;
  }
  return results;
}

// TODO the API Base URL should be in an ENV file/variable
export async function fetchProductBySeoTag(tag: string) {
  // TODO replace this endpoint with the one to retrieve the product by seo tags when exists
  return (
    await fetch(
      'https://api2deus2wapp.azurewebsites.net/api/Product/product-info/101'
    )
  ).json();
}

// TODO the API Base URL should be in an ENV file/variable
export async function fetchProductsByCategory(tag: string) {
  return (
    await fetch(
      'https://api2deus2wapp.azurewebsites.net/api/Ratings/top-attractions?pageSize=15&pageIndex=1'
    )
  ).json();
}

// TODO the API Base URL should be in an ENV file/variable
export async function fetchProductsByCountry(tag: string) {
  return (
    await fetch(
      'https://api2deus2wapp.azurewebsites.net/api/Ratings/top-attractions?pageSize=15&pageIndex=1'
    )
  ).json();
}

// TODO the API Base URL should be in an ENV file/variable
export async function fetchProductsByDestination(tag: string) {
  return (
    await fetch(
      'https://api2deus2wapp.azurewebsites.net/api/Ratings/top-attractions?pageSize=15&pageIndex=1'
    )
  ).json();
}

export async function fetchAttractionsByQuery(query: string): Promise<Tour[]> {
  // Let's simulate an API call
  const timeoutPromise = (timeout: number): Promise<Tour[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => {
        const filteredTours = tours.filter((el) => {
          return el.attractions
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        resolve(filteredTours);
      }, timeout);
    });
  };
  return await timeoutPromise(200);
}

// TODO this should be called from getServerSide/getStaticProps from each page where we have
// this section
export async function fetchMostPopularTours(): Promise<Partial<Tour>[]> {
  // TODO the API Base URL should be in an ENV file/variable
  const response = (await (
    await fetch('https://api2deus2wapp.azurewebsites.net/api/Ratings/top-tours')
  ).json()) as TTGResponse<(Partial<Tour> | any)[] | any>;

  const tours: Tour[] = response.data.map((tour: Tour | any) =>
    formatTour(tour)
  );

  return tours;
}

export default Tour;
