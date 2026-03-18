export interface ProjectImage {
  src: string;
  caption: string;
  type?: 'image' | 'video';
  thumbnail?: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface ProjectStep {
  step: number;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  date: string;
  role: string;
  tags: string[];
  image: string;
  description: string;
  fullDescription: string;
  images: ProjectImage[];
  approach: ProjectStep[];
  challenges: ProjectChallenge[];
  highlights: string[];
  outcome: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "robotic-arm-arduino",
    title: "Robotic Arm with Arduino Control",
    date: "Jul – Aug 2025",
    role: "Designer & Builder",
    tags: ["SolidWorks", "Arduino", "C++", "Servo Systems"],
    image: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/52efdeee952fc95be68d003f112a10b7.jpeg",
    description:
      "Designed and fabricated a 4-axis robotic arm fully modeled in SolidWorks with custom modifications. Integrated Arduino and a servo driver board to control multiple servos via potentiometer-based manual control.",
    fullDescription:
      "This project started as a personal challenge to bridge CAD design with embedded hardware control. Using SolidWorks, I modeled each joint and link of a 4-axis arm from scratch, iterating on geometry to maximize range of motion while keeping the structure lightweight and printable. The physical fabrication involved 3D-printed parts, custom brackets, and careful cable routing to prevent binding during motion. On the electronics side, an Arduino Uno was paired with a PCA9685 servo driver board to handle PWM signals for six servo motors simultaneously. I wrote C++ firmware to read analog potentiometer values and map them in real time to servo positions, allowing intuitive manual control. The project deepened my understanding of kinematics, servo torque selection, and the practical challenges of translating a CAD model into a functional physical system.",
    images: [
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/52efdeee952fc95be68d003f112a10b7.jpeg",
        caption: "Completed 4-axis robotic arm assembled and ready for testing",
      },
      {
        type: "video" as const,
        src: "https://drive.google.com/file/d/1Uy3fp7LvPHP5WG6VmWoMTGwX2ZsVS5iR/preview",
        caption: "Robotic arm in action — live demo",
      },
      {
        type: "video" as const,
        src: "https://drive.google.com/file/d/11I8MSVoR36bVohHq1aZROCDjTTdbexBS/preview",
        caption: "Robotic arm demo — additional footage",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/d03a344782e30cdba9b59ae67bca6969.jpeg",
        caption: "3D-printed components laid out prior to assembly",
      },
    ],
    approach: [
      {
        step: 1,
        title: "CAD Modeling in SolidWorks",
        description: "Modeled each joint, link, and mounting bracket individually in SolidWorks. Ran interference checks on the full assembly to validate clearances before committing to print.",
      },
      {
        step: 2,
        title: "3D Printing & Fabrication",
        description: "Printed all structural components in PLA. Iterated on bracket geometry twice to improve servo mounting rigidity and reduce wobble at end effector.",
      },
      {
        step: 3,
        title: "Electronics & Wiring",
        description: "Wired six servo motors through a PCA9685 I2C servo driver to the Arduino Uno. Used separate power rails for logic and servo power to prevent brownout under load.",
      },
      {
        step: 4,
        title: "Firmware Development",
        description: "Wrote C++ firmware to read six analog potentiometers and map their values to servo angles in real time. Added software limits to prevent joint over-extension.",
      },
    ],
    challenges: [
      {
        title: "Servo Torque Under Load",
        description: "Initial servo selection was undersized for the outer links, causing sagging under gravity. Resolved by upgrading to higher-torque MG996R servos at the shoulder and elbow joints.",
      },
      {
        title: "Cable Routing & Binding",
        description: "Wires looped around rotating joints would bind and pull. Redesigned the joint housings to route cables through hollow channels in the printed parts.",
      },
      {
        title: "Potentiometer Noise",
        description: "Raw ADC reads from the potentiometers produced jittery servo motion. Implemented a rolling average filter in firmware to smooth the input signal.",
      },
    ],
    highlights: [
      "4-axis arm fully modeled in SolidWorks with custom modifications",
      "Arduino + PCA9685 servo driver for coordinated multi-servo control",
      "Potentiometer-based manual control for real-time positioning",
      "Custom C++ firmware with analog smoothing and joint limits",
      "3D-printed components fabricated and assembled on-site",
    ],
    outcome:
      "Successfully demonstrated real-time manual control of all 4 axes with smooth, responsive movement and repeatable positioning accuracy. The arm achieved full designed range of motion with no binding or servo failures during extended operation.",
  },
  {
    id: 2,
    slug: "pulsating-heat-pipe-cfd",
    title: "Pulsating Heat Pipe — CFD Analysis",
    date: "Jun 2025 – Present",
    role: "Lead Researcher",
    tags: ["ANSYS CFD", "Python", "Heat Transfer", "Research"],
    image: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/abf61a25bea1ba4c1454032ab4f7ea24.jpeg",
    description:
      "Conducted independent CFD analysis of a single-loop aluminum pulsating heat pipe using ANSYS to evaluate fluid flow and thermal performance. Co-authored the research abstract.",
    fullDescription:
      "Pulsating heat pipes (PHPs) are passive two-phase heat transfer devices with complex oscillatory fluid behavior that makes them difficult to model analytically. This research focused on characterizing the thermal and fluid dynamics of a single-loop aluminum PHP through ANSYS Fluent CFD simulations. I defined boundary conditions based on experimentally observed operating temperatures, set up the VOF (Volume of Fluid) multiphase model to capture liquid-vapor interactions, and ran transient simulations to analyze oscillation frequency and heat flux distribution. In parallel, I built a SolidWorks exploded-view model to document the physical assembly for the research paper. Python was used to post-process ANSYS output data, generate oscillation plots, and calculate effective thermal conductivity. The work culminated in a co-authored abstract submitted for undergraduate research presentation.",
    images: [
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/abf61a25bea1ba4c1454032ab4f7ea24.jpeg",
        caption: "Single-loop aluminum pulsating heat pipe experimental setup",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/423306ebad1118a03bdc4177ca9269b6.jpeg",
        caption: "ANSYS Fluent CFD thermal contour results",
      },
      {
        type: "video" as const,
        src: "https://drive.google.com/file/d/1wuD-JrdDFhC8Ct5WFKrZFrOI-10zCr5k/preview",
        caption: "Python-generated oscillation and thermal conductivity plots",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/49ec8f84903b97459371cc457b73210a.jpeg",
        caption: "SolidWorks exploded-view model for research documentation",
      },
    ],
    approach: [],
    challenges: [
      {
        title: "Convergence Stability",
        description: "The two-phase VOF model was prone to divergence at coarse mesh densities. Resolved through adaptive mesh refinement near the liquid-vapor interface and smaller time steps during phase-change events.",
      },
      {
        title: "Experimental Boundary Condition Uncertainty",
        description: "Experimental temperature measurements had ±2°C uncertainty. Ran sensitivity studies across the boundary condition range to quantify its effect on simulation outcomes.",
      },
      {
        title: "Locating the PHP Center with IR Imaging",
        description: "To accurately map thermal behavior, we needed to identify the physical center of the PHP for the IR camera reference point. The solution was simple but effective — placing a metal washer at the center of the tube loop, which showed up as a distinct thermal marker in the IR footage and gave us a reliable reference for aligning temperature data.",
      },
    ],
    highlights: [],
    outcome:
      "Produced quantitative CFD data on oscillation frequency and effective thermal conductivity across multiple heat flux levels. Results contributed to an ongoing PHP research program at UCF and were presented in a co-authored undergraduate research abstract.",
  },
  {
    id: 3,
    slug: "autonomous-waste-robot",
    title: "Waste Collection Robot, Student Design Competition",
    date: "Sept 2025 – Present",
    role: "Team Lead",
    tags: ["CAD", "Prototyping", "Team Lead", "ASME"],
    image: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/df3d5e018151917202362188b9aceba7.png",
    description:
      "Leading a 25+ member multidisciplinary team for ASME's 2025-2026 Student Design Competition — designing and fabricating an autonomous waste collection robot.",
    fullDescription:
      "As team lead for ASME's 2025-2026 Student Design Competition, I am responsible for directing a 25+ member cross-disciplinary team of mechanical, electrical, and software engineers. The robot is designed to autonomously navigate varied terrain, identify waste items using onboard vision, and collect them into an onboard bin. My responsibilities span the full engineering lifecycle: defining system requirements, coordinating sub-team design reviews, managing the project timeline, and ensuring mechanical-electrical-software integration. From a mechanical standpoint, I personally led the design of the drivetrain and collection mechanism in SolidWorks and oversaw fabrication of prototypes in the UCF makerspace. Weekly design reviews keep the team aligned and allow rapid iteration on issues discovered during physical testing.",
    images: [
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/df3d5e018151917202362188b9aceba7.png",
        caption: "Autonomous waste collection robot — competition build",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/44e399cbdb76ed137b2664d347e30356.jpeg",
        caption: "Prototype v1 undergoing outdoor terrain testing",
      },
      {
        type: "video" as const,
        src: "https://drive.google.com/file/d/1Eeaqsi_AwceOg2mUesIsZ99redB8uog2/preview",
        caption: "Waste collection robot — video clip 1",
      },
      {
        type: "video" as const,
        src: "https://drive.google.com/file/d/1t71YlbYhTH4ykxPl--uI1zogUFwmvO2K/preview",
        caption: "Waste collection robot — video clip 2",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/f40253053bd88bd2d9f251308e004e99.jpeg",
        caption: "Team working on chassis assembly in the UCF makerspace",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/9f7b4ddc531b496c7c1d3b9ab933cc44.jpeg",
        caption: "SolidWorks chassis and drivetrain CAD model",
      },
    ],
    approach: [
      {
        step: 1,
        title: "System Requirements & Decomposition",
        description: "Defined top-level competition requirements and decomposed them into mechanical, electrical, and software sub-system requirements. Established interface definitions between sub-teams.",
      },
      {
        step: 2,
        title: "CAD Design & Fabrication",
        description: "Led SolidWorks design of the chassis, drivetrain, and collection mechanism. Managed rapid prototyping using 3D printing and sheet-metal fabrication in the UCF makerspace.",
      },
      {
        step: 3,
        title: "Integration & Testing",
        description: "Coordinated weekly integration sessions where mechanical, electrical, and software sub-teams merged their work onto the physical robot. Ran terrain tests to identify failure modes.",
      },
      {
        step: 4,
        title: "Iteration & Competition Prep",
        description: "Compiled test results into design review reports. Drove targeted design updates based on test data and aligned the team timeline to meet the competition submission deadline.",
      },
    ],
    challenges: [
      {
        title: "Engaging Quieter Team Members",
        description: "With a 25+ person team, some members were hesitant to speak up in group settings. Made it a point to check in one-on-one, create space for everyone to contribute, and pair quieter members with more vocal ones to build confidence and keep the whole team actively involved.",
      },
      {
        title: "Staying Organized While Hitting Deadlines",
        description: "Coordinating a large multidisciplinary team meant files, decisions, and action items could easily get scattered. We standardized on Google Docs for shared documentation and file management, and built out a project timeline that all sub-teams tracked against to keep everyone aligned and on schedule.",
      },
    ],
    highlights: [
      "Leading 25+ member team for ASME 2025-26 Student Design Competition",
      "CAD modeling, prototyping, and physical testing across terrain types",
      "Coordinating mechanical, electrical, and software sub-teams",
      "Comprehensive design validation and fabrication documentation",
      "Managing full project timeline and structured design review cadence",
    ],
    outcome:
      "Prototype v1 drivetrain completed and validated through terrain testing. Currently iterating toward competition-ready build with all three sub-systems (Drive Team, Sorting, Robot arm) in active integration.",
  },
  {
    id: 4,
    slug: "auto-irrigation-system",
    title: "Arduino-Based Auto-Irrigation System",
    date: "Jan – Feb 2025",
    role: "Designer & Builder",
    tags: ["Arduino", "Embedded C", "3D Printing", "SolidWorks", "Circuit Design"],
    image: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/3f3b8f6d514856c0401047124d8d419c.png",
    description:
      "Designed and built a low-power automated plant watering system using an Arduino Nano, soil moisture sensor, and relay-controlled DC pump — all housed in a custom 3D-printed enclosure.",
    fullDescription:
      "This personal project combined embedded hardware, power electronics, and mechanical design into a single portable unit. The system uses an Arduino Nano to continuously monitor soil moisture and trigger a relay-controlled DC pump when the moisture level drops below a set threshold, delivering just the right amount of water automatically. On the electronics side, I engineered a single-supply 5V power architecture with surge suppression and power stabilization to ensure reliable operation under motor load — preventing voltage dips from the pump from resetting or destabilizing the microcontroller. Energy-efficient control logic was implemented in firmware to minimize idle power draw. The enclosure was fully modeled in SolidWorks and 3D printed as a multi-component unit integrating a water reservoir, electronics housing, and plant pot into one clean, portable form factor.",
    images: [
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/3f3b8f6d514856c0401047124d8d419c.png",
        caption: "Auto-irrigation system — completed unit",
      },
    ],
    approach: [
      {
        step: 1,
        title: "System Architecture",
        description: "Defined the sensor-controller-actuator loop: soil moisture sensor feeding analog reads to the Arduino Nano, which triggers a relay module to switch the DC pump on and off.",
      },
      {
        step: 2,
        title: "Power Circuit Design",
        description: "Designed a single-supply 5V architecture with surge suppression and decoupling capacitors to stabilize voltage under the inductive load of the DC pump motor.",
      },
      {
        step: 3,
        title: "Firmware Development",
        description: "Wrote Arduino C firmware to read moisture levels, apply a hysteresis threshold to avoid rapid pump cycling, and implement low-power idle logic between sensor polls.",
      },
      {
        step: 4,
        title: "Enclosure Design & Fabrication",
        description: "Modeled a multi-component enclosure in SolidWorks integrating the water reservoir, electronics bay, and plant pot. Printed in PLA and assembled into a single portable unit.",
      },
    ],
    challenges: [],
    highlights: [],
    outcome:
      "Delivered a fully functional self-watering unit that autonomously maintains soil moisture within the target range. The system ran continuously in testing without power instability or sensor errors, validating the circuit design and firmware logic.",
  },
  {
    id: 5,
    slug: "mars-rover-project-storm",
    title: "Mars Rover Prototype — Project Storm",
    date: "Aug – Dec 2025",
    role: "Mechanical Designer",
    tags: ["CAD", "Fabrication", "Robotics", "Servo Systems"],
    image: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/35b1210630de3c298e5c6e9e49c14482.png",
    description:
      "Designed and tested mechanical systems for a Mars Rover prototype for planetary desert navigation and autonomous object retrieval, including custom test rigs and CAD-driven servo integration.",
    fullDescription:
      "Project Storm is a student-led initiative to design a Mars Rover prototype capable of navigating desert-like terrain and performing autonomous object retrieval. My focus was on the mechanical subsystems: drivetrain geometry, rocker-bogie suspension modeling, and the robotic arm for object retrieval. I used SolidWorks to iterate on suspension linkage designs, optimizing ground clearance and wheel articulation for uneven terrain. To validate motor and servo selection, I fabricated custom wooden test rigs that could simulate load conditions up to 125 lbs, providing real-world data for component specs. The arm design went through three major revisions based on test rig results, ultimately achieving the required reach and payload capacity within the weight budget. This project sharpened my ability to move quickly from CAD concept to physical prototype and back again.",
    images: [
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/35b1210630de3c298e5c6e9e49c14482.png",
        caption: "Mars Rover prototype — Project Storm full assembly",
      },
    ],
    approach: [],
    challenges: [],
    highlights: [],
    outcome:
      "Delivered a functional rover prototype achieving all target terrain performance metrics — including the specified ground clearance, obstacle traversal height, and arm payload capacity — validated through physical testing on desert-simulated terrain.",
  },
  {
    id: 6,
    slug: "solidworks-cswa-cswp",
    title: "SolidWorks Certification Models — CSWA & CSWP",
    date: "May – Aug 2025",
    role: "CAD Designer",
    tags: ["SolidWorks", "CAD", "CSWA", "CSWP", "Parametric Modeling"],
    image: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/659c6905fe5772a039ce9fdf78effb10.png",
    description:
      "Completed an extensive SolidWorks modeling program at UCF covering linkage systems, fastener geometry, and assembly design — earning both CSWA and CSWP certifications.",
    fullDescription:
      "Over UCF's summer term, I worked through a comprehensive SolidWorks modeling curriculum in preparation for and ultimately passing both the Certified SolidWorks Associate (CSWA) and Certified SolidWorks Professional (CSWP) exams. The work covered a wide range of mechanical geometry: linkage systems with multi-body motion constraints, standard fastener modeling (nuts, bolts, washers) built to spec, and progressively complex assemblies with mates and configurations. Each model reinforced core parametric design skills — feature trees, sketch constraints, in-context editing, and design intent. The CSWP preparation in particular demanded accurate mass property calculations and configuration-driven part changes under timed exam conditions, which pushed precision and workflow efficiency.",
    images: [
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/659c6905fe5772a039ce9fdf78effb10.png",
        caption: "SolidWorks part modeling — hollow tapered housing with internal bore",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/dea84be662e95c616d9b5dd67db504ce.png",
        caption: "SolidWorks assembly — multi-link scissor linkage mechanism with mated components",
      },
      {
        type: "video" as const,
        src: "https://drive.google.com/file/d/1vy4j2YSuOUFnMr4d93723IrYMtQ7Ezdl/preview",
        caption: "SolidWorks modeling walkthrough — CSWA & CSWP certification prep",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/b8c0b5a629c04a0b4237cfe2899f1e00.jpeg",
        caption: "SolidWorks part modeling — custom disc geometry with spoke pattern",
      },
      {
        src: "https://static.readdy.ai/image/010b5ecb385ca047fec2ff33c5ee3ffa/1fe0183f82af07f1b202c0f180487f45.png",
        caption: "SolidWorks part modeling — stepped rectangular extrusion with circular cut",
      },
    ],
    approach: [],
    challenges: [],
    highlights: [
      "Earned CSWA (Certified SolidWorks Associate) certification",
      "Earned CSWP (Certified SolidWorks Professional) certification",
      "Modeled linkage systems, fasteners, and complex assemblies from scratch",
      "Developed timed exam workflow for accurate mass property calculations",
      "Completed full curriculum over UCF summer term",
    ],
    outcome:
      "Successfully passed both the CSWA and CSWP exams, validating professional-level SolidWorks proficiency. The modeling library built during prep now serves as a reference for design work across other projects.",
  },
];