/* Site content */
const CONTENT = {
  name: 'Phelopater Ramsis',
  short: 'Phelo',
  headline: 'Engineer by background. Curious by nature. Building at the intersection of energy and intelligence.',
  subtitle: 'Electrical & Computer Engineering master’s student at the University of Florida, with a B.Eng. in Renewable Energy Engineering from Zewail City, exploring AI, energy systems, optimization, and the technologies shaping the future.',

  links: {
    email: 'phelopater.ramsis1@gmail.com',
    linkedin: 'https://www.linkedin.com/in/phelopater',
    github: 'https://github.com/Phelopaterramsis',
    scholar: '',
    orcid: '',
    researchgate: '',
    cv: 'assets/Phelopater_Ramsis_CV.pdf',
    photo: 'assets/phelo.jpg'
  },
  lookingFor: 'Open to Summer 2027 research internships and collaborations in AI for energy systems.',

  /* ---------- ABOUT ---------- */
  origin: [
    { title: 'Hi, I’m Phelo.', scene: 'wave', pin: 'egypt',
      text: 'Powering the AI era with clean, affordable energy. B.Eng. in Renewable Energy from Zewail City, now an M.S. in ECE at the University of Florida, working on AI-driven optimization for energy and data centers, and the economics behind it.' },
    { title: 'I go and ask.', scene: 'type',
      text: 'I chase the flow state: the hours that vanish when I’m deep in a problem. I go wherever I can learn and grow, and I turn opportunities—however limited—into achievement and impact.' },
    { title: 'Energy, then intelligence.', scene: 'think', glow: 'window',
      text: 'I see energy as one system: electrical, thermal and economic at once. As AI pushes demand up, I want that system smarter, cleaner and cheaper.' },
    { title: 'Off the clock.', scene: 'sitcoffee', glow: 'ball',
      text: 'I’ve lived and studied in Egypt, Nebraska and Florida. I like meeting people, trying new things and taking a risk when there’s something to learn on the other side. Also football. A lot of football.' }
  ],
  values: ['Make the most of every opportunity', 'Figure out how things work', 'Build things that help people', 'Stay curious, stay grounded'],

  /* ---------- JOURNEY ---------- */
  journey: [
    { id: 'egypt', level: 'Egypt', title: 'Where it started', when: '2017 – 2023', place: 'STEM 6th October · Zewail City', city: 'Cairo, Egypt', geo: [31.0, 30.0], gear: 'backpack',
      points: ['Earned a place at a STEM school that admits the top 150 students nationwide, on a full residential scholarship', 'One of 7 students in Egypt awarded a full USAID scholarship to study at Zewail City (2020)', 'Summer 2023: production enhancement internship at Halliburton'],
      unlocked: ['ICAN gold, Canada (2019)', 'ISEF national finalist (2019)'] },
    { id: 'nebraska', level: 'Nebraska', title: 'Crossing the ocean', when: 'Aug – Dec 2023', place: 'University of Nebraska–Lincoln, exchange semester', city: 'Lincoln, Nebraska', geo: [-96.7, 40.8], gear: 'backpack',
      points: ['Selected as 1 of 3 students for a fully funded exchange semester', 'Joined the Power & Energy Lab by asking. First from my cohort to research there', 'Took Electric Machines, Power Electronics, and Mechatronics & Robotics', 'Co-founded the Egyptian Students Association at UNL'],
      unlocked: ['SST magnetics research', 'Flyback converter built'] },
    { id: 'egypt2', art: 'zewail', level: 'Egypt, again', title: 'Coming back with more', when: '2024 – 2025', place: 'Zewail City · Elsewedy Electric · Tomorrow Solar', city: 'Cairo, Egypt', geo: [31.0, 30.0], gear: 'hardhat',
      points: ['Led my thesis team: an AI energy management system that cut a factory microgrid’s operating cost by 32%', 'Elsewedy Electric: substations, storage, utility-scale solar, and an AI drone for panel inspection', 'Graduated in the top 10% with all three university medals', 'Tomorrow Solar: residential PV design, from layout to yield'],
      unlocked: ['AUC Grand Challenge top 10 (2024)', 'B.Eng. (2025)'] },
    { id: 'florida', level: 'Florida', title: 'The next chapter', when: 'Aug 2026 – now', place: 'University of Florida, M.S. ECE (thesis track)', city: 'Gainesville, Florida', geo: [-82.3, 29.65], gear: 'backpack',
      points: ['Hagan International Scholarship and ECE Achievement Award', 'Joined the TEA Lab (Nov 2026): AI and anomaly detection for safe autonomous systems', 'Graduate work in machine learning, power electronics and AI for energy', 'ECE Ambassador: mentoring students on grad school, courses, CVs and research'],
      unlocked: ['First paper published (Jun 2026)'] },
    { id: 'next', level: '?', title: 'A new place to grow', when: 'Next', place: 'Wherever the next challenge is', city: 'Somewhere new', geo: null, gear: '', future: true,
      points: ['A summer 2027 energy research internship, somewhere new', 'Thesis research on AI-driven optimization of energy systems and data centers', 'Someday: a company that uses AI to solve energy problems in the Middle East and Africa'],
      unlocked: [] }
  ],

  /* ---------- EDUCATION ---------- */
  education: [
    { id: 'stem', short: 'STEM HS', name: 'STEM October 6th High School for Boys', degree: 'High school diploma (STEM)', when: '2017 – 2020', where: 'Egypt',
      notes: ['Admits the top 150 students nationwide; full residential scholarship', 'A hardware and software capstone prototype every semester', 'ISEF national finalist and 2nd category winner, Renewable Energy & IoT (2019)', 'ICAN gold medal, Canada (2019)'] },
    { id: 'zewail', short: 'Zewail City', name: 'Zewail City of Science and Technology (UST)', degree: 'B.Eng. Renewable Energy Engineering', when: '2020 – 2025', where: 'Egypt',
      notes: ['Full USAID merit scholarship (1 of 7 nationwide)', 'Top 10% of cohort', 'Three university medals: Entrepreneurship, Research Excellence, Community Service', 'Senior Design I & II: thesis team lead'] },
    { id: 'unl', short: 'UNL', name: 'University of Nebraska–Lincoln', degree: 'Exchange semester, Renewable Energy Engineering', when: 'Aug – Dec 2023', where: 'Lincoln, Nebraska, USA',
      notes: ['1 of 3 students selected for a fully funded exchange', 'Research intern, Power & Energy Lab', 'Courses: Electric Machines, Power Electronics, Mechatronics & Robotics, Numerical Analysis'] },
    { id: 'uf', short: 'UF', name: 'University of Florida', degree: 'M.S. Electrical & Computer Engineering (thesis track)', when: 'Aug 2026 – May 2028 (expected)', where: 'Gainesville, Florida, USA',
      notes: ['Hagan International Scholarship', 'ECE Achievement Award', 'Focus: AI and optimization for energy systems'] }
  ],
  coursework: [
    { group: 'Electrical & power', items: ['Circuits & Electronics', 'Advanced Circuits Design', 'Electric Machines', 'Power Electronics', 'Power Systems', 'Smart Grid', 'Electric Vehicles', 'Power Plant Technology'] },
    { group: 'Renewable & thermal energy', items: ['Renewable Energy Systems', 'Photovoltaic Systems', 'Thermal Solar Energy', 'Selected Topics in Renewable Energy Engineering', 'Thermodynamics for Engineers', 'Advanced Thermodynamics', 'Special Topics in Advanced Thermal Systems', 'Heat Transfer', 'Fluid Mechanics I & II', 'Aerodynamics', 'Rotor Aerodynamics', 'Optics & Photonics'] },
    { group: 'Control, math & computing', items: ['Control Systems', 'Advanced Control Systems', 'Calculus I & II', 'Linear Algebra & Vector Geometry', 'Ordinary Differential Equations', 'Partial Differential Equations', 'Probability & Statistics', 'Numerical Analysis', 'Introduction to Computer Science'] },
    { group: 'Mechanical & mechatronics', items: ['Introduction to Engineering Design', 'Engineering Drawing', 'Computer-Aided Design & Engineering', 'Engineering Dynamics', 'Mechanics of Materials', 'Materials Science & Engineering', 'Machine Design I & II', 'Mechanical Vibrations', 'Mechatronics & Robotics', 'Engineering Production'] },
    { group: 'Engineering management & economics', items: ['Systems Engineering', 'Engineering Project Management', 'Engineering Project Economics', 'Renewable Energy Law & Economics', 'Entrepreneurship & Small Business Management', 'Entrepreneurship for Engineers', 'Engineering Ethics & Safety', 'Leadership & Professionalism', 'Industrial Training', 'Senior Design Project I & II'] },
    { group: 'Sciences', items: ['Classical Mechanics (with lab)', 'Electromagnetism (with lab)', 'Chemistry I (with lab)', 'Biology I (with lab)'] },
    { group: 'Communication & humanities', items: ['Advanced Academic Speaking & Writing', 'Effective Speaking & Composition', 'Scientific Writing', 'Arabic Literature', 'Positive Psychology'] }
  ],

  /* ---------- PROJECTS ---------- */
  projects: [
    { id: 'ems', art: 'microgrid', title: 'AI-driven energy management for a smart microgrid', status: 'Undergraduate thesis', when: '2024 – 2025',
      overview: 'An AI-based energy management system for a hybrid electro-thermal microgrid serving a paper factory.',
      problem: 'Paper factories need electricity and heat at the same time. Running solar, wind, CHP, steam and storage together cheaply and cleanly is a coordination problem.',
      contribution: 'Team lead. Modeled the microgrid in MATLAB/Simulink and developed the AI-based EMS in Python. Supervised by Dr. Amgad A. El-Deib.',
      method: ['Modeled a 3 MW PVT + 4 MW wind system with CHP, a steam generator and liquid-air energy storage', 'Built an AI-based EMS to dispatch electrical and thermal resources', 'Ran a techno-economic study comparing configurations for minimum cost'],
      tools: ['MATLAB/Simulink', 'Python', 'Optimization', 'Techno-economic analysis'],
      results: [{ v: '32%', l: 'lower operating cost' }, { v: '20,000+ t', l: 'CO₂ avoided per year' }, { v: '7.7 yr', l: 'payback period' }],
      note: '', links: [], images: [] },
    { id: 'battery', art: 'battery', title: 'Battery state estimation with machine learning', status: 'Published · Jun 2026', when: '',
      overview: 'Estimating the State of Charge, State of Health and Remaining Useful Life of recyclable lithium-ion cells.',
      problem: 'Second-life and recyclable cells vary a lot. Reusing them safely needs fast, reliable estimates of how much life they have left.',
      contribution: 'Designed a custom battery-tester system, trained the models, developed a hybrid SoH metric, led validation and co-wrote the manuscript (second author with Dr. Basem M. Badr).',
      method: ['Built a battery tester and collected charge/discharge data', 'Trained Random Forest, Gradient Boosting and SVR regressors for SoC, SoH and RUL', 'Combined capacity fade and resistance growth into a hybrid SoH metric', 'Validated across healthy and degraded cells'],
      tools: ['Python', 'scikit-learn', 'Random Forest', 'Gradient Boosting', 'SVR', 'Battery testing'],
      results: [{ v: '3', l: 'states estimated: SoC, SoH, RUL' }, { v: '3', l: 'ML regressors compared' }, { v: '40+ GB', l: 'pack data in the follow-up study' }],
      note: 'Follow-up in preparation: AI models for battery packs in electric motorcycles, with all-good, mixed and all-bad cell configurations.',
      links: [{ label: 'Read the paper (DOI)', url: 'https://doi.org/10.64820/AEPJMLDL.31.16.28.62026' }, { label: 'Code on GitHub', url: 'https://github.com/Phelopaterramsis/Data-Driven-Optimization-of-Recyclable-Battery-Cells-Using-Machine-Learning' }], images: [] },
    { id: 'sst', art: 'transformer', title: 'High-frequency magnetics for solid-state transformers', status: 'Research internship', when: 'Aug – Dec 2023',
      overview: 'Research in the Power & Energy Lab at the University of Nebraska–Lincoln on the magnetic core at the heart of a solid-state transformer.',
      problem: 'Solid-state transformers shrink grid hardware by switching at high frequency, but high-frequency magnetics bring losses and heat that have to be designed around.',
      contribution: 'Joined Prof. Jun Wang’s lab on my own initiative, the first student from the Egyptian exchange cohort to do research there. Presented weekly research updates and literature reviews.',
      method: ['Mathematical modeling of high-frequency magnetics', 'Finite element analysis (FEA)', 'Design optimization', 'Built a demo solid-state device case'],
      tools: ['FEA', 'Modeling & simulation', 'Power electronics'],
      results: [{ v: '1st', l: 'from my cohort in the lab' }, { v: 'Weekly', l: 'research updates presented' }, { v: '1', l: 'demo device case built' }],
      note: '', links: [], images: [] },
    { id: 'solar', art: 'solar', title: 'Renewable energy systems', status: 'Projects & internship work', when: '2020 – 2025',
      overview: 'Solar PV design, wind and solar simulation, and the hardware that keeps panels pointed at the sun.',
      problem: 'Every renewable system starts with the same questions: how much energy, at what cost, and what has to be built to get it.',
      contribution: 'Designed and simulated systems end-to-end, from load analysis to yield.',
      method: ['Stand-alone PV system for the Zewail City cafeteria: load analysis, system and battery sizing, tilt optimization, yield analysis (PVsyst)', 'Residential PV design at Tomorrow Solar: site layout, sizing, energy-yield simulation', 'Funnel-shaped silicon nanowire solar cells simulated in Lumerical FDTD', 'Horizontal-axis wind turbine blade with CFD, FSI and modal analysis', 'Linear actuator for solar tracking: power screw, gear train, shafts, bearings'],
      tools: ['PVsyst', 'AutoCAD', 'SketchUp', 'Lumerical FDTD', 'ANSYS', 'Autodesk Inventor'],
      results: [{ v: '+17.89%', l: 'nanowire solar-cell efficiency' }, { v: '~288 W', l: 'blade output at 9 m/s (Cp ≈ 0.24)' }, { v: 'End-to-end', l: 'PV design, layout to yield' }],
      note: '', links: [{ label: 'Off-grid PV (GitHub)', url: 'https://github.com/Phelopaterramsis/Stand-Alone-PV-System-Design-for-Zewail-City-Cafeteria-' }, { label: 'Nanowire solar cells', url: 'https://github.com/Phelopaterramsis/Funnel-Shaped-Silicon-Nanowire-for-Photovoltaic-Applications' }, { label: 'Wind turbine blade', url: 'https://github.com/Phelopaterramsis/Horizontal-Axis-Wind-Turbine-Blade-CFD-FSI-Modal-Analysis' }, { label: 'Solar-tracking actuator', url: 'https://github.com/Phelopaterramsis/Linear-Actuator-Design-for-Solar-Tracking-' }], images: [] }
  ],
  logbook: [
    { cat: 'Power & electrical', name: 'Dual-output flyback converter', what: 'Power electronics course project at UNL: designed, built and tested it closed-loop, with a custom dual-output transformer. 81.5% and 88.4% efficiency at 18 V and 24 V inputs.', tools: 'Power electronics hardware', url: 'https://github.com/Phelopaterramsis/Dual-Output-Flyback-Converter-Power-Electronics-Project' },
    { cat: 'Power & electrical', name: '1 HP, 1500 RPM three-phase synchronous machine', what: 'Electromagnetic design, simulation, cost analysis and performance optimization of a 6-pole machine.', tools: 'ANSYS Maxwell', url: 'https://github.com/Phelopaterramsis/Design-Simulation-of-a-1-HP-1500-RPM-3-Phase-Synchronous-Machine-' },
    { cat: 'Power & electrical', name: 'Multi-machine transient stability', what: 'Y-bus formulation, fault response and critical clearing times under N-1 contingency.', tools: 'MATLAB/Simulink', url: 'https://github.com/Phelopaterramsis/Smart-Grids-Transient-Stability-Fault-Analysis-Project' },
    { cat: 'Power & electrical', name: 'Newton–Raphson power flow, 5-bus system', what: 'Solved voltages, angles and line flows, then validated every result independently.', tools: 'MATLAB, PowerWorld', url: 'https://github.com/Phelopaterramsis/Power-Flow-Analysis-PowerWorld-Validation-Power-Systems-Project' },
    { cat: 'Power & electrical', name: 'Solar-panel inspection drone', what: 'A UAV that combines RGB and thermal imaging with deep learning to find panel defects.', tools: 'Deep learning, UAV', url: '' },
    { cat: 'Power & electrical', name: 'Solar + EV energy optimization app', what: 'Co-developing: linear programming for solar and EV charging, with an ML forecasting layer. In development.', tools: 'Linear programming, ML', url: '' },
    { cat: 'Mechanical & control', name: 'Active car suspension control', what: 'Modeled a 2-DOF active suspension and designed controllers with pole placement and LQR.', tools: 'MATLAB, Simulink, state-space', url: 'https://github.com/Phelopaterramsis/Active-Suspension-Control-System-State-Space-Pole-Placement-LQR' },
    { cat: 'Mechanical & control', name: 'Linear inverted pendulum', what: 'Modeled and stabilized an inverted pendulum with a PID controller designed by root locus.', tools: 'MATLAB, Simulink', url: 'https://github.com/Phelopaterramsis/Linear-Inverted-Pendulum-Control-MATLAB-Simulink' },
    { cat: 'Mechanical & control', name: 'Free and forced vibration experiments', what: 'Cantilever-beam tests with Arduino data acquisition, transmissibility analysis and comparison with theory.', tools: 'Arduino, experiments', url: 'https://github.com/Phelopaterramsis/Free-Forced-Vibration-Experiments-REE-308' },
    { cat: 'Mechanical & control', name: 'Joukowski airfoil aerodynamics', what: 'Analyzed an airfoil with 9% thickness and 5% camber, analytically and in CFD.', tools: 'MATLAB, ANSYS Fluent', url: 'https://github.com/Phelopaterramsis/Joukowski-Airfoil-Aerodynamics-MATLAB-ANSYS-Fluent' },
    { cat: 'Math & data', name: 'Vibrating membranes', what: 'Analytical and numerical solutions for circular and rectangular membranes: separation of variables, Bessel functions, Fourier series.', tools: 'PDEs, FEATool', url: 'https://github.com/Phelopaterramsis/Analytical-Numerical-Solutions-for-Vibrating-Membranes' },
    { cat: 'Math & data', name: 'Traffic jam solver', what: 'Modeled urban traffic with Gaussian elimination and built a GUI that suggests the least-congested road.', tools: 'Linear algebra, Python', url: 'https://github.com/Phelopaterramsis/Traffic-Jam-Solver-Using-Linear-Algebra-On-Time-' },
    { cat: 'Math & data', name: 'Income inequality in Egypt', what: 'Statistical study of how gender, education and household size relate to income, using CAPMAS data.', tools: 'Statistics', url: 'https://github.com/Phelopaterramsis/A-Study-of-Income-Inequality-in-Egypt-MATH-301-Probability-Statistics-' }
  ],

  /* ---------- EXPERIENCE ---------- */
  experience: [
    { id: 'tea', bank: 'work', short: 'UF TEA Lab', org: 'TEA Lab, University of Florida', role: 'Graduate Researcher', when: 'Nov 2026 – now',
      did: ['AI-based anomaly detection for safer learning-enabled autonomous systems, tested on small-scale autonomous racing cars'], skills: ['Machine learning', 'Anomaly detection', 'Autonomous systems'] },
    { id: 'tomorrow', bank: 'work', org: 'Tomorrow Solar', role: 'PV Design Engineer Intern', when: 'Jul – Dec 2025',
      did: ['Designed and modeled residential PV systems end-to-end: site layout, system sizing and energy-yield simulation'], skills: ['AutoCAD', 'SketchUp', 'PVsyst'] },
    { id: 'elsewedy', bank: 'work', org: 'Elsewedy Electric', role: 'Renewable Energy Engineer Intern', when: 'Jul – Aug 2024',
      did: ['Exposure to cable manufacturing, insulation and derating, power quality, substations, BESS and solar-project lifecycles (KPIs, storage, O&M)', 'Supported tendering, feasibility studies and coordination between technical and commercial teams on utility-scale solar', 'Developed an AI-powered UAV system for solar-panel defect detection using thermal and RGB imaging'], skills: ['Substations', 'BESS', 'Feasibility studies', 'Tendering', 'Computer vision'] },
    { id: 'unl', bank: 'work', short: 'UNL Power & Energy Lab', org: 'UNL Power & Energy Lab', role: 'Research Intern', when: 'Aug – Dec 2023',
      did: ['Researched high-frequency magnetics for solid-state transformers with Prof. Jun Wang: modeling, FEA and design optimization', 'Built a demo solid-state device case', 'Presented weekly research updates and literature reviews'], skills: ['FEA', 'Modeling', 'Research'] },
    { id: 'halliburton', bank: 'work', org: 'Halliburton', role: 'Production Enhancement Intern', when: 'Jul – Aug 2023',
      did: ['Learned engineering safety protocols', 'Supported the electrical, mechanical and chemical processes used to enhance field productivity'], skills: ['Field safety', 'Industrial processes'] },
    { id: 'ambassador', bank: 'people', short: 'UF ECE Ambassador', org: 'UF ECE', role: 'ECE Ambassador', when: 'Oct 2026 – now',
      did: ['Help mentees get through student life and give them tips on graduate school, courses, CVs, research and anything related'], skills: ['Mentoring', 'Advising'] },
    { id: 'usaid', bank: 'people', short: 'USAID mentor', org: 'USAID Scholars', role: 'Mentor', when: '2024',
      did: ['One-to-one mentoring and support for 300+ incoming scholars preparing to study abroad'], skills: ['Mentoring'] },
    { id: 'sdg', bank: 'people', short: 'SDG trainer', org: 'Be an Ambassador program', role: 'Official SDG Trainer (Ministry-certified)', when: '2022 – now',
      did: ['Appointed Official SDG Trainer after top performance in the TOT “Be an Ambassador” and Youth Policy Shapers programs', 'Deliver training sessions to groups'], skills: ['Training', 'Public speaking'] },
    { id: 'aspire', bank: 'people', short: 'ASPIRE leadership', org: 'ASPIRE Consulting International', role: '4-year Leadership Development Program', when: '2020 – 2024',
      did: ['Completed all four milestones: Emerging, Integrated, Experienced and World-Ready Leader', 'Trained in emotional intelligence, communication, dealing with difficult people and conflict resolution', 'Applied DISC, RIASEC and other assessments for personal and team development'], skills: ['Leadership', 'Emotional intelligence'] },
    { id: 'esa', bank: 'people', short: 'Egyptian Students Assoc.', org: 'Egyptian Students Association, UNL', role: 'Co-founder & Vice President', when: 'Aug – Dec 2023',
      did: ['Promoted Egyptian culture abroad during my exchange semester'], skills: ['Community building'] },
    { id: 'commencement', bank: 'people', short: 'Commencement organizer', org: 'Zewail City & USAID', role: 'Commencement Head Organizer', when: '2024',
      did: ['Led event teams for the Zewail City and USAID graduation ceremonies'], skills: ['Event leadership'] },
    { id: 'ever', bank: 'people', short: 'EVER race car', org: 'Electric Vehicle Rally “EVER”', role: 'Electrical/Power team member', when: '2022 – 2023',
      did: ['Worked on the electrical and power side of a race-car build'], skills: ['EV systems', 'Teamwork'] },
    { id: 'more', bank: 'people', short: 'Class rep & delegate', org: 'Zewail City', role: 'Class Representative & Forum Delegate', when: '2021 – 2022',
      did: ['Class representative for the REE ’20 cohort: academic concerns, meetings, exam scheduling', 'Represented Zewail City at the Global Forum for Higher Education & Scientific Research (24,000+ attendees, 77 countries)', 'Presented Zewail City programs to international stakeholders and started a collaboration with the EducationUSA adviser for future sessions at the university'], skills: ['Representation', 'Partnerships'] },
    { id: 'volunteer', bank: 'people', short: 'Event volunteer', org: 'Techni Summit, Science Festival, IEEE, TEDx, Enactus', role: 'Volunteer & organizer', when: '2021 – 2024',
      did: ['Volunteered and organized at Techni Summit Cairo, the Zewail City Science Festival (twice), IEEE Zewail City, TEDx and Enactus', 'At Techni Summit Cairo, the organizer recognized me after I solved several critical problems as a young volunteer'], skills: ['Event operations', 'Problem solving'] }
  ],

  /* ---------- LEADERSHIP ---------- */
  leadership: {
    aspire: { name: 'ASPIRE Consulting International', program: '4-year Leadership Development Program', when: '2020 – 2024',
      milestones: ['Emerging Leader', 'Integrated Leader', 'Experienced Leader', 'World-Ready Leader'],
      skills: ['Emotional intelligence', 'Communication', 'Dealing with difficult people', 'Conflict resolution', 'DISC & RIASEC assessments'] },
    trainer: { title: 'Official SDG Trainer', by: 'Ministry-certified', when: '2022 – now', how: 'Appointed after top performance in the TOT “Be an Ambassador” and Youth Policy Shapers programs.' },
    reach: [{ v: '300+', l: 'USAID scholars mentored before studying abroad' }, { v: '24,000+', l: 'attendees at the Global Forum where I represented Zewail City' }, { v: '2', l: 'graduation ceremonies led as head organizer' }, { v: '4 of 4', l: 'ASPIRE leadership milestones completed' }],
    slides: ['The 17 Sustainable Development Goals', 'Goal 7: clean energy for everyone', 'Goal 13: climate action', 'Questions?']
  },

  /* ---------- SKILLS ---------- */
  cvSkills: [
    { cat: 'Power & energy systems', text: 'Power electronics, power-flow & transient stability analysis, fault studies & N-1 contingency, microgrids & energy management, battery energy storage, PV/solar design, grid integration, substations' },
    { cat: 'Modeling & simulation', text: 'MATLAB/Simulink, PLECS, PowerWorld Simulator, ETAP, ANSYS (CFD, FSI, modal, FEA), Lumerical (FDTD), PVsyst, PVcase, AutoCAD, SolidWorks, Autodesk Inventor, SketchUp' },
    { cat: 'Programming & ML', text: 'Python (NumPy, pandas, scikit-learn, TensorFlow/PyTorch), C++, Git/GitHub, ML regression (Random Forest, Gradient Boosting, SVR), large-dataset processing, data visualization, Excel, Power BI/Tableau' }
  ],
  skills: [
    { cat: 'Power & energy systems', key: 'energy', items: [
      { s: 'Pe', n: 'Power electronics', used: ['Dual-output flyback converter', 'Solid-state transformer magnetics at UNL'] },
      { s: 'Pf', n: 'Power flow & transient stability', used: ['Newton–Raphson 5-bus power flow', 'Multi-machine transient stability study'] },
      { s: 'N1', n: 'Fault studies & N-1 contingency', used: ['Critical clearing times under N-1 contingency'] },
      { s: 'Mg', n: 'Microgrids & energy management', used: ['AI-based EMS for a paper-factory microgrid'] },
      { s: 'Bs', n: 'Battery energy storage', used: ['Battery state-estimation research', 'BESS exposure at Elsewedy Electric'] },
      { s: 'Pv', n: 'PV / solar design', used: ['Residential PV at Tomorrow Solar', 'Off-grid PV for the Zewail City cafeteria'] },
      { s: 'Gi', n: 'Grid integration', used: ['Utility-scale solar work at Elsewedy Electric'] },
      { s: 'Ss', n: 'Substations', used: ['Elsewedy Electric internship'] },
      { s: 'Em', n: 'Electric machines', used: ['1 HP synchronous machine design in ANSYS Maxwell', 'Electric Machines course at UNL'] }
    ] },
    { cat: 'Modeling & simulation', key: 'sw', items: [
      { s: 'Sl', n: 'MATLAB / Simulink', used: ['Paper-factory microgrid model', 'Transient stability study', 'Active suspension and inverted pendulum control'] },
      { s: 'Pl', n: 'PLECS', used: [] },
      { s: 'Pw', n: 'PowerWorld Simulator', used: ['Validated the 5-bus power flow'] },
      { s: 'Et', n: 'ETAP', used: [] },
      { s: 'An', n: 'ANSYS (CFD, FSI, modal, FEA)', used: ['Wind turbine blade analysis'] },
      { s: 'Mx', n: 'ANSYS Maxwell', used: ['Synchronous machine electromagnetic design'] },
      { s: 'Fl', n: 'ANSYS Fluent', used: ['Joukowski airfoil CFD'] },
      { s: 'Lu', n: 'Lumerical FDTD', used: ['Silicon nanowire solar cells'] },
      { s: 'Ps', n: 'PVsyst', used: ['Tomorrow Solar yield simulations', 'Zewail City cafeteria PV system'] },
      { s: 'Pc', n: 'PVcase', used: [] },
      { s: 'Ac', n: 'AutoCAD', used: ['PV site layouts at Tomorrow Solar'] },
      { s: 'Sw', n: 'SolidWorks', used: ['Solar-tracking actuator: design and stress analysis'] },
      { s: 'In', n: 'Autodesk Inventor', used: ['Wind turbine blade design'] },
      { s: 'Su', n: 'SketchUp', used: ['PV site modeling at Tomorrow Solar'] }
    ] },
    { cat: 'Programming & ML', key: 'ai', items: [
      { s: 'Py', n: 'Python (NumPy, pandas)', used: ['Battery ML models', 'AI-based EMS', 'Traffic jam solver GUI'] },
      { s: 'Ml', n: 'ML regression (scikit-learn)', used: ['Random Forest, Gradient Boosting and SVR for SoC/SoH/RUL'] },
      { s: 'Dl', n: 'TensorFlow / PyTorch', used: ['Solar-panel inspection drone: defect detection'] },
      { s: 'C+', n: 'C++', used: [] },
      { s: 'Gt', n: 'Git & GitHub', used: ['16 project repositories at github.com/Phelopaterramsis'] },
      { s: 'Bd', n: 'Large-dataset processing', used: ['40+ GB of battery-pack test data'] },
      { s: 'Dv', n: 'Data visualization', used: ['Battery test data', 'Income inequality study with CAPMAS data'] },
      { s: 'Xl', n: 'Excel', used: [] },
      { s: 'Bi', n: 'Power BI / Tableau', used: [] },
      { s: 'Op', n: 'Optimization', used: ['Linear programming in the Solar + EV app', 'Minimum-cost microgrid configuration'] },
      { s: 'Ar', n: 'Arduino', used: ['Data acquisition for vibration experiments'] }
    ] },
    { cat: 'Control & mechanical design', key: 'ctl', items: [
      { s: 'Ct', n: 'Control systems (PID, state-space, LQR)', used: ['Active suspension: pole placement and LQR', 'Inverted pendulum: PID by root locus'] },
      { s: 'Md', n: 'Mechanical design', used: ['Solar-tracking actuator: power screw, gears, shafts, bearings', 'Wind turbine blade design'] }
    ] },
    { cat: 'Media & communication', key: 'media', items: [
      { s: 'Ph', n: 'Photoshop', used: ['Media team member and photographer for clubs in high school'] },
      { s: 'Pg', n: 'Photography', used: ['Photographer for clubs in high school', 'Still one of the ways I switch off'] },
      { s: 'Pr', n: 'Presenting & training', used: ['SDG training sessions', 'Weekly research updates at UNL'] },
      { s: 'Td', n: 'Technical writing', used: ['Co-wrote a published journal paper'] },
      { s: 'Of', n: 'Microsoft Office', used: [] }
    ] }
  ],

  /* ---------- PUBLICATIONS ---------- */
  publications: [
    { status: 'Published', title: 'Data-Driven Optimization of Recyclable Battery Cells for Electrified Systems Using Machine Learning Regression Models',
      authors: 'Second author, with Dr. Basem M. Badr', venue: 'Journal of Machine Learning and Deep Learning (JMLDL), Vol. 3, Issue 1, pp. 16–28', date: 'June 2026',
      doi: '10.64820/AEPJMLDL.31.16.28.62026',
      pdf: '',
      abstract: '',
      summary: 'Uses a custom battery tester and machine-learning regressors (Random Forest, Gradient Boosting, SVR) to estimate the State of Charge, State of Health and Remaining Useful Life of recyclable lithium-ion cells.',
      mine: ['Designed the custom battery-tester system', 'Trained the ML regressors', 'Developed a hybrid SoH metric combining capacity fade and resistance growth', 'Led model validation across healthy and degraded cells, and co-wrote the manuscript'] },
    { status: 'In preparation', title: 'AI models for battery packs in electric-motorcycle applications',
      authors: '', venue: '', date: '', doi: '', pdf: '', abstract: '',
      summary: 'Pack-level health estimation for electric motorcycles.',
      mine: ['Designing battery-pack configurations: all-good, mixed and all-bad cells', 'Processing 40+ GB of test data to train AI models'] },
    { status: 'In progress', title: 'AI anomaly detection for safe autonomous systems (TEA Lab, UF)',
      authors: '', venue: '', date: '', doi: '', pdf: '', abstract: '',
      summary: 'A new paper with the TEA Lab: AI-based anomaly detection for safer learning-enabled autonomous systems, tested on small-scale autonomous racing cars.',
      mine: ['Started in November 2026 as part of my graduate research in the TEA Lab'] }
  ],

  /* ---------- SCHOLARSHIPS ---------- */
  scholarships: [
    { t: 'STEM high school: full residential scholarship', d: 'STEM October 6th High School, top 150 students nationwide (2017 – 2020)' },
    { t: 'USAID Full Merit Scholarship', d: 'B.Eng. at Zewail City, 1 of 7 nationwide (2020 – 2025)' },
    { t: 'USAID-funded semester abroad', d: 'Exchange semester at the University of Nebraska–Lincoln, 1 of 3 selected (2023)' },
    { t: 'Hagan International Scholarship', d: 'M.S. at the University of Florida (2026)' },
    { t: 'ECE Achievement Award', d: 'University of Florida, Electrical & Computer Engineering (2026)' }
  ],

  /* ---------- ACHIEVEMENTS ---------- */
  achievements: [
    { col: '2017', kind: 'scholar', t: 'STEM Full Scholarship', d: 'Full residential scholarship at STEM October 6th High School, which admits the top 150 students nationwide.' },
    { col: '2019', kind: 'medal', t: 'ICAN Gold Medal', d: 'International Invention Innovation Competition, Canada. Gold for a nanomaterial water-filtration and smart aeroponics system.' },
    { col: '2019', kind: 'trophy', t: 'ISEF National Finalist', d: 'International Science and Engineering Fair: national finalist and 2nd category winner, Renewable Energy & IoT.' },
    { col: '2020', kind: 'trophy', t: 'Banking on Brains, Top 2', d: 'ADCB’s Banking on Brains: one of the top 2 teams, with AI-based systems.' },
    { col: '2020', kind: 'scholar', t: 'USAID Full Merit Scholarship', d: 'Full scholarship for my B.Eng. at Zewail City, one of 7 awarded nationwide.' },
    { col: '2021', kind: 'trophy', t: 'Space Summit, 4th & People’s Choice', d: '4th place and the People’s Choice Award for “New Way to Live on Mars”.' },
    { col: '2023', kind: 'trophy', t: 'NASA Space Apps Cairo', d: 'Local winner and Best Creative Award, Superpower category, for “Endless Cycle of Fuel with Reduced CO₂”.' },
    { col: '2023', kind: 'trophy', t: 'Shell Imagine the Future, 2nd', d: '2nd place at the Egypt national finals (Feb – May 2023), with a 20,000 EGP prize, for a scenario on the future of energy and mobility in Egypt.' },
    { col: '2023', kind: 'scholar', t: 'USAID Semester Abroad, 1 of 3', d: 'USAID-funded exchange semester at the University of Nebraska–Lincoln; one of only 3 students selected.' },
    { col: '2024', kind: 'trophy', t: 'AUC Grand Challenge, Top 10', d: 'Grand Challenge for Entrepreneurship at the American University in Cairo: top 10 teams and a 50,000 EGP prize (Mar 2024). Part of the Social and Green Entrepreneurship Program, where I led my team’s business model and market analysis.' },
    { col: 'Zewail', kind: 'medal', t: 'Research Excellence Medal', d: 'Zewail City university medal.' },
    { col: 'Zewail', kind: 'medal', t: 'Entrepreneurship Medal', d: 'Zewail City university medal.' },
    { col: 'Zewail', kind: 'medal', t: 'Community Service Medal', d: 'Zewail City university medal.' },
    { col: 'Zewail', kind: 'medal', t: 'Highest Non-Academic Achievement', d: 'Award at Zewail City Recognition Day.' },
    { col: 'Zewail', kind: 'scholar', t: 'Top 10% of Cohort', d: 'B.Eng. Renewable Energy Engineering, 2020 – 2025.' },
    { col: '2026', kind: 'scholar', t: 'Hagan International Scholarship', d: 'Supporting my M.S. at the University of Florida.' },
    { col: '2026', kind: 'scholar', t: 'ECE Achievement Award', d: 'University of Florida, Herbert Wertheim College of Engineering.' }
  ],
  achievementCols: [['2017', '2017'], ['2019', '2019'], ['2020', '2020'], ['2021', '2021'], ['2023', '2023'], ['2024', '2024'], ['Zewail', 'Zewail City'], ['2026', '2026']],

  /* ---------- CV ---------- */
  summary: 'M.S. student in Electrical & Computer Engineering (thesis track) at the University of Florida, with a B.Eng. in Renewable Energy Engineering from Zewail City. Published research on machine learning for battery health, a thesis on AI-based energy management for a hybrid microgrid, and industry internships in solar design, utility-scale renewables and field engineering.',
  interestsResearch: ['AI and machine learning for energy and physical systems', 'Power electronics, power systems and smart grids', 'Control and optimization of energy systems', 'Battery health and energy storage', 'Energy-efficient computing and data-center power and thermal management'],

  /* ---------- INTERESTS ---------- */
  interests: [
    { id: 'football', label: 'Football', msg: 'Barça and Messi. Enough said. Select the ball to take a shot.' },
    { id: 'gym', label: 'Gym & fitness', msg: 'Leg day is just a load test with feelings.' },
    { id: 'swim', label: 'Swimming', msg: 'I won two medals and a cup in swimming.' },
    { id: 'music', label: 'Music & photography', msg: 'Music and photography are how I switch off.' },
    { id: 'globe', label: 'Places & cultures', msg: 'Lived and studied in Egypt, Nebraska and Florida. Always up for the next place.' },
    { id: 'family', label: 'Family', msg: 'Everything I’ve done is because of them.' },
    { id: 'ai', label: 'Energy & AI', msg: 'Where my work lives: AI that makes energy cleaner, cheaper and smarter.' },
    { id: 'rocket', label: 'Startups', msg: 'Long-term plan: a company that uses AI to solve energy problems in the Middle East and Africa.' }
  ],

  /* ---------- FACTS ---------- */
  facts: [
    'I co-founded the Egyptian Students Association at UNL during a single exchange semester.',
    'I’ve mentored 300+ USAID scholars getting ready to study abroad.',
    'In high school I won gold in Canada (ICAN) for a nanomaterial water filter and a smart aeroponics system.',
    'I once pitched a new way to live on Mars and won the People’s Choice Award for it.',
    'As far as I know, I’m the first person from my city to become a Gator.',
    'I joined a research lab in Nebraska by walking up to the faculty and asking.',
    'I was head organizer for the Zewail City and USAID graduation ceremonies.',
    'I worked on the electrical and power team of an electric race car.',
    'My entrepreneurship team made AUC’s Grand Challenge top 10, with a 50,000 EGP prize.',
    'Sports record: two swimming medals and a cup, a football medal, and best player of a football tournament.',
    'I can go from power systems to AI to football to startup ideas in one conversation.',
    'I’d rather regret something I tried and failed at than something I never tried.'
  ],

  /* ---------- NOW & NEXT ---------- */
  doing: ['M.S. ECE at UF, thesis track', 'Research in UF’s TEA Lab: AI for safe autonomous systems, with a paper in progress', 'Second paper: AI models for e-motorcycle battery packs', 'Co-developing a Solar + EV optimization app', 'ECE Ambassador and the EII IGNITE entrepreneurship program'],
  next: ['Thesis research on AI-driven optimization of energy systems, especially data centers', 'A summer 2027 energy research internship', 'Long term: research, technology and a company that uses AI to solve energy problems in the Middle East and Africa']
};
