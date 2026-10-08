// All site content lives here. Edit this file, then run `npm run build`.
//
// Text fields support **bold** and [links](https://...).
// Media items: img('name', 'caption') / video('name', 'caption') / model('file.glb', 'label')
// where 'name' is an output name from tools/optimize-media.mjs.

const img = (name, cap = '') => ({ type: 'img', name, cap });
const video = (name, cap = '') => ({ type: 'video', name, cap });
const model = (src, label, poster = '') => ({ type: 'model', src, label, poster });

export const site = {
  name: 'Dylan Thompson',
  url: 'https://dylanthompson01.github.io',
  email: 'dylan.thompson542@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dylanthompson01/',
  github: 'https://github.com/dylanthompson01',
  resume: '/Thompson_Resume.pdf',
  location: 'Orlando, FL',
  description:
    'Dylan Thompson, mechanical engineering student at the University of Central Florida. Manufacturing, CAD, CNC machining, thermal research, and robotics.',
};

export const home = {
  hello: "Hi, I'm Dylan.",
  lead: 'Mechanical engineering student at **UCF**. I build things and put them to work.',
  photo: 'portrait',
  background: 'sunset',
  // "About me" section on the home page: past, present, future.
  story: [
    {
      label: 'Past',
      body: 'LEGO, then cardboard, then circuits and math. Building things is what led me to engineering.',
    },
    {
      label: 'Present',
      body: 'Mechanical engineering at UCF, research, a 60+ member ASME team, GE Vernova, and now Lockheed Martin.',
    },
    {
      label: 'Future',
      body: 'A close team working on hard problems, like thermal management for computing hardware.',
    },
  ],
  // Gallery on the home page. area picks the tile's slot in the mosaic (see .gallery-grid in main.css).
  projects: [
    { slug: 'ge-vernova', area: 'a' },
    { slug: 'cnc-putter', area: 'b' },
    { slug: 'robotic-arm', area: 'c' },
    { slug: 'solidworks-certification', area: 'd' },
    { slug: 'heat-pipe-research', area: 'e' },
    { slug: 'asme-robot', area: 'f' },
    { slug: 'fledge', area: 'g' },
    { slug: 'baja-sae', area: 'h' },
  ],
};

