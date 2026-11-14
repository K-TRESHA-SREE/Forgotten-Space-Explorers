import type { Equipment } from "./types";
import { IMG } from "./images";

const nssdc = (id: string, label: string) => ({
  label,
  url: `https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=${id}`,
  source: "NASA NSSDC Master Catalog",
});

export const outerEquipment: Equipment[] = [
  /* ───────────────────────── DEEP SPACE ───────────────────────── */
  {
    id: "pioneer-10",
    destination: "deep-space",
    name: "Pioneer 10",
    officialName: "Pioneer 10 (Pioneer F)",
    years: "1972",
    yearStart: 1972,
    tagline: "The first messenger to cross the asteroid belt and visit Jupiter.",
    image: IMG.pioneer10,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/ARC-1972-AC72-2134/ARC-1972-AC72-2134~large.jpg",
        alt: "Pioneer 10 spacecraft at Cape Kennedy before launch",
        caption: "Pioneer 10 is delivered to Cape Kennedy before its journey to Jupiter.",
        credit: "NASA Ames Research Center",
        source: "https://images.nasa.gov/details/ARC-1972-AC72-2134",
      },
    ],
    journeyPoem: {
      title: "Pioneer 10's Faraway Letter",
      lines: [
        "Past the belt of wandering stone,",
        "I sailed where none had gone alone.",
        "Jupiter gave my path a sweep,",
        "And onward sent me into deep.",
        "A golden picture travels too,",
        "A little hello from me to you.",
      ],
    },
    model: "pioneer10",
    status: "drifting",
    statusNote: "Inactive, still travelling away from the Sun",
    stats: [
      { label: "Launched", value: "2 Mar 1972" },
      { label: "Jupiter fly-by", value: "3 Dec 1973" },
      { label: "Last signal", value: "23 Jan 2003" },
      { label: "Heading", value: "Toward Aldebaran" },
    ],
    facts: {
      mission:
        "The first mission to the outer Solar System: cross the asteroid belt, fly by Jupiter and then leave the planetary region for interstellar space.",
      launchDate: "2 March 1972, on an Atlas-Centaur rocket from Cape Canaveral, Florida.",
      purpose:
        "To study the asteroid belt, Jupiter’s atmosphere, magnetic field and radiation, and the interplanetary environment.",
      background:
        "Before Pioneer 10, nobody knew whether a spacecraft could survive the asteroid belt or Jupiter’s radiation. It is a spin-stabilised spacecraft with a 2.7 m dish antenna, powered by radioisotope generators because sunlight is too weak at Jupiter.",
      journey:
        "Pioneer 10 entered the asteroid belt in July 1972 and came out safely in early 1973. It flew past Jupiter on 3 December 1973 at about 130,000 km above the cloud tops, and used Jupiter’s gravity to escape the Solar System.",
      majorEvents: [
        "July 1972: the first spacecraft to enter the asteroid belt.",
        "3 Dec 1973: the first close-up views of Jupiter, around 500 images.",
        "1983: passed beyond the orbit of Neptune.",
        "31 March 1997: the mission was officially concluded. It was still used to test deep-space tracking.",
        "23 January 2003: the last, very weak signal was received.",
      ],
      discoveries: [
        "The asteroid belt was a lot emptier than feared, so spacecraft could safely cross it.",
        "Jupiter’s magnetic field and radiation belts are far more intense than expected.",
        "Jupiter is composed largely of liquid hydrogen with no solid surface.",
      ],
      achievements: [
        "First spacecraft to cross the asteroid belt.",
        "First to fly by Jupiter.",
        "First to reach the speed needed to leave the Solar System.",
        "Carries a plaque designed by Carl Sagan, Frank Drake and Linda Salzman Sagan.",
      ],
      challenges: [
        "Jupiter’s radiation environment.",
        "The need for nuclear power far from the Sun.",
        "Signals from the far outer Solar System became extremely weak.",
      ],
      finalStatus:
        "Inactive. The last, very weak signal was received on 23 January 2003, when it was around 12 billion km (80 AU) from Earth. Its power source can no longer power its transmitter.",
      currentLocation:
        "Interstellar-bound trajectory, heading generally toward the red star Aldebaran in the constellation Taurus, which it will approach in about two million years.",
      significance:
        "Pioneer 10 showed the way for later missions like Voyager and carried the first message from humanity, a plaque showing where and who we are, intended for any traveller who finds it.",
    },
    timeline: [
      { date: "2 Mar 1972", title: "Launch", text: "Pioneer 10 launches from Cape Canaveral and becomes the fastest human-made object to leave Earth at that time." },
      { date: "Jul 1972", title: "The belt", text: "It becomes the first spacecraft to enter the asteroid belt." },
      { date: "3 Dec 1973", title: "Jupiter", text: "It passes about 130,000 km above Jupiter’s clouds, sending back the first close images." },
      { date: "1983", title: "Beyond Neptune", text: "It crosses the orbit of Neptune and keeps going." },
      { date: "31 Mar 1997", title: "Mission ends", text: "NASA completes the mission, though the spacecraft keeps sending signals for a while." },
      { date: "23 Jan 2003", title: "Last whisper", text: "The last very weak signal is received." },
    ],
    narration: [
      { title: "The first visitor to Jupiter", text: "Before me, no spacecraft had ever visited Jupiter. To get there, I must first cross a huge stretch of space rocks called the asteroid belt. I am Pioneer 10, and the farthest giant planet is waiting.", basis: "Pioneer 10 was the first spacecraft to cross the asteroid belt and make a close flyby of Jupiter." },
      { title: "Can I cross the asteroid belt?", text: "I am Pioneer 10, heading toward Jupiter. First, I must cross the asteroid belt, a wide region filled with space rocks. I am the first spacecraft to try. Hold steady, little antenna!", basis: "Pioneer 10 was the first spacecraft to travel through the asteroid belt, in July 1972." },
      { title: "Jupiter fills the sky", text: "There it is: Jupiter, bigger and brighter with every moment! I fly past its cloudy bands and giant storms, take pictures, and send them all the way home.", basis: "Pioneer 10 flew past Jupiter on 3 December 1973 and sent back about 500 images." },
      { title: "A giant push", text: "Jupiter's gravity gives me a mighty push. I swing around the giant planet and head out toward the far edge of our Solar System. No extra rocket fuel needed!", basis: "Jupiter's gravity changed Pioneer 10's path and sent it onto an escape route from the Sun." },
      { title: "A message for someone", text: "I carry a golden picture plaque. It shows where Earth is and what people look like. If someone finds me far in the future, perhaps it will tell them who sent me.", basis: "Pioneer 10 carried a plaque designed by Carl Sagan, Frank Drake, and Linda Salzman Sagan." },
      { title: "A quiet traveller", text: "Earth can no longer hear my faint signal, but I keep travelling through space. I am heading toward a star called Aldebaran. It will take a very long time to get there.", basis: "Pioneer 10's last signal was received on 23 January 2003; its path heads toward Aldebaran. The storytelling is imagined." },
    ],
    funFacts: [
      { front: "What does the plaque show?", back: "A man and a woman, the Sun’s position relative to 14 pulsars, the Solar System with Pioneer’s path, and the hydrogen atom as a measure of scale." },
      { front: "The “Pioneer anomaly”", back: "A tiny unexplained acceleration was seen on both Pioneers. Later analysis (2012) showed it was caused by heat radiating unevenly from the spacecraft itself." },
      { front: "How far did it get?", back: "About 80 AU, 80 times the Earth–Sun distance, when it was last heard in 2003." },
    ],
    references: [
      { label: "Pioneer 10 mission", url: "https://science.nasa.gov/mission/pioneer-10/", source: "NASA Science" },
      nssdc("1972-012A", "Pioneer 10 — spacecraft record"),
    ],
  },
  {
    id: "pioneer-11",
    destination: "deep-space",
    name: "Pioneer 11",
    officialName: "Pioneer 11 (Pioneer G)",
    years: "1973",
    yearStart: 1973,
    tagline: "The first spacecraft to visit Saturn.",
    image: IMG.pioneer11,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/9139575/9139575~large.jpg",
        alt: "Atlas-Centaur carrying the Pioneer 11 spacecraft during launch",
        caption: "The Atlas-Centaur launches Pioneer 11, then called Pioneer G, toward Jupiter and Saturn.",
        credit: "NASA",
        source: "https://images.nasa.gov/details/9139575",
      },
    ],
    journeyPoem: {
      title: "Between the Rings",
      lines: [
        "I followed where my twin had flown,",
        "Then sought the rings unknown.",
        "Through Saturn's shining, icy lace,",
        "I found a new and hidden place.",
        "My final whisper faded from sight,",
        "But scouts leave maps for those in flight.",
      ],
    },
    model: "pioneer11",
    status: "drifting",
    statusNote: "Inactive, still travelling through deep space",
    stats: [
      { label: "Launched", value: "5 Apr 1973" },
      { label: "Jupiter", value: "Dec 1974" },
      { label: "Saturn", value: "1 Sep 1979" },
      { label: "Heading", value: "Toward Aquila" },
    ],
    facts: {
      mission:
        "To follow Pioneer 10 to Jupiter, then use Jupiter’s gravity to reach Saturn, making it the first spacecraft ever to visit the ringed planet.",
      launchDate: "5 April 1973, on an Atlas-Centaur rocket from Cape Canaveral, Florida.",
      purpose:
        "To study Jupiter, Saturn, their moons and magnetic fields, and the interplanetary environment. It also served as a scout for the Voyager missions.",
      background:
        "Pioneer 11 was a twin of Pioneer 10, with a similar radioisotope-powered design. After Pioneer 10’s success, Pioneer 11’s trajectory was changed so that Jupiter would fling it across the Solar System to Saturn.",
      journey:
        "It flew past Jupiter in early December 1974 at about 34,000 km above the cloud tops, then swung back across the Solar System to Saturn, passing about 21,000 km above Saturn’s cloud tops on 1 September 1979.",
      majorEvents: [
        "December 1974: the first images of Jupiter’s polar regions.",
        "1 September 1979: the first spacecraft to fly by Saturn.",
        "It crossed Saturn’s ring plane twice, avoiding the ring debris.",
        "30 September 1995: its power fell too low to operate any instruments.",
        "November 1995: the last communications with Earth.",
      ],
      discoveries: [
        "Discovered a narrow outer ring of Saturn, the F ring.",
        "Measured Saturn’s magnetic field and found that the planet is mostly liquid hydrogen.",
        "Measured Titan’s very cold temperature, about -179 °C.",
        "Jupiter’s polar regions observed for the first time.",
      ],
      achievements: [
        "First spacecraft to encounter Saturn.",
        "First to use Jupiter’s gravity to reach another planet.",
        "Its data helped plan the trajectories and safety of the Voyager spacecraft.",
      ],
      challenges: [
        "Crossing Saturn’s ring plane, where unseen particles could have destroyed it.",
        "Radiation at Jupiter, and then at Saturn.",
        "Declining power from its generators over the years.",
      ],
      finalStatus:
        "Inactive. Its power ran too low to operate any instruments by 30 September 1995, and the last communications were in November 1995. It continues to coast through deep space.",
      currentLocation:
        "Interstellar-bound trajectory, heading generally toward the constellation Aquila (toward Scutum); it will pass near one of the stars in Aquila in about four million years.",
      significance:
        "Pioneer 11 proved that spacecraft can safely fly through Saturn’s ring plane, informing the design of the Voyager flybys and, later, Cassini. Like Pioneer 10, it carries a plaque.",
    },
    timeline: [
      { date: "5 Apr 1973", title: "Launch", text: "Pioneer 11 follows its twin from Cape Canaveral." },
      { date: "Dec 1974", title: "Jupiter", text: "A close pass at about 34,000 km. First images of Jupiter’s poles." },
      { date: "1 Sep 1979", title: "Saturn", text: "It slips through the ring plane and passes about 21,000 km over the clouds." },
      { date: "1979", title: "A new ring", text: "It finds the narrow F ring and measures Saturn’s magnetic field." },
      { date: "30 Sep 1995", title: "Power fades", text: "Power is too low to operate any instrument." },
      { date: "Nov 1995", title: "Last contact", text: "The final communications with Earth." },
    ],
    narration: [
      { title: "The next brave step", text: "My twin has already flown past Jupiter. Now it is my turn to go farther. I am Pioneer 11, and my path leads to Saturn's famous rings. Could a small spacecraft really pass through them safely?", basis: "Pioneer 11 followed Pioneer 10 and became the first spacecraft to fly past Saturn." },
      { title: "Following my space-traveller twin", text: "Pioneer 10 has already visited Jupiter. Now it is my turn! I am Pioneer 11, and I am going to look at the giant planet from a new direction.", basis: "Pioneer 11 was a twin spacecraft sent after Pioneer 10." },
      { title: "A look over Jupiter", text: "I swoop past Jupiter and look toward its poles, places no spacecraft has photographed up close before. Then Jupiter's gravity points me toward my next stop: Saturn.", basis: "Pioneer 11 passed Jupiter on 2–3 December 1974 and took the first close images of its polar regions." },
      { title: "A daring path through the rings", text: "Saturn's rings sparkle ahead. I must pass through the ring plane, where tiny bits of ice and rock could hit me. I make it through and spot a narrow ring scientists had not seen before!", basis: "Pioneer 11 crossed Saturn's ring plane on 1 September 1979 and discovered the F ring." },
      { title: "Helping the next explorers", text: "I send my measurements home so the next spacecraft can plan their visits to Saturn. A good scout shares what it learns with the travellers who come after.", basis: "Pioneer 11's findings informed planning for the Voyager missions." },
      { title: "Still travelling", text: "My power grows weak, and Earth hears my final message in 1995. I keep drifting toward the stars in the constellation Aquila, carrying a golden plaque just like my twin.", basis: "Pioneer 11's last contact was in November 1995; its path heads toward Aquila." },
    ],
    funFacts: [
      { front: "Saturn’s new ring", back: "Pioneer 11 found Saturn’s narrow F ring, just outside the main rings." },
      { front: "Where is it going?", back: "Toward the constellation Aquila. In roughly four million years it will pass near one of its stars." },
      { front: "Scout for Voyager", back: "Pioneer 11’s Saturn encounter taught engineers about radiation and rings before the Voyagers arrived." },
    ],
    references: [
      { label: "Pioneer 11 mission", url: "https://science.nasa.gov/mission/pioneer-11/", source: "NASA Science" },
      nssdc("1973-019A", "Pioneer 11 — spacecraft record"),
    ],
  },

  /* ───────────────────────── ASTEROIDS ───────────────────────── */
  {
    id: "near-shoemaker",
    destination: "asteroids",
    name: "NEAR Shoemaker",
    officialName: "Near Earth Asteroid Rendezvous – Shoemaker (NEAR Shoemaker)",
    years: "1996–2001",
    yearStart: 1996,
    tagline: "The first spacecraft to orbit and land on an asteroid.",
    image: IMG.near,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/9701593/9701593~orig.jpg",
        alt: "NEAR spacecraft being prepared before its mission",
        caption: "The NEAR spacecraft undergoes preflight preparation at Kennedy Space Center.",
        credit: "NASA/Kennedy Space Center",
        source: "https://images.nasa.gov/details/9701593",
      },
    ],
    journeyPoem: {
      title: "A Gentle Landing on Eros",
      lines: [
        "I missed my mark, then found my way,",
        "And circled Eros day by day.",
        "I mapped its stones from up above,",
        "Then touched its ground with careful love.",
        "My journey ended, soft and slow,",
        "On a little world I came to know.",
      ],
    },
    model: "near",
    status: "surface",
    statusNote: "Resting on asteroid 433 Eros",
    stats: [
      { label: "Launched", value: "17 Feb 1996" },
      { label: "Orbit began", value: "14 Feb 2000" },
      { label: "Landed", value: "12 Feb 2001" },
      { label: "Last signal", value: "28 Feb 2001" },
    ],
    facts: {
      mission:
        "To rendezvous with and orbit the near-Earth asteroid 433 Eros for a year. It was the first mission of NASA’s Discovery programme, built and operated by the Johns Hopkins University Applied Physics Laboratory.",
      launchDate: "17 February 1996, on a Delta II rocket from Cape Canaveral.",
      purpose:
        "To measure Eros’s size, shape, mass, composition, surface features and magnetic field to learn about the building blocks of the Solar System.",
      background:
        "Originally called NEAR, the spacecraft was renamed in March 2000 to honour planetary geologist Eugene Shoemaker. Eros is an S-type asteroid about 34 km long that orbits the Sun between the orbits of Earth and Mars.",
      journey:
        "NEAR flew by asteroid Mathilde on 27 June 1997, and used Earth’s gravity in 1998. A planned engine burn to reach Eros failed in December 1998. After a flyby, the team tried again, and NEAR entered orbit around Eros on 14 February 2000.",
      majorEvents: [
        "27 June 1997: fly-by of the asteroid 253 Mathilde.",
        "20 Dec 1998: the engine burn aborted, forcing a flyby of Eros instead of orbit.",
        "14 Feb 2000: entered orbit around Eros, a first for an asteroid.",
        "12 Feb 2001: a controlled descent ended in a touchdown at 1.5–1.8 m/s. NEAR was not designed to land.",
        "28 Feb 2001: final signal received.",
      ],
      discoveries: [
        "Eros is a single, solid body, not a loose pile of rubble.",
        "A layer of loose dust and rock (regolith) covers the surface, with smooth deposits (“ponds”) in some craters.",
        "Composition is similar to common meteorites called ordinary chondrites.",
        "Craters, boulders, ridges and grooves were mapped in extraordinary detail, and the asteroid’s mass and density were measured.",
      ],
      achievements: [
        "First spacecraft to orbit an asteroid.",
        "First to land on an asteroid.",
        "It kept sending data from the surface for about two weeks.",
        "69 pictures from its final descent are the highest-resolution images of an asteroid at that time.",
      ],
      challenges: [
        "The aborted engine burn in 1998, which cost a year.",
        "Flying very close to a lumpy, rapidly rotating body.",
        "Eventual freezing temperatures on the surface (about -173 °C).",
      ],
      finalStatus:
        "Inactive. After landing, its gamma-ray spectrometer collected data from the surface until 28 February 2001. A final attempt to contact it on 10 December 2002 failed.",
      currentLocation:
        "On the surface of asteroid 433 Eros, just south of the saddle-shaped feature called Himeros.",
      significance:
        "NEAR Shoemaker showed that asteroids can be explored up close, and it paved the way for missions that visit asteroids, collect samples, and test planetary defence.",
    },
    timeline: [
      { date: "17 Feb 1996", title: "Launch", text: "NEAR lifts off on a Delta II from Cape Canaveral." },
      { date: "27 Jun 1997", title: "Mathilde", text: "A flyby of the dark, cratered asteroid Mathilde." },
      { date: "20 Dec 1998", title: "A missed burn", text: "The engine shuts down early and contact is lost for a day. The team re-plans." },
      { date: "14 Feb 2000", title: "Orbit", text: "NEAR becomes the first spacecraft to orbit an asteroid." },
      { date: "Mar 2000", title: "A new name", text: "The mission is renamed in honour of Eugene Shoemaker." },
      { date: "12 Feb 2001", title: "Touchdown", text: "After a final descent, NEAR lands on Eros. It was not designed to land." },
      { date: "28 Feb 2001", title: "Last signal", text: "NASA’s Deep Space Network receives the last data and the probe is shut down." },
    ],
    narration: [
      { title: "The missed meeting", text: "I have travelled millions of kilometres to meet an asteroid, but my engine stops too soon. Did I lose my chance? I am NEAR Shoemaker, and the team on Earth is about to find me a new path to Eros.", basis: "An engine burn ended early in December 1998; the team replanned the mission, and NEAR later reached Eros." },
      { title: "The asteroid slips away", text: "I am NEAR Shoemaker, racing toward the asteroid Eros. My engine stops too soon, and I miss my planned meeting! The team on Earth makes a new plan, and I get another chance.", basis: "An engine burn ended early on 20 December 1998; NEAR flew past Eros on 23 December." },
      { title: "A year of exploring from orbit", text: "I finally reach Eros and begin circling it. Once, twice, then again and again—about 230 trips around the asteroid! From above, I map its craters, rocks, and dusty ground.", basis: "NEAR orbited Eros from February 2000 to February 2001, completing about 230 orbits." },
      { title: "Can I land on an asteroid?", text: "My mission was not meant to end with a landing, but the team gives it a try. I drift down gently and touch the rocky ground. I am still in one piece!", basis: "NEAR made a controlled descent and touched down at about 1.5–1.8 m/s on 12 February 2001." },
      { title: "One last science lesson", text: "From the surface, I keep measuring Eros for about two more weeks. Being close to the ground helps me send one last set of clues about what this asteroid is made of.", basis: "NEAR's gamma-ray spectrometer returned data from the surface for about two weeks." },
      { title: "Resting on Eros", text: "My last signal reaches Earth on 28 February 2001. I stay on Eros, the asteroid I travelled so far to meet. What began as a fly-by became a landing no one expected.", basis: "NEAR's last signal was received on 28 February 2001; a later contact attempt failed. The storytelling is imagined." },
    ],
    funFacts: [
      { front: "Named for a geologist", back: "Eugene Shoemaker studied impact craters and trained Apollo astronauts. NEAR was renamed in his honour in 2000." },
      { front: "It wasn’t designed to land", back: "The mission team decided to try a touchdown at the end, and the spacecraft survived and kept transmitting." },
      { front: "How big is Eros?", back: "About 34 km long. It is one of the largest near-Earth asteroids." },
    ],
    references: [
      { label: "NEAR Shoemaker mission", url: "https://science.nasa.gov/mission/near-shoemaker/", source: "NASA Science" },
      nssdc("1996-008A", "NEAR Shoemaker — spacecraft record"),
      { label: "NEAR mission FAQ (JHU Applied Physics Laboratory)", url: "https://near.jhuapl.edu/intro/faq.html", source: "JHU APL" },
    ],
  },
  {
    id: "dart",
    destination: "asteroids",
    name: "DART",
    officialName: "Double Asteroid Redirection Test (DART)",
    years: "2021–2022",
    yearStart: 2021,
    tagline: "The first test of moving an asteroid, and the first to change one’s orbit.",
    image: IMG.dart,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/KSC-20211004-PH-ANT01_0044/KSC-20211004-PH-ANT01_0044~large.jpg",
        alt: "Technicians preparing the DART spacecraft on a work stand",
        caption: "Technicians prepare the DART spacecraft at the Astrotech Space Operations Facility before launch.",
        credit: "NASA/Kennedy Space Center",
        source: "https://images.nasa.gov/details/KSC-20211004-PH-ANT01_0044",
      },
    ],
    journeyPoem: {
      title: "DART's Brave Bump",
      lines: [
        "A tiny moon was just a light,",
        "A distant dot against the night.",
        "I aimed my course, I met my mark,",
        "And changed its dance around the dark.",
        "One small bump, one lesson clear:",
        "We can learn to guard our home here.",
      ],
    },
    model: "dart",
    status: "impact",
    statusNote: "Destroyed in a planned impact on Dimorphos",
    stats: [
      { label: "Launched", value: "24 Nov 2021" },
      { label: "Impact", value: "26 Sep 2022" },
      { label: "Speed", value: "≈ 22,500 km/h" },
      { label: "Orbit change", value: "≈ 32 min" },
    ],
    facts: {
      mission:
        "The first planetary-defence test mission: crash a spacecraft into a small asteroid moon, Dimorphos, to measure how much its orbit around the larger asteroid Didymos could be changed.",
      launchDate: "24 November 2021 (UTC), on a SpaceX Falcon 9 rocket from Vandenberg Space Force Base, California.",
      purpose:
        "To demonstrate the “kinetic impactor” technique: changing an asteroid’s motion by hitting it, a possible way to protect Earth from a future threatening asteroid.",
      background:
        "Led by NASA’s Planetary Defense Coordination Office and built and managed by the Johns Hopkins Applied Physics Laboratory. Dimorphos was never a threat to Earth, which made it a safe target.",
      journey:
        "DART travelled about ten months, using its camera DRACO and autonomous navigation (SMART Nav) to steer itself. Italy’s LICIACube cubesat separated on 11 September 2022 to watch.",
      majorEvents: [
        "Technology demonstration of a NEXT-C ion thruster and roll-out solar arrays.",
        "11 Sep 2022: LICIACube separates for observation.",
        "26 Sep 2022 (23:14 UTC): impact on Dimorphos at about 22,500 km/h (about 14,000 mph).",
        "Telescopes on Earth and in space (including Hubble and Webb) watched the ejecta.",
        "11 Oct 2022: NASA confirms the orbit had been shortened by about 32 minutes.",
      ],
      discoveries: [
        "Dimorphos’s orbit around Didymos went from about 11 h 55 min to about 11 h 23 min.",
        "The impact threw out a large tail of debris, observed for weeks.",
        "Dimorphos appears to be a loosely held ‘rubble pile’, which affects how effective an impact is.",
      ],
      achievements: [
        "First time humanity changed the motion of a celestial body.",
        "Proved the kinetic impactor technique can work.",
        "Autonomous guidance hit a target about 160 m wide from millions of kilometres.",
      ],
      challenges: [
        "Hitting a small, distant, unseen target at high speed.",
        "Only the final hours showed Dimorphos as more than a point of light.",
        "Needed precise guidance, with no way to correct after impact.",
      ],
      finalStatus:
        "Destroyed. DART was designed to end its life in the impact with Dimorphos. The spacecraft’s camera sent images until moments before impact.",
      currentLocation:
        "Wreckage and debris on and around Dimorphos, in orbit around Didymos, in the Sun’s orbit near Earth’s path. ESA’s Hera mission, launched in October 2024, is studying the aftermath.",
      significance:
        "DART gave the world a tested method for deflecting an asteroid and showed that international cooperation can work in space.",
    },
    timeline: [
      { date: "24 Nov 2021", title: "Launch", text: "A Falcon 9 lifts DART from California." },
      { date: "11 Sep 2022", title: "A witness leaves", text: "The LICIACube cubesat separates to photograph the impact." },
      { date: "26 Sep 2022", title: "Final approach", text: "DRACO sees the Didymos system. SMART Nav locks onto Dimorphos." },
      { date: "26 Sep 2022", title: "Impact", text: "At about 23:14 UTC, DART strikes Dimorphos at around 22,500 km/h." },
      { date: "11 Oct 2022", title: "The result", text: "NASA announces that Dimorphos’s orbit is about 32 minutes shorter." },
      { date: "Oct 2024", title: "Hera follows", text: "ESA launches Hera to survey the impact site up close." },
    ],
    narration: [
      { title: "Can we change an asteroid's path?", text: "Imagine a faraway space rock heading toward Earth. Could a spacecraft gently change its path before it became dangerous? I am DART, and today I am testing that idea on a harmless asteroid moon. Every picture brings me closer.", basis: "DART tested the kinetic-impact method on Dimorphos, which poses no threat to Earth." },
      { title: "Can a spacecraft move an asteroid?", text: "I am DART, and I have one big test to try. I am heading toward a tiny moon named Dimorphos. My goal is to bump it and see if its path changes.", basis: "DART was a roughly 570 kg spacecraft with solar arrays and a camera called DRACO." },
      { title: "A tiny dot grows", text: "For a long time, Dimorphos is just a dot in my camera. As I get closer, the dot becomes a rocky little world. I keep taking pictures and aiming carefully.", basis: "DART's camera resolved Dimorphos only in the final hours before impact." },
      { title: "The spacecraft takes aim", text: "Earth is too far away to steer me at the last moment. My navigation system studies the pictures and guides me toward Dimorphos all by itself.", basis: "DART used its SMART Nav system for autonomous guidance in the final hours." },
      { title: "A tiny camera watches", text: "A small camera called LICIACube has flown away to watch from a safe distance. It is ready to see what happens when I reach the asteroid moon.", basis: "LICIACube separated from DART on 11 September 2022 and observed the impact and its aftermath." },
      { title: "A test that changed a path", text: "I reach Dimorphos and my pictures end. But the test works: its orbit around the larger asteroid becomes about 32 minutes shorter. My mission is over, and scientists have learned how a spacecraft can nudge an asteroid.", basis: "DART hit Dimorphos on 26 September 2022, shortening its orbit by about 32 minutes." },
    ],
    funFacts: [
      { front: "Was Earth in danger?", back: "No. Neither Didymos nor Dimorphos poses a threat to Earth, before or after the test." },
      { front: "How much did the orbit change?", back: "From roughly 11 h 55 min to 11 h 23 min, a shortening of about 32 minutes. The target was at least 73 seconds." },
      { front: "A follow-up mission", back: "ESA’s Hera spacecraft was launched in October 2024 to measure the crater and Dimorphos’s mass." },
    ],
    references: [
      { label: "DART mission", url: "https://science.nasa.gov/mission/dart/", source: "NASA Science" },
      { label: "Planetary Defense — DART", url: "https://www.nasa.gov/planetarydefense/dart/", source: "NASA" },
      nssdc("2021-110A", "DART — spacecraft record"),
    ],
  },
];
