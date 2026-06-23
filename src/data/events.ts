export type EventRound = {
  name: string;
  durationLabel?: string;
  description: string;
  bullets?: string[];
};

export type EventCategory = {
  label: string;
  classes: string;
};

export type EventEntry = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  classes: string;
  categories?: EventCategory[];
  participants: string;
  venue: string;
  rounds: EventRound[];
  rules: string[];
  prohibited?: string[];
  teacherInCharges: string[];
};

export const events: EventEntry[] = [
  {
    slug: 'innovators-thinktank',
    index: '01',
    name: "Innovators' ThinkTank",
    tagline: 'Build the prototype. Pitch the company.',
    summary:
      'A hybrid of a Model-Making Exhibition and a Shark Tank–style business pitch. Teams build an original, science-based working model on the assigned theme — one that solves a real-world problem — then switch from scientist to strategist and pitch its viability and a business model to monetise it.',
    classes: '9 – 12',
    participants: '4 per team',
    venue: '4th Floor Examination Hall',
    rounds: [
      {
        name: 'Round 1 · The Innovation Model Showcase',
        durationLabel: '5 – 7 min (incl. demo)',
        description:
          'Teams build an original working model or prototype based on the assigned theme, explain the science behind it, and demonstrate it live.',
        bullets: ['Practical application', 'Scientific accuracy', 'Design ingenuity'],
      },
      {
        name: 'Round 2 · The Business Viability Pitch',
        durationLabel: '4 min pitch + 2 min Q&A',
        description:
          'Present how the innovation works in the real world. Think like a startup — charts, pitch decks, or mock campaigns are welcome.',
        bullets: [
          'Target audience or market',
          'Potential challenges and solutions',
          'Monetization and scalability',
          'Social / environmental impact',
        ],
      },
    ],
    rules: [
      'Round 1: 5–7 minutes including demonstration. Round 2: 4-minute pitch + 2-minute Q&A.',
      'Model must be functional (or clearly demonstrative if not fully working), original, and safe for display.',
      'Business pitch judged on practicality, creativity, scalability, and clarity of monetisation and strategy.',
      'Any copied idea leads to disqualification.',
    ],
    teacherInCharges: ['Mrs R Mukherjee', 'Ms D Chakraborty'],
  },

  {
    slug: 'scientific-showdown',
    index: '02',
    name: 'Scientific Showdown',
    tagline: 'Case X. Decode the science before time runs out.',
    summary:
      'A Case X Quiz Convention where quizzes collide with real-world scientific investigation. Dr. Neuron has vanished after unleashing a chain of scientific anomalies — teams must decode every clue through riddles, visual and audio deductions, rapid-fire questioning, and case analysis. A high-pressure scientific intelligence operation.',
    classes: '9 – 12',
    participants: '3 per team',
    venue: 'Conference Room',
    rounds: [
      {
        name: 'Round 1 · The Cipher Storm',
        durationLabel: '15 min · written elimination',
        description:
          'A written set testing speed, accuracy, and analytical thinking. Top-scoring teams advance.',
        bullets: [
          'Science trivia · logical reasoning · scientific riddles',
          'Pictorial analysis · data interpretation · mini case questions',
        ],
      },
      {
        name: 'Round 2 · The Investigation Chamber',
        durationLabel: 'audio-visual + on mic',
        description:
          'Teams analyse anomaly images, video clips, audio recordings, lab mishaps and AI failures — identify the problem, explain the science, and propose solutions. Top 7 teams proceed.',
        bullets: ['On-mic questioning', 'Audio-visual rapid fire', 'Bounce questions · live scoring'],
      },
      {
        name: 'Final · The Textual Takedown',
        description:
          'Finalists receive a short written scientific case study (e.g. a failed experiment) and must analyse, interpret, and present scientifically sound resolutions.',
      },
    ],
    rules: [
      'Each team must consist of exactly 3 participants (Classes 9–12).',
      'All rounds are on-the-spot and require no prior preparation.',
      'Necessary stationery and rough sheets are provided.',
      'Electronic devices are prohibited unless explicitly permitted during specific segments.',
      'Unfair means — whispering, internet use, external assistance — leads to immediate disqualification.',
      'Themes span Physics, Chemistry, Biology, Environmental Science, AI, Futuristic Tech, Nobel & Medical Science, Space Exploration, and Scientific Ethics & Disasters.',
    ],
    teacherInCharges: ['Mrs J Bhattacharyya'],
  },

  {
    slug: 'scientific-debate',
    index: '03',
    name: 'Scientific Debate Roundtable',
    tagline: 'Newsroom-style. Defend your assigned stance, live.',
    summary:
      'The battlefield is a newsroom and the weapon is scientific logic. Each participant is a science correspondent who must defend a FOR or AGAINST stance, assigned by the committee, on a controversial scientific topic dropped live — a high-pressure, real-time scientific press conference.',
    classes: '9 – 12',
    participants: '1 (solo event)',
    venue: 'Library · 4th Floor',
    rounds: [
      {
        name: 'Round 1 · Open Forum Debate',
        description:
          'The debate begins like a live news broadcast. Reporters raise placards to make a point; the Newsroom Anchor moderates. Instant responses, factual counters, and quick retorts are the heart of the round.',
      },
      {
        name: 'Round 2 · Crossfire Round',
        durationLabel: '180-sec head-to-head',
        description:
          'Two randomly chosen participants engage in a 180-second head-to-head rebuttal, followed by a final 30-second closing statement from each side.',
      },
    ],
    rules: [
      'FOR or AGAINST is assigned by the committee via lottery before the event.',
      'Individual interventions in the Open Forum must be under 1 minute.',
      'Raising a placard is required to request the floor, like a press conference.',
      'Reading from paper or devices is not recommended — spontaneity is scored.',
      'Judged on response quality, logic, articulation, rebuttals, and delivery.',
    ],
    teacherInCharges: ['Mrs S Dhar', 'Mr P P Lahiri'],
  },

  {
    slug: '8bit-hack',
    index: '04',
    name: '8Bit Hack',
    tagline: 'Six hours to build. Two hours to defend.',
    summary:
      'A full-throttle web development hackathon. Teams have 6 hours to ideate, develop, and deploy a real-world tech solution against themes released at the start, then pitch their product to judges — proving not just coding skill but impact, feasibility, and vision.',
    classes: '9 – 12',
    participants: '4 per team',
    venue: 'Computer Lab 1 + Auditorium',
    rounds: [
      {
        name: 'Coding Sprint',
        durationLabel: '6 hours',
        description:
          'Problem statements and themes are revealed, each team allotted a sector. The first hour is for ideation and planning; teams then code on their own devices and submit a functional MVP (website) by the deadline.',
        bullets: [
          'Working website / application + source code',
          'Brief documentation or README (solution + tech stack)',
          'Short demo video / PPT (1–2 mins)',
        ],
      },
      {
        name: 'Pitch & Demo Presentation',
        durationLabel: '5 min pitch + 2–3 min Q&A',
        description:
          'A comprehensive pitch covering the build from both a technical and real-world perspective, backed by a clear, visually engaging slide deck.',
        bullets: [
          'Problem statement & context',
          'Ideation & approach',
          'Tech stack & system design',
          'Functionality & key features',
          'Real-world application & impact',
          'Live demo of the MVP',
        ],
      },
    ],
    rules: [
      'Team size: 4 participants (Classes 9–12). All coding must be done during the 6-hour hack.',
      'Pre-made projects lead to disqualification. A working demo (even partial) is essential.',
      'Open-source libraries and frameworks are allowed; any tech stack is permitted.',
      'Internet is permitted, but AI-generated help must be used only after the first 4.5 hours and kept minimal.',
      'Judging is based on innovation, execution, and pitch clarity.',
    ],
    teacherInCharges: ['Mr S K Ray', 'Mrs S Roy', 'Mrs M Mukherjee'],
  },

  {
    slug: 'model-mayhem',
    index: '05',
    name: 'Model Mayhem',
    tagline: 'Working models. Real-world problems. STEAM integrated.',
    summary:
      'Teams present a working or non-working prototype with a real-world problem-solving connect, built within a 3 × 3 × 3 ft envelope and integrating at least two STEAM disciplines. An A3 narrative display ties the build to a real-life connect and a specific Sustainable Development Goal.',
    classes: '6 – 8 and 9 – 12',
    categories: [
      { label: 'Category 1', classes: '6 – 8' },
      { label: 'Category 2', classes: '9 – 12' },
    ],
    participants: '3 + 1 per team · max 3 teams per school',
    venue: 'TT Court',
    rounds: [
      {
        name: 'Display & Demonstration',
        description:
          'The prototype is set up at the assigned station with its A3 narrative display. Judges evaluate the evidence of the invention process, the invention impact, and the team’s communication journey.',
        bullets: [
          'Working or non-working prototype with a real-world connect',
          'Integrate at least two of Science, Technology, Engineering, Art, Mathematics',
          'A3 narrative sheet: real-life connect + the SDG it contributes to',
        ],
      },
    ],
    rules: [
      'One entry per team per school; a school may field up to 3 teams.',
      'Teams of up to 4, minimum 3. Mixed-grade teams are judged in the higher grade-level category.',
      'Any safe, non-prohibited material; maximum dimensions 3 ft × 3 ft × 3 ft.',
      'Judges’ decisions are final and binding.',
    ],
    prohibited: ['Weapons', 'Explosives', 'Any and all kinds of liquid'],
    teacherInCharges: ['Mr D Chakraborty', 'Mr T K Pal'],
  },

  {
    slug: 'mathematics-quest',
    index: '06',
    name: 'Mathematics Quest',
    tagline: 'Speed. Logic. Problem solving. No calculators.',
    summary:
      'A high-speed journey through numbers, logic, and strategy for the junior wing — from a mind-bending opening puzzle to a fast-paced Math Relay packed with geometry, speed math, and reasoning. Not just a test of skill, but a race where brains must work in sync.',
    classes: '6 – 8',
    participants: '3 – 4 per team',
    venue: 'AV Room',
    rounds: [
      {
        name: 'Round 1 · Opening Puzzle',
        durationLabel: '10 min',
        description:
          'A mathematics riddle or logical puzzle on screen. Solve it swiftly — the quickest thinkers score bonus points.',
      },
      {
        name: 'Round 2 · Math Relay',
        durationLabel: '40 min',
        description: 'A set of questions of increasing difficulty across three stacked levels.',
        bullets: [
          'Level 1 · Speed Math — 10 questions in 10 minutes',
          'Level 2 · Logical Reasoning — 5 questions in 10 minutes',
          'Level 3 · Problem Solving (arithmetic, geometry, algebra) — 20 minutes',
        ],
      },
    ],
    rules: [
      'Calculators and electronic devices are not allowed.',
      'All stationery is provided on the spot.',
      'All rules and regulations are explained before the event starts.',
    ],
    teacherInCharges: ['Mr D Mondal', 'Mr P P Lahiri'],
  },

  {
    slug: 'scinaptic-expedition',
    index: '07',
    name: 'Scinaptic Expedition',
    tagline: 'A trail of five stations. Five teams advance.',
    summary:
      'A science trail where knowledge is your compass. Teams navigate a circuit of 5 stations across Physics, Chemistry, Biology, and Data Analysis. Each team gets a pre-assigned randomised sequence; a correct answer earns the clue card to the next station. The first 5 teams to clear all 5 rounds advance to a simultaneous final challenge.',
    classes: '6 – 8 and 9 – 12',
    categories: [
      { label: 'Category 1', classes: '9 – 12 · 2 per team' },
      { label: 'Category 2', classes: '6 – 8 · 3 per team · 60 min cap' },
    ],
    participants: 'Cat 1 · 2 per team  ·  Cat 2 · 3 per team',
    venue: 'Assembly Hall',
    rounds: [
      {
        name: 'Rounds 1 – 5 · The Stations',
        description:
          'Teams work through their pre-assigned randomised sequence, solving one experiment or problem per station. Volunteers hand over the next clue card only on a correct answer; a wrong answer means a penalty and a retry.',
      },
      {
        name: 'Round 6 · The Final Round',
        description:
          'The first 5 teams to clear all 5 rounds qualify. All finalists compete simultaneously on a single concluding challenge — the first correct submission wins. Non-finalists are ranked by rounds completed, then by completion time.',
      },
    ],
    rules: [
      'Team size: Cat 1 — 2 (Classes 9–12); Cat 2 — 3 (Classes 6–8).',
      'All answers are written on the response sheet provided at each station.',
      'At the computer station, only the pre-loaded file may be accessed — no browsing or other tabs.',
      'Mobile phones are strictly prohibited; detection results in immediate disqualification.',
      'No revisiting completed stations, no hints from volunteers, no sharing clue cards. All equipment is supplied.',
      'Category 2 teams must finish within 60 minutes; the moderator’s decision on correctness is final.',
    ],
    teacherInCharges: ['Mrs A Chowdhury'],
  },

  {
    slug: 'project-envision',
    index: '08',
    name: 'Project Envision',
    tagline: 'On-spot editing. Live theme. Then turn on your teammate.',
    summary:
      'A video-editing showdown where editors sculpt chaos into coherence. Participants race against time, transforming raw visuals into masterpieces — first to a released theme, then in a twist-filled brand war against their own teammate.',
    classes: '9 – 12',
    participants: '2 per team',
    venue: 'Computer Lab 2',
    rounds: [
      {
        name: 'Round 1 · On-Spot Editing',
        durationLabel: '1.5 hr · 60 – 90 sec',
        description:
          'A theme is given at the start. A shared folder of raw clips and audio is provided; teams may use their own assets. Budget the window as 1 hr editing + 0.5 hr brainstorming. Judged on storytelling, theme coherence, technical editing, colour grading, and audio sync.',
      },
      {
        name: 'Round 2 · Ad Clash',
        durationLabel: '1 hr',
        description:
          'Each team member competes against their own teammate, representing a rival brand (Pepsi vs Coca-Cola, Apple vs Android). Re-edit the rival’s original footage and audio into an ad for your own brand — cut, reframe, distort, remix, or overlay. Visual humour, satire, and strong branding are appreciated.',
      },
    ],
    rules: [
      'Maintain decorum; vulgar language, inappropriate humour, or disruptive behaviour leads to immediate disqualification.',
      'Bring your own laptops and editing software.',
      'AI tools and plugins are allowed but must be used creatively and transparently mentioned in the submission notes.',
      'Internet access is permitted; no pre-made templates are allowed.',
      'All videos must be rendered and submitted within the time limit. Plagiarism or template-reliant edits are disqualified.',
    ],
    teacherInCharges: ['Mr S K Ray', 'Mrs M Mukherjee', 'Mrs S Roy'],
  },
];

export const eventsBySlug: Record<string, EventEntry> =
  Object.fromEntries(events.map((e) => [e.slug, e]));