// ─── Experience ──────────────────────────────────────────────────────────────
// logo: square mark shown in the tile (files in assets/logos).
export const experience = [
  {
    id: 'lockheed',
    org: 'Lockheed Martin',
    role: 'Missiles and Fire Control Engineer',
    logo: '/assets/logos/tile-lockheed-martin.svg',
    dates: 'Oct 2026 to Present',
    start: '2026-10',
    kind: 'CWEP',
    tag: 'Production engineering',
    current: true,
    summary: 'Supporting the production operations engineering team with day to day projects and technical tasks.',
    bullets: ['**Support the production operations engineering team** with day to day projects and technical tasks.'],
  },
  {
    id: 'ge-vernova',
    org: 'GE Vernova',
    role: 'Manufacturing Engineering Intern',
    logo: '/assets/logos/ge-vernova.svg',
    dates: 'May to Aug 2026',
    start: '2026-05',
    end: '2026-08',
    kind: 'Internship',
    tag: 'Manufacturing',
    project: 'ge-vernova',
    summary:
      'Designed and machined lift bracket tooling, doubled CPT throughput in a kaizen event, built a live maintenance dashboard, and launched an onboarding hub for the commercial team.',
    bullets: [
      '**Designed and drafted load-bearing lift bracket extensions** in SolidWorks and machined them in-house, validating a 200 to 300 lb load case with stress analysis and drawings built for repeat manufacturing.',
      '**Doubled CPT production throughput** during a Shingijutsu kaizen event, applying lean methods to process flow and waste.',
      '**Automated a Power Query pipeline** consolidating 7 continuously updating Excel sources into one live dashboard, with AI-assisted ranking to prioritize preventive maintenance through IBM Maximo across 300+ monthly work orders.',
      '**Built a Maximo PM library** with frequency-based maintenance routines, new asset registrations, and formal parts quotes.',
      '**Built an SSO-secured onboarding hub** for Commercial Operations from scattered SharePoint documentation, now used by 3 new commercial hires.',
      '**Presented to CDP participants and commercial leadership** on using Amp to generate HTML dashboards and publish them to GitHub.',
    ],
  },
  {
    id: 'itl',
    org: 'UCF Interfacial Transport Lab',
    role: 'Undergraduate Researcher',
    logo: '/assets/logos/tile-ucf.svg',
    dates: 'Jun 2025 to Present',
    start: '2025-06',
    kind: 'Research',
    tag: 'Thermal',
    project: 'heat-pipe-research',
    summary:
      'Researching pulsating heat pipes and two-phase passive cooling with ANSYS CFD, SolidWorks, aluminum prototypes, and a co-authored research paper.',
    bullets: [
      '**Investigate thermal performance** of pulsating heat pipes, two-phase passive cooling devices that move heat out of dense, high-power electronics.',
      '**Supported CFD analysis in ANSYS** of a single-loop aluminum heat pipe, comparing simulated thermal performance against experimental prototype results.',
      '**Modeled the assembly in SolidWorks**, fabricated aluminum prototypes with UCF machinists, and co-authored a published research paper.',
      '**Wrote Python scripts for lab instrumentation**, including Zaber stepper-motor XYZ stage control and sensor data capture.',
    ],
  },
  {
    id: 'asme',
    org: 'ASME Student Design Competition',
    role: 'Project Lead',
    logo: '/assets/logos/tile-ucf.svg',
    dates: 'Sep 2025 to Present',
    start: '2025-09',
    kind: 'Leadership',
    tag: 'Robotics',
    project: 'asme-robot',
    summary:
      'Leading a 60+ member team designing and building an autonomous robot that collects, sorts, and disposes of waste.',
    bullets: [
      '**Lead a 60+ member team** designing and building an autonomous robot to collect, sort, and dispose of waste.',
      '**Direct CAD, prototyping, and physical testing** to improve autonomous navigation, sorting accuracy, and material handling across inclines and rough terrain.',
      '**Manage design validation and deliverables**, including fabrication documentation and demonstration videos, to maximize scoring under timed competition rules.',
    ],
  },
  {
    id: 'baja',
    org: 'Baja SAE',
    role: 'Machinist',
    logo: '/assets/logos/tile-ucf.svg',
    tone: 'orange',
    dates: 'Aug 2025 to Aug 2026',
    start: '2025-08',
    end: '2026-08',
    kind: 'Team',
    tag: 'Machining',
    location: 'Orlando, FL',
    project: 'baja-sae',
    summary:
      'Machined drivetrain and chassis components for an off-road competition vehicle on a ProtoTRAK CNC lathe and manual mill, held to ±0.005".',
    bullets: [
      '**Machined precision drivetrain and chassis components** on a CNC lathe (ProtoTRAK) and manual mill to ±0.005".',
      '**Prototyped, inspected, and documented 10+ custom components** to SAE standards across endurance, acceleration, and maneuverability events.',
    ],
  },
  {
    id: 'robotics',
    org: 'Robotics Club of Central Florida',
    role: 'Drive & Science Team',
    logo: '/assets/logos/tile-ucf.svg',
    tone: 'plum',
    dates: 'Aug to Dec 2025',
    start: '2025-08',
    end: '2025-12',
    kind: 'Team',
    tag: 'Rover',
    location: 'Orlando, FL',
    summary:
      'Designed and tested mechanical systems for a lunar rover prototype (Project Storm) built for terrain navigation and autonomous object retrieval.',
    bullets: [
      '**Designed and tested mechanical systems** for a lunar rover prototype with a robotic arm for object retrieval.',
      '**Built wooden test rigs** for motor load testing up to 150 lb, validating structural integrity and power delivery.',
      '**Used precise CAD modeling** to improve servo integration across articulated subsystems.',
    ],
  },
];

export const education = {
  logo: '/assets/logos/ucf.svg',
  degree: 'B.S. Mechanical Engineering',
  school: 'University of Central Florida',
  detail: 'Expected 2029 · GPA 3.6',
};

