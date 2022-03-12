export default [
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
    name: 'Mezoa',
    description: 'Mezoa is a therapeutic center for people with therapy, speech therapy and counseling. The website is still under construction, but a few pages are already available.',
    url: 'https://mezoa.be',
    tags: ['Web', 'Vue', 'Nuxt'],
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
    name: 'AS212767',
    description: 'This is my own personal research network. I have two IPv6 prefixes and advertise them on the internet.',
    url: 'https://as212767.net',
    tags: ['Networking', 'BGP'],
  }
]
