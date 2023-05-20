export default [
  {
    name: '[WIP] Star Wars D-O Droid',
    description: 'One of my current projects is building the D-O droid from the Star Wars sequels. It will be a fully functional droid that can move around and make sounds. It is based on a design by Michael Baddeley which some major software changes. I am currently writing a blog post about this project, it will be available soon.',
    url: null,
    tags: ['Raspberry Pi', 'Arduino', 'ROS', '3D Printing'],
    imgThumb: require('~/assets/images/portfolio/dorobot/wip_1_thumb.jpeg'),
    imgThumbPosition: 'center',
    mainImage: 0,
    images: [
      {
        src: require('~/assets/images/portfolio/dorobot/wip_1.jpeg'),
        alt: 'Robot standing on a table with one wheel attached.',
      },
    ],
  },
  {
    name: 'Weather Station',
    description: 'I have always been interested in building my own weather station, I am currently working on one. While the project is not finished yet, you can already see the weather station in action (currently it is not live!).',
    url: 'https://weer.famseldeslachts.be',
    tags: ['Web', 'Vue', 'Nuxt', 'Spring', 'Arduino', 'ESP'],
    imgThumb: require('~/assets/images/portfolio/weather_station_thumb.jpeg'),
    mainImage: 0,
    images: [
      {
        src: require('~/assets/images/portfolio/weather_station_1.jpeg'),
        alt: 'Screenshot of the website',
      },
    ],
  },
  {
    name: 'ISW Leuven',
    description: 'For the student association ISW Leuven I made a new website and also a whole authentication system with a marketplace that made it possible for students to list their used books so that other students can buy it instead of a new one.',
    url: 'https://iswleuven.be',
    tags: ['Web', 'Laravel', 'Vue', 'Nuxt', 'Kubernetes'],
    mainImage: 0,
    imgThumb: require('~/assets/images/portfolio/isw_1_thumb.jpeg'),
    images: [
      {
        src: require('~/assets/images/portfolio/isw_1.jpeg'),
        alt: 'Screenshot of the website',
      },
      {
        src: require('~/assets/images/portfolio/isw_2.jpeg'),
        alt: 'Screenshot of a marketplace item page',
        title: 'An actual marketplace item listed. This view is only available for authenticated students, personal details are removed.',
      }
    ],
  },
  {
    name: 'VandereL',
    description: 'A website for an independant jeweler and leatherworker located in Belgium.',
    url: 'https://vanderel.be',
    tags: ['Web', 'CMS'],
    imgThumb: require('~/assets/images/portfolio/vanderel_thumb.jpeg'),
    mainImage: 0,
    images: [
      {
        src: require('~/assets/images/portfolio/vanderel.jpeg'),
        alt: 'Screenshot of the website',
      },
    ],
  },
  {
    name: 'Echo Communication',
    description: 'For a school project me and 3 other students were asked to create a website for a real company. Everyone had to make their own design, this was my result.',
    url: 'https://echocommunication.sigfried.be',
    tags: ['Web'],
    imgThumb: require('~/assets/images/portfolio/echo_communication_thumb.jpeg'),
    mainImage: 0,
    images: [
      {
        src: require('~/assets/images/portfolio/echo_communication.jpeg'),
        alt: 'Screenshot of the website',
      },
    ],
  },
  {
    name: 'Boomverzorging Michiel',
    description: 'This very simple one page website was made for my brother who is a treeworker.',
    url: 'https://boomverzorgingmichiel.be',
    tags: ['Web', 'Vue', 'Nuxt'],
    imgThumb: require('~/assets/images/portfolio/boomverzorging_michiel_thumb.jpeg'),
    mainImage: 0,
    images: [
      {
        src: require('~/assets/images/portfolio/boomverzorging_michiel.jpeg'),
        alt: 'Screenshot of the website',
      },
    ],
  },
  {
    name: 'ADS-B Receiver',
    description: 'As I am an airplane pilot myself I am always interested in the planes flying around. Therefore I decided to make a small ADS-B receiver, I transmit the data to FlightAware, FR24 and ADS-B Exchange.',
    url: {
      name: 'others-aircraft'
    },
    router: true,
    tags: ['Hardware', 'Airplanes & Space', 'Raspberry Pi'],
    imgThumb: require('~/assets/images/portfolio/adsb/thumb.jpeg'),
    mainImage: 0,
    images: [
      {
        src: require('~/assets/images/portfolio/adsb/antenna.jpeg'),
        alt: 'Picture showing the antenna above the roof.',
      },
      {
        src: require('~/assets/images/portfolio/adsb/rpi.jpeg'),
        alt: 'Picture showing the Raspberry Pi connected to a USB receiver.',
      },
    ],
  },
  {
    name: 'Mezoa',
    description: 'Mezoa is a therapeutic center for people with therapy, speech therapy and counseling. The website is still under construction, but a few pages are already available.',
    url: 'https://mezoa.be',
    tags: ['Web', 'Vue', 'Nuxt'],
  },
  {
    name: 'AS212767',
    description: 'This is my own personal research network. I have two IPv6 prefixes and advertise them on the internet.',
    url: 'https://as212767.net',
    tags: ['Networking', 'BGP'],
  }
]