// url: link for the "View credential" button (leave '' to hide it). id: shown as "Credential ID".
export const certifications = [
  {
    short: 'CSWP', logo: '/assets/logos/solidworks.svg', wide: true, name: 'Certified SolidWorks Professional', issuer: 'Dassault Systèmes', date: 'Aug 2025',
    note: 'SOLIDWORKS CAD Design Professional: advanced part modeling, configurations, and design changes.',
    url: 'https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-QRFSNZMG84', id: 'C-QRFSNZMG84',
  },
  {
    short: 'CSWA', logo: '/assets/logos/solidworks.svg', wide: true, name: 'Certified SolidWorks Associate', issuer: 'Dassault Systèmes', date: 'Summer 2025',
    note: 'Part modeling, assemblies, and drawings.', url: '', id: '',
  },
  {
    short: 'LSS', logo: '/assets/logos/yellow-belt.svg', name: 'Lean Six Sigma Yellow Belt', issuer: 'Council for Six Sigma Certification', date: 'Dec 2025',
    note: 'Lean process improvement and waste reduction.', url: '', id: 'KdLu45aHI9',
  },
  {
    short: 'MOS', logo: '/assets/logos/microsoft.svg', name: 'Microsoft Office Specialist', issuer: 'Microsoft', date: 'Jan 2021',
    note: 'Excel, Word, and PowerPoint 2016.', url: 'https://verify.certiport.com', id: 'J6eD-4TCm',
  },
  {
    short: 'MATLAB', logo: '/assets/logos/matlab.webp', name: 'MATLAB Onramp', issuer: 'MathWorks', date: 'Feb 2026',
    note: 'Self-paced MATLAB training course, completed 100%.', url: '', id: '',
  },
];

export const activities = [
  { title: 'Co-Founder, Seams', body: 'Direct-to-consumer apparel brand, 2023 to 2025. $200K+ in total sales, owning marketing, product design, fulfillment, and customer experience.' },
  { title: 'Creator, Fledge', body: 'A job application tool for students, with a Chrome extension that fills in applications. Live at [fledgejobs.com](https://fledgejobs.com).' },
];

// icon: a simple-icons slug, or omit and use `word` for a wordmark tile.
// icon: a simple-icons slug (drawn in the brand color). logo: an image file. word: text fallback.
export const skills = [
  { name: 'SolidWorks', cat: 'CAD · CSWP', logo: '/assets/logos/solidworks.svg', wide: true },
  { name: 'SolidWorks Simulation', cat: 'FEA', logo: '/assets/logos/solidworks.svg', wide: true },
  { name: 'ANSYS Fluent', cat: 'CFD', icon: 'ansys', wide: true },
  { name: 'MATLAB', cat: 'Onramp certified', logo: '/assets/logos/matlab.webp' },
  { name: 'Python', cat: 'Data analysis', icon: 'python' },
  { name: 'Arduino', cat: 'Embedded · C++', icon: 'arduino' },
  { name: 'Bambu Lab', cat: '3D printing', icon: 'bambulab' },
  { name: 'IBM Maximo', cat: 'Maintenance (CMMS)', logo: '/assets/logos/ibm.svg', wide: true },
  { name: 'Excel Power Query', cat: 'Data pipelines', logo: '/assets/logos/excel.svg' },
  { name: 'HTML & CSS', cat: 'Internal tools', icon: 'html5' },
  { name: 'GitHub', cat: 'Publishing', icon: 'github' },
  { name: 'Lean Six Sigma', cat: 'Yellow Belt', logo: '/assets/logos/yellow-belt.svg' },
  { name: 'ProtoTRAK', cat: 'CNC machining', word: 'CNC' },
  { name: 'Manual mill', cat: 'Machining', word: 'MILL' },
];

