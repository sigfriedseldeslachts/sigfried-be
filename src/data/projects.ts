export interface IImage {
  src: ImageMetadata;
  alt: string;
};

export interface IProject {
  name: string;
  description: string;
  url: string | null;
  tags: string[];
  imgThumb?: ImageMetadata;
  imgThumbPosition?: 'center' | 'top';
  mainImage: number;
  images?: IImage[];
};

// Images import
import doRobot_wipThumb from './images/portfolio/dorobot/wip_1_thumb.jpeg';
import doRobot_wip1 from './images/portfolio/dorobot/wip_1.jpeg';
import weather_Thumb from './images/portfolio/weather_station_thumb.jpeg';
import weather_1 from './images/portfolio/weather_station_1.jpeg';
import isw_thumb from './images/portfolio/isw_1_thumb.jpeg';
import isw_1 from './images/portfolio/isw_1.jpeg';
import isw_2 from './images/portfolio/isw_2.jpeg';
import vanderl_thumb from './images/portfolio/vanderel_thumb.jpeg';
import vanderl_1 from './images/portfolio/vanderel.jpeg';
import echoComm_Thumb from './images/portfolio/echo_communication_thumb.jpeg';
import echoComm_1 from './images/portfolio/echo_communication.jpeg';
import michiel_thumb from './images/portfolio/boomverzorging_michiel_thumb.jpeg';
import michiel_1 from './images/portfolio/boomverzorging_michiel.jpeg';
import adsb_thumb from './images/portfolio/adsb/thumb.jpeg';
import adsb_antenna from './images/portfolio/adsb/antenna.jpeg';
import adsb_rpi from './images/portfolio/adsb/rpi.jpeg';

const projects: IProject[] = [
  {
    name: '[WIP] Star Wars D-O Droid',
    description: 'One of my current projects is building the D-O droid from the Star Wars sequels. It will be a fully functional droid that can move around and make sounds. It is based on a design by Michael Baddeley which some major software changes. I am currently writing a blog post about this project, it will be available soon.',
    url: null,
    tags: ['Raspberry Pi', 'Arduino', 'ROS', '3D Printing'],
    imgThumb: doRobot_wipThumb,
    imgThumbPosition: 'center',
    mainImage: 0,
    images: [
      {
        src: doRobot_wip1,
        alt: 'Robot standing on a table with one wheel attached.',
      },
    ],
  },
  {
    name: 'Weather Station',
    description: 'I have always been interested in building my own weather station, I am currently working on one. While the project is not finished yet, you can already see the weather station in action (currently it is not live!).',
    url: 'https://weer.famseldeslachts.be',
    tags: ['Web', 'Vue', 'Nuxt', 'Spring', 'Arduino', 'ESP'],
    imgThumb: weather_Thumb,
    mainImage: 0,
    images: [
      {
        src: weather_1,
        alt: 'Website of the weather station.',
      },
    ],
  },
  {
    name: 'ISW Leuven',
    description: 'For the student association ISW Leuven I made a new website and also a whole authentication system with a marketplace that made it possible for students to list their used books so that other students can buy it instead of a new one.',
    url: 'https://iswleuven.be',
    tags: ['Web', 'Laravel', 'Vue', 'Nuxt', 'Kubernetes'],
    mainImage: 0,
    imgThumb: isw_thumb,
    images: [
      {
        src: isw_1,
        alt: 'Screenshot of the website',
      },
      {
        src: isw_2,
        alt: 'Screenshot of a marketplace item page',
      }
    ],
  },
  {
    name: 'VandereL',
    description: 'A website for an independant jeweler and leatherworker located in Belgium.',
    url: 'https://vanderel.be',
    tags: ['Web', 'CMS'],
    imgThumb: vanderl_thumb,
    mainImage: 0,
    images: [
      {
        src: vanderl_1,
        alt: 'Screenshot of the website',
      },
    ],
  },
  {
    name: 'Echo Communication',
    description: 'For a school project me and 3 other students were asked to create a website for a real company. Everyone had to make their own design, this was my result.',
    url: 'https://echocommunication.sigfried.be',
    tags: ['Web'],
    imgThumb: echoComm_Thumb,
    mainImage: 0,
    images: [
      {
        src: echoComm_1,
        alt: 'Screenshot of the website',
      },
    ],
  },
  {
    name: 'Boomverzorging Michiel',
    description: 'This very simple one page website was made for my brother who is a treeworker.',
    url: 'https://boomverzorgingmichiel.be',
    tags: ['Web', 'Vue', 'Nuxt'],
    imgThumb: michiel_thumb,
    mainImage: 0,
    images: [
      {
        src: michiel_1,
        alt: 'Screenshot of the website',
      },
    ],
  },
  {
    name: 'ADS-B Receiver',
    description: 'As I am an airplane pilot myself I am always interested in the planes flying around. Therefore I decided to make a small ADS-B receiver, I transmit the data to FlightAware, FR24 and ADS-B Exchange.',
    url: '/projects/aircraft',
    tags: ['Hardware', 'Airplanes & Space', 'Raspberry Pi'],
    imgThumb: adsb_thumb,
    mainImage: 0,
    images: [
      {
        src: adsb_antenna,
        alt: 'Picture showing the antenna above the roof.',
      },
      {
        src: adsb_rpi,
        alt: 'Picture showing the Raspberry Pi connected to a USB receiver.',
      },
    ],
  },
  {
    name: 'Mezoa',
    description: 'Mezoa is a therapeutic center for people with therapy, speech therapy and counseling. The website is still under construction, but a few pages are already available.',
    url: 'https://mezoa.be',
    tags: ['Web', 'Vue', 'Nuxt'],
    mainImage: 0,
  },
  {
    name: 'AS212767',
    description: 'This is my own personal research network. I have two IPv6 prefixes and advertise them on the internet.',
    url: 'https://as212767.net',
    tags: ['Networking', 'BGP'],
    mainImage: 0,
  }
];

export default projects;
