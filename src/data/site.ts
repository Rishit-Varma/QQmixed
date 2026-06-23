/**
 * Site-wide content ported from the school's confluence site:
 * contact, socials, address, and map. Chapter-02 facing.
 */
export const site = {
  brand: { first: 'Quantum', second: 'Qubit' },
  blurb:
    'Science & Technology Confluence. A platform celebrating innovation, discovery, and technological excellence.',
  email: 'scitechlabs.dbpc@gmail.com',
  address: ['Don Bosco School', 'Park Circus', 'Kolkata, India'],
  mapEmbed:
    'https://www.google.com/maps?q=Don+Bosco+School+Park+Circus+Kolkata&output=embed',
  mapLink: 'https://maps.app.goo.gl/WYJ7BnprhSWQL9Fn7',
  socials: {
    instagram: 'https://www.instagram.com/quantumqubit.dbpc',
    facebook: 'https://www.facebook.com/profile.php?id=61578314153719',
    youtube: 'https://www.youtube.com/@QuantumQubit-Dbpc',
  },
} as const;

/** About-section content (Chapter 02). */
export const about = {
  tagline:
    'The Science & Technology Confluence bringing together brilliant minds to explore the frontiers of innovation.',
  agenda:
    'A one-day confluence offering a unique platform for students to present original ideas, engage with emerging scientific trends, and interact directly with eminent minds from academia, industry, and research. Through a curated series of frontiers, Quantum Qubit cultivates future-ready thinkers equipped to thrive in an ever-evolving world.',
  pillars: [
    {
      title: 'Cutting-Edge Science',
      body: 'The latest in scientific research, quantum thinking, biotechnology, and emerging fields — graded on rigour, not theatrics.',
    },
    {
      title: 'Academic Collaboration',
      body: 'Direct engagement with researchers, scientists, and educators across leading institutions, with cross-school teams the default mode.',
    },
    {
      title: 'Scientific Innovation',
      body: 'From working prototypes to live debates — every frontier asks teams to build something defendable from first principles.',
    },
  ],
} as const;