// ─── Projects ────────────────────────────────────────────────────────────────
// filters: industry | research | robotics | manufacturing | design
export const projects = [
  {
    slug: 'ge-vernova',
    title: 'GE Vernova',
    subtitle: 'Manufacturing Engineering Internship',
    year: 'Summer 2026',
    filters: ['industry', 'manufacturing'],
    cover: 'gev-brand',
    card: 'Shop floor tooling, a kaizen that doubled throughput, a live maintenance dashboard, and an onboarding hub.',
    lead: 'A summer on a manufacturing floor: designing tooling the shop can reproduce without me, doubling a line’s throughput in a kaizen event, turning scattered maintenance data into one live view, and building an onboarding hub for the commercial team.',
    tags: ['SolidWorks', 'Lean / Kaizen', 'IBM Maximo', 'Power Query', 'Machining', 'HTML / GitHub'],
    meta: [
      ['Role', 'Manufacturing Engineering Intern'],
      ['Timeline', 'May to Aug 2026'],
      ['Teams', 'Facility Management · Manufacturing · Aero Services'],
      ['Tools', 'Maximo, Excel Power Query, SolidWorks, HTML/CSS, GitHub'],
    ],
    stats: [
      { n: 2, suffix: 'x', label: 'CPT throughput in a kaizen event' },
      { n: 7, label: 'Excel sources in one live dashboard' },
      { n: 300, suffix: '+', label: 'monthly work orders prioritized' },
      { n: 3, label: 'new hires onboarded with the hub' },
    ],
    sections: [
      {
        kicker: '01 · Shop floor tooling',
        title: 'Tooling the floor can reproduce without me',
        body: [
          'The paint area needed a better way to mount its paint pumps on a lift. I owned the part from sketch to shop floor.',
        ],
        bullets: [
          '**Designed load-bearing lift bracket extensions** in SolidWorks.',
          '**Validated a 200 to 300 lb load case** with stress analysis.',
          '**Machined the parts in-house and made full drawings**, so any work center can make more.',
        ],
        media: [
          img('gev-brackets-row', 'Finished lift brackets'),
          img('gev-brackets-table', 'Brackets and extension off the machine'),
          img('gev-paint-booth', 'Paint pump mounting area'),
        ],
      },
      {
        kicker: '02 · Kaizen',
        title: 'Doubling a line in one week',
        body: [
          'During a Shingijutsu kaizen event on the CPT line, we applied lean methods to process flow and waste, and **doubled production throughput** inside the week.',
        ],
        media: [img('gev-lean-day', 'Intern Lean Day')],
      },
      {
        kicker: '03 · Maintenance data',
        title: 'One live view of maintenance',
        bullets: [
          '**Consolidated 7 continuously updating Excel sources** into one live dashboard with Power Query.',
          '**Added AI-assisted ranking** to prioritize preventive maintenance through IBM Maximo, across 300+ monthly work orders.',
          '**Built a Maximo PM library** with frequency-based routines, new asset registrations, and formal parts quotes.',
        ],
      },
      {
        kicker: '04 · Commercial Operations',
        title: 'An onboarding hub the team uses',
        bullets: [
          '**Interviewed the commercial team** to define requirements, then iterated on drafts with their feedback.',
          '**Built an SSO-secured site** that replaced scattered SharePoint docs with summaries and downloadable source PDFs.',
          '**Onboarded 3 new commercial hires** with it, with rollout continuing.',
          '**Presented to CDP participants and commercial leadership** on building HTML dashboards with Amp and publishing them to GitHub.',
        ],
      },
    ],
    learnings: [
      {
        title: 'More goes into maintenance than I expected',
        body: 'The data sheets tracking every machine, work orders written to prevent failures rather than fix them, and the full approval process when a problem comes up.',
      },
      {
        title: 'Talk to the people who’ll use it before you build it',
        body: 'Both the dashboard and the Aero site changed shape after I interviewed their users. My drafts built on assumptions weren’t wrong so much as aimed at the wrong problem.',
      },
      {
        title: 'Kaizen works because it forces implementation inside the week',
        body: 'I’d read about lean. Watching a production line change during the event, not in a report afterward, taught me why the time constraint is the method.',
      },
    ],
    gallery: [
      img('gev-sign', 'First day'),
      img('gev-building'),
      img('gev-display', 'Product display'),
      img('gev-office'),
    ],
  },
  {
    slug: 'fledge',
    title: 'Fledge',
    subtitle: 'Job application platform',
    year: 'Live',
    filters: ['software', 'design'],
    cover: 'fledge-cover',
    card: 'A job application tracker for students, with a Chrome extension that fills in applications for you.',
    lead: 'A job application tool I built for students: every role scored against your resume, every application tracked on one screen, and a Chrome extension that fills in applications on Workday, Greenhouse, and Lever.',
    tags: ['Web app', 'Chrome extension', 'Product design', 'Live'],
    meta: [
      ['Role', 'Creator'],
      ['Product', 'Web app and Chrome extension'],
      ['For', 'Students applying to internships'],
      ['Live at', '[fledgejobs.com](https://fledgejobs.com)'],
    ],
    sections: [
      {
        kicker: 'Matching',
        title: 'Every role scored against your resume',
        body: ['Postings come up one at a time with a match score and what it matched on. Keep the ones worth applying to and move past the rest, without tabs or a spreadsheet.'],
      },
      {
        kicker: 'Tracking',
        title: 'Every application in one place',
        bullets: [
          'Applications, with where each one got to.',
          'Roles saved for later, ready when you are.',
          'A pipeline of how many are out and how many came back.',
        ],
      },
      {
        kicker: 'Extension',
        title: 'Applying, made faster',
        body: ['A free Chrome extension fills in applications on Workday, Greenhouse, and Lever, and can upload a tailored resume. Try it at [fledgejobs.com](https://fledgejobs.com).'],
      },
    ],
  },
  {
    slug: 'asme-robot',
    title: 'Autonomous Waste-Collection Robot',
    subtitle: 'ASME Student Design Competition 2025/26',
    year: '2025 to Present',
    filters: ['robotics', 'design'],
    cover: 'asme-robot',
    card: 'Led 60+ members to build a robot that collects, sorts, and disposes of waste in a mock city.',
    lead: 'As project lead, I took a 60+ member team through a full design cycle, from field schematics to competition day, on a robot that collects, sorts, and disposes of waste in a mock city.',
    tags: ['Project lead', 'SolidWorks', '3D printing', 'Electronics', 'Testing'],
    meta: [
      ['Role', 'Project Lead'],
      ['Timeline', 'Sep 2025 to Present'],
      ['Team', '60+ members, multidisciplinary'],
      ['Tools', 'SolidWorks, 3D printing, embedded electronics'],
    ],
    stats: [
      { n: 60, suffix: '+', label: 'team members led' },
    ],
    sections: [
      {
        kicker: 'The challenge',
        title: 'Clean up a mock city, autonomously',
        body: [
          'ASME’s 2025/26 Student Design Competition asked for a robot that could navigate a mock city playfield (streets, buildings, a hill), **collect waste bins, sort them, and deliver them to a dumpsite**, over inclines and rough terrain.',
        ],
        media: [img('asme-field', 'Sample playfield schematic from the competition rules'), img('asme-kickoff', 'Kickoff meeting')],
      },
      {
        kicker: 'The build',
        title: 'From omni-wheel CAD to a driving prototype',
        body: ['We ran the full design cycle in-house.'],
        bullets: [
          '**Hexagonal omni-wheel chassis** designed in SolidWorks, then 3D printed and iterated.',
          '**Gearbox and sorting mechanisms** prototyped and tested on the bench.',
          '**Electronics integration** and drive testing on real surfaces.',
        ],
        media: [
          img('asme-chassis-cad', 'Chassis CAD'),
          img('asme-chassis-print', 'First printed chassis'),
          img('asme-chassis-wheels', 'Chassis with omni wheels'),
          video('asme-drive-1', 'Early drive test'),
          img('asme-gearbox', 'Gearbox prototype'),
          video('asme-drive-2', 'Sorting mechanism test'),
          img('asme-electronics', 'Electronics bring-up'),
        ],
      },
      {
        kicker: 'Leading 60+ people',
        title: 'Keeping a big team building the same robot',
        body: [
          'The hard part of a team this size is keeping everyone pointed at the same machine.',
        ],
        bullets: [
          '**Coordinated CAD, prototyping, and testing** across sub-teams for the full academic year.',
          '**Owned design validation**: fabrication documentation, demonstration videos, and rule compliance to maximize scoring.',
        ],
        media: [img('asme-build-session', 'Build session'), video('asme-drive-3', 'Drive test'), img('asme-robot', 'Competition robot'), img('asme-competition', 'Competition day')],
      },
    ],
    gallery: [img('asme-iefx-team', 'Competition team'), img('asme-team', 'The team'), img('asme-iefx-duo', 'Competition day'), img('asme-robot')],
  },
  {
    slug: 'heat-pipe-research',
    title: 'Pulsating Heat Pipe Research',
    subtitle: 'UCF Interfacial Transport Lab',
    year: '2025 to Present',
    filters: ['research'],
    cover: 'php-imaging',
    card: 'Passive two-phase cooling: ANSYS CFD, SolidWorks, aluminum prototypes, and a co-authored research paper.',
    lead: 'Studying passive two-phase cooling devices that move heat through oscillating fluid, with no pump.',
    tags: ['ANSYS Fluent', 'CFD', 'SolidWorks', 'Python', 'Prototyping'],
    meta: [
      ['Role', 'Undergraduate Researcher'],
      ['Timeline', 'Jun 2025 to Present'],
      ['Lab', 'Interfacial Transport Lab, UCF'],
      ['Tools', 'ANSYS Fluent, SolidWorks, Python'],
    ],
    sections: [
      {
        kicker: 'Background',
        title: 'Moving heat without a pump',
        body: [
          'A pulsating heat pipe (PHP) is a looped tube partly filled with a working fluid. Heat at one end boils the fluid, and the resulting pressure differences push **oscillating slugs of liquid and plugs of vapor** that carry heat to the cool end, entirely passively.',
          'My work focuses on a **single-loop aluminum prototype**: understanding how efficiently and how predictably it moves heat across different flow conditions.',
        ],
        media: [img('php-imaging', 'Imaging and data acquisition setup'), img('php-apparatus', 'Test apparatus'), img('php-lab', 'The lab')],
      },
      {
        kicker: 'What I do',
        title: 'Simulation, hardware, and data',
        bullets: [
          '**CFD in ANSYS** of the internal two-phase flow, validating simulated thermal performance against experimental prototype results.',
          '**SolidWorks exploded-view assemblies**, and aluminum test prototypes fabricated alongside UCF machinists.',
          '**Debugged Python scripts** for oscillation data visualization and thermal performance analysis.',
          '**Co-authored a research paper** on two-phase passive cooling.',
        ],
        media: [img('php-rig', 'Test rig'), img('php-data', 'Oscillation data review')],
      },
    ],
  },
  {
    slug: 'cnc-putter',
    title: 'CNC-Machined Putter',
    subtitle: 'Personal project',
    year: 'Personal',
    filters: ['manufacturing', 'design'],
    cover: 'putter-head',
    card: 'A putter head designed in CAD and machined from aluminum stock, start to finish.',
    lead: 'I designed a putter head and machined it myself from aluminum stock: angled faces, tight tolerances, and a drilled shaft hole that all had to come together cleanly.',
    tags: ['SolidWorks', 'CNC milling', 'Aluminum', 'Personal'],
    meta: [
      ['Role', 'Designer & machinist'],
      ['Type', 'Personal project'],
      ['Material', 'Aluminum'],
      ['Tools', 'SolidWorks, CNC mill'],
    ],
    sections: [
      {
        kicker: 'The part',
        title: 'CAD to finished part, all by me',
        body: [
          'A putter head pushed my machining further than anything before it. The angled faces, the tolerances, and the shaft hole all have to line up, and on a putter, the finish is the first thing anyone notices.',
        ],
        bullets: [
          '**Modeled in SolidWorks**, with toolpaths and setups planned around the angled faces.',
          '**Machined on a CNC mill** from aluminum stock.',
          '**Surface finish** came out exactly how I wanted it.',
        ],
        media: [video('putter-machining-1', 'Roughing pass'), img('putter-head', 'Finished head'), video('putter-machining-2', 'CAD to machine')],
      },
    ],
  },
  {
    slug: 'robotic-arm',
    title: '4-Axis Robotic Arm',
    subtitle: 'Mirrored real-time control',
    year: '2025',
    filters: ['robotics', 'design'],
    cover: 'arm-hero',
    card: 'A 3D-printed arm that mirrors a smaller input arm in real time through potentiometers.',
    lead: 'A 4-axis arm designed in SolidWorks with fully custom 3D-printed parts, driven in real time by a smaller copy of itself: move the small arm, and the big one follows.',
    tags: ['SolidWorks', '3D printing', 'Servos', 'Potentiometers'],
    meta: [
      ['Role', 'Designer & builder'],
      ['Timeline', '2025'],
      ['Control', 'Potentiometers → servo driver'],
      ['Tools', 'SolidWorks, 3D printing, Arduino'],
    ],
    sections: [
      {
        kicker: 'How it works',
        title: 'Move the small arm, the big one follows',
        body: [
          'There’s no preprogrammed motion. Potentiometers in each joint of the small input arm feed position data to the servo driver, and the large arm’s servos track those readings in real time.',
        ],
        bullets: [
          '**Designed in SolidWorks** with every structural part custom and 3D printed.',
          '**Real-time mirrored control** through potentiometers and a servo driver.',
          '**My first big project** going into fall semester. It taught me a lot about servo systems, CAD, and fabrication.',
        ],
        media: [video('arm-mirror-1', 'Mirrored control'), img('arm-hero', 'The arm'), video('arm-mirror-2', 'Joint test'), img('arm-wiring', 'Wiring and control')],
      },
    ],
  },
  {
    slug: 'baja-sae',
    title: 'Baja SAE Components',
    subtitle: 'Machinist, UCF Baja SAE',
    year: '2025 to 2026',
    filters: ['manufacturing'],
    cover: 'baja-mill',
    card: 'Drivetrain and chassis parts for an off-road race vehicle, held to ±0.005".',
    lead: 'Machining drivetrain and chassis components for UCF’s off-road competition vehicle, held to ±0.005" and built to survive endurance, acceleration, and maneuverability events.',
    tags: ['ProtoTRAK CNC', 'Manual mill', 'Inspection', '±0.005"'],
    meta: [
      ['Role', 'Machinist'],
      ['Timeline', 'Aug 2025 to Aug 2026'],
      ['Tolerance', '±0.005"'],
      ['Machines', 'ProtoTRAK CNC lathe, manual mill'],
    ],
    stats: [
      { n: 10, suffix: '+', label: 'custom components made and documented' },
      { text: '±0.005"', label: 'working tolerance' },
    ],
    sections: [
      {
        kicker: 'The work',
        title: 'Parts that have to survive a race',
        body: [
          'I joined after someone at GE Vernova recommended I get more hands-on manufacturing experience. It was one of the best decisions I made freshman year.',
        ],
        bullets: [
          '**Machined drivetrain and chassis components** on a ProtoTRAK CNC lathe and a manual mill.',
          '**Prototyped, inspected, and documented 10+ parts** so each one passed quality checks before vehicle assembly.',
        ],
        media: [img('baja-mill', 'Mill running'), img('baja-mill-2')],
      },
    ],
  },
  {
    slug: 'rc-boat',
    title: 'RC Boat',
    subtitle: 'UCF Great Naval Orange Race',
    year: 'Competition',
    filters: ['design'],
    cover: 'boat-pool',
    card: 'Designed, printed, waterproofed, and raced a fully functional RC boat.',
    lead: 'A fully functional RC boat built from scratch for UCF’s Great Naval Orange Race: designed in SolidWorks, printed on a Bambu Lab, waterproofed, and raced.',
    tags: ['SolidWorks', '3D printing', 'Brushless motor', 'Waterproofing'],
    meta: [
      ['Role', 'Designer & builder'],
      ['Event', 'Great Naval Orange Race'],
      ['Drive', 'Brushless motor + ESC, servo steering'],
      ['Tools', 'SolidWorks, Bambu Lab'],
    ],
    sections: [
      {
        kicker: 'The build',
        title: 'From CAD to the water',
        bullets: [
          '**Designed the hull and internal layout** in SolidWorks.',
          '**Printed on a Bambu Lab printer**, then painted and waterproofed the hull.',
          '**Installed a brushless motor, ESC, steering servo, and receiver.**',
          '**Tested on the water**, then raced.',
        ],
        media: [
          img('boat-printing', 'Printing'),
          img('boat-hull-raw', 'Raw print'),
          img('boat-hull-painted', 'Painted and sealed'),
          img('boat-electronics', 'Electronics installed'),
          img('boat-transom', 'Motor mount'),
          video('boat-pool-run', 'On the water'),
          img('boat-pool', 'Pool test'),
        ],
      },
    ],
  },
  {
    slug: 'liquid-cooling',
    title: 'Liquid Cooling Loop',
    subtitle: 'In progress',
    year: '2026 to Present',
    filters: ['design', 'research'],
    cover: null,
    inProgress: true,
    card: 'A custom liquid cooling loop with three water block designs, tested head to head.',
    lead: 'Building a liquid cooling loop from scratch to understand how GPU liquid cooling actually works, and to apply heat transfer outside of research.',
    tags: ['In progress', 'ANSYS CFD', '3D printing', 'Thermal'],
    meta: [
      ['Status', 'In progress'],
      ['Timeline', '2026 to Present'],
      ['Tools', 'SolidWorks, ANSYS, 3D printing'],
    ],
    sections: [
      {
        kicker: 'The plan',
        title: 'Print it, simulate it, compare it',
        bullets: [
          '**Designing the loop in SolidWorks**, including a reservoir and three water block geometries, to compare cold plate designs head to head.',
          '**Sourced every component for a test rig** with a Peltier heat source and Arduino temperature logging.',
          '**Next:** 3D print the parts and compare ANSYS Fluent predictions against measured data.',
        ],
        body: ['Photos coming as the build progresses.'],
      },
    ],
  },
  {
    slug: 'solidworks-certification',
    title: 'SolidWorks, Self-Taught',
    subtitle: 'CSWA & CSWP',
    year: 'Summer 2025',
    filters: ['design'],
    cover: 'sw-funnel',
    card: 'Zero experience to CSWA and CSWP in one summer.',
    lead: 'Going into college I had zero SolidWorks experience. I taught myself over one summer (no class, no tutor) and earned both the CSWA and the CSWP.',
    tags: ['SolidWorks', 'CSWA', 'CSWP', 'Self-taught'],
    meta: [
      ['Timeline', 'Summer 2025'],
      ['CSWA', 'Certified'],
      ['CSWP', 'Certified'],
    ],
    sections: [
      {
        kicker: 'How',
        title: 'A part a day',
        body: [
          'I worked through part modeling, assemblies, and drawings by building practice parts every day, from basic exercises to more complex geometry. By the end of the summer I passed the **CSWA**, then pushed on to earn the **CSWP**.',
        ],
        media: [
          img('sw-funnel'),
          img('sw-bit'),
          img('sw-bit-drawing', 'Drawing practice'),
          img('sw-linkage'),
          img('sw-disc'),
          img('sw-bottle'),
          img('sw-ship', 'Modeled and printed'),
        ],
      },
    ],
  },
  {
    slug: 'plant-watering',
    title: 'Automatic Plant Waterer',
    subtitle: 'My first engineering project',
    year: 'First build',
    filters: ['design'],
    cover: 'plant-hero',
    card: 'Arduino, a moisture sensor, and a pump in a 3D-printed enclosure.',
    lead: 'My first engineering project, built with a friend: an Arduino-powered plant waterer in a custom 3D-printed enclosure.',
    tags: ['Arduino', 'Sensors', '3D printing'],
    meta: [
      ['Role', 'Co-builder'],
      ['Tools', 'Arduino, moisture sensor, pump, 3D printing'],
    ],
    sections: [
      {
        kicker: 'How it works',
        title: 'Simple, and it works',
        body: [
          'A moisture sensor detects when the soil dries out and triggers a pump to water the plant. A window cut into the side shows the reservoir level at a glance. It was my first real introduction to Arduino, electronics, and designing something from the ground up.',
        ],
        media: [img('plant-hero')],
      },
    ],
  },
];

// Work page gallery: order and tile size. L = large, T = tall, W = wide, S = small.
export const workGallery = [
  ['ge-vernova', 'L'], ['asme-robot', 'T'], ['heat-pipe-research', 'T'],
  ['fledge', 'W'], ['cnc-putter', 'S'], ['robotic-arm', 'S'],
  ['rc-boat', 'T'], ['solidworks-certification', 'T'], ['baja-sae', 'L'],
  ['liquid-cooling', 'S'], ['plant-watering', 'W'],
];

export const filters = [
  ['all', 'All'],
  ['industry', 'Industry'],
  ['software', 'Software'],
  ['research', 'Research'],
  ['robotics', 'Robotics'],
  ['manufacturing', 'Manufacturing'],
  ['design', 'Design & build'],
];

export const about = {
  title: 'About me',
  lead: 'I’m a mechanical engineering student at UCF. I care about being the best version of myself and learning from my mistakes.',
  body: [
    'I grew up building things. LEGO first, then cardboard, then anything I could take apart and put back together. That led to circuits and math, and eventually to engineering.',
    'I didn’t put in the work I could have in high school. Going into college I decided that wouldn’t happen again: good grades, experience early, and learning as fast as I can.',
    'I taught myself SolidWorks and earned my CSWA and CSWP before my first semester, then joined undergraduate research, machined parts for Baja SAE, and led a 60+ member ASME design team. That led to GE Vernova last summer, and this fall I’m with Lockheed Martin Missiles and Fire Control.',
    'Long term, I want to work on a close team that values collaboration and new ideas, on problems like thermal management for computing hardware. It’s part of why I’m building a liquid cooling loop on my own time.',
  ],
  hobbies: ['Hanging out with friends', 'Cooking', 'Personal projects', 'Gym', 'Running'],
  photos: [img('portrait'), img('sunset'), img('gev-lounge')],
  // "Outside of engineering" photo wall on the About page.
  life: [img('life-positano', 'Travel'), img('life-cooking', 'Cooking'), img('life-golf', 'Family'), img('life-water', 'Friends'), img('life-skate', 'Skateboarding'), img('life-desk', 'Personal projects'), img('life-suit', 'Career')],
};
