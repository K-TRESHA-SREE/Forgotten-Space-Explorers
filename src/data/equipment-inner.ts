import type { Equipment } from "./types";
import { IMG } from "./images";

const nssdc = (id: string, label: string) => ({
  label,
  url: `https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=${id}`,
  source: "NASA NSSDC Master Catalog",
});

export const innerEquipment: Equipment[] = [
  /* ───────────────────────── MOON ───────────────────────── */
  {
    id: "apollo-11-eagle",
    destination: "moon",
    name: "Eagle (Descent Stage)",
    officialName: "Apollo 11 Lunar Module LM-5 “Eagle” — Descent Stage",
    years: "1969",
    yearStart: 1969,
    tagline: "The landing platform that carried humanity to another world.",
    image: IMG.eagle,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/as11-40-5902/as11-40-5902~medium.jpg",
        alt: "Buzz Aldrin beside a leg of the Apollo 11 Lunar Module Eagle on the Moon",
        caption: "Buzz Aldrin works beside a leg of Eagle during the Apollo 11 Moonwalk.",
        credit: "NASA",
        source: "https://images.nasa.gov/details/as11-40-5902",
      },
    ],
    journeyPoem: {
      title: "Where Eagle Stays",
      lines: [
        "A silver Earth, a quiet sky,",
        "Two brave hearts came drifting by.",
        "I held them close, then let them rise,",
        "Back to home beneath blue skies.",
        "My feet still rest where footprints start,",
        "A little machine with a giant heart.",
      ],
    },
    model: "eagle",
    status: "surface",
    statusNote: "Still on the Moon at Tranquility Base",
    stats: [
      { label: "Launched", value: "16 Jul 1969" },
      { label: "Landed", value: "20 Jul 1969" },
      { label: "Crew", value: "Armstrong · Aldrin" },
      { label: "Site", value: "Sea of Tranquility" },
    ],
    facts: {
      mission:
        "Apollo 11 — the first crewed mission to land on the Moon. The Lunar Module (LM) Eagle carried Neil Armstrong and Buzz Aldrin to the surface while Michael Collins orbited above in the Command Module Columbia.",
      launchDate:
        "16 July 1969, on a Saturn V rocket from Kennedy Space Center, Florida (launch at 13:32 UTC).",
      purpose:
        "The Lunar Module had two parts. The descent stage held the landing engine, fuel, landing legs and stowed equipment, and acted as a launch platform. The ascent stage carried the crew back to lunar orbit.",
      background:
        "In 1961 President John F. Kennedy set the goal of landing a person on the Moon and returning them safely before the decade ended. The LM, built by Grumman, was the first spacecraft designed to fly only in the vacuum of space.",
      journey:
        "After four days in transit, Armstrong and Aldrin undocked Eagle from Columbia on 20 July 1969, fired the descent engine, and touched down in the Sea of Tranquility at about 20:17 UTC. They left the surface 21½ hours later from the top of the descent stage.",
      majorEvents: [
        "Program alarms (1201 and 1202) sounded during descent; ground controllers judged them safe to continue.",
        "Armstrong took manual control to fly past a boulder-strewn crater and find a safe landing spot.",
        "“Houston, Tranquility Base here. The Eagle has landed.”",
        "Armstrong stepped onto the surface at about 02:56 UTC on 21 July; the moonwalk lasted roughly 2½ hours.",
        "The ascent stage lifted off using the descent stage as its launch pad.",
      ],
      discoveries: [
        "About 21.5 kg (47.5 lb) of lunar rock and soil came back to Earth for study.",
        "A seismometer and a laser retroreflector were set up near the lander.",
        "The footpads sank only slightly into the soil, confirming that the surface could carry the weight of a lander.",
      ],
      achievements: [
        "First humans to walk on another world.",
        "Safe return of the crew on 24 July 1969, fulfilling Kennedy’s goal.",
        "The laser retroreflector left nearby is still used by observatories to measure the Earth–Moon distance.",
      ],
      challenges: [
        "Computer overload alarms during the most critical minutes of descent.",
        "A landing site covered with boulders that had to be avoided by hand.",
        "Fine, clinging lunar dust.",
      ],
      finalStatus:
        "The descent stage remains where it landed. The ascent stage was jettisoned in lunar orbit after the crew returned and is believed to have crashed on the Moon at an unknown location.",
      currentLocation:
        "Tranquility Base, Sea of Tranquility (Mare Tranquillitatis), Moon — about 0.67° N, 23.47° E.",
      significance:
        "A plaque on the descent stage reads: “Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.” Items left nearby include a commemorative silicon disc of goodwill messages, an Apollo 1 mission patch, and medals honouring cosmonauts Yuri Gagarin and Vladimir Komarov. NASA’s Lunar Reconnaissance Orbiter has since photographed the site from orbit.",
    },
    timeline: [
      { date: "25 May 1961", title: "A bold goal", text: "President Kennedy asks Congress to commit to landing a person on the Moon before the decade is out." },
      { date: "16 Jul 1969", title: "Liftoff", text: "A Saturn V launches Apollo 11 from Kennedy Space Center with Eagle stowed in the rocket’s upper stage." },
      { date: "20 Jul 1969", title: "Touchdown", text: "Eagle lands in the Sea of Tranquility at about 20:17 UTC after Armstrong steers clear of a boulder field." },
      { date: "21 Jul 1969", title: "First steps", text: "Armstrong, then Aldrin, walk on the Moon. They deploy experiments and gather samples." },
      { date: "21 Jul 1969", title: "Leaving Eagle behind", text: "The ascent stage lifts off from the descent stage and returns to Columbia in lunar orbit." },
      { date: "24 Jul 1969", title: "Home safe", text: "Apollo 11 splashes down in the Pacific Ocean." },
      { date: "2009 →", title: "Seen from orbit", text: "NASA’s Lunar Reconnaissance Orbiter photographs the landing site, including the descent stage and the astronauts’ paths." },
    ],
    narration: [
      { title: "The last step to the Moon", text: "For a few minutes, two astronauts' path to the Moon's surface depends on me. The ground is rushing closer, and there are rocks below. Can I find a safe place to land? I am Eagle's descent stage, and my biggest moment is about to begin.", basis: "The Eagle descent stage carried Neil Armstrong and Buzz Aldrin to the lunar surface." },
      { title: "A tiny world below", text: "The Moon is getting bigger in my window. Two astronauts are riding inside me, and I have one very important job: find a safe place to land. Can you spot a smooth patch?", basis: "The Eagle descent stage carried Neil Armstrong and Buzz Aldrin to the lunar surface." },
      { title: "Rocks ahead!", text: "Beep! My computer is busy, and the ground below is full of rocks. Armstrong takes control and guides me toward a clear spot. The fuel is running low, but we are almost there.", basis: "Documented: 1201/1202 alarms sounded during descent; Armstrong manually flew past a boulder-filled crater." },
      { title: "A quiet touchdown", text: "My feet touch the dusty ground. We made it! The astronauts climb out, walk on the Moon, and leave the first human footprints on another world.", basis: "Documented: landing at about 20:17 UTC; the moonwalk began at about 02:56 UTC on 21 July." },
      { title: "A ride back up", text: "It is time to go home. The top half of Eagle starts its engine and lifts the astronauts away. I stay behind, doing my final job as their launch pad.", basis: "Documented: the ascent stage lifted off using the descent stage as its launch platform." },
      { title: "Still on the Moon", text: "The astronauts are far away now, but I am still here at Tranquility Base. Earth shines above me. I am a quiet reminder of the day people first walked on the Moon.", basis: "Documented: the descent stage remains at Tranquility Base and has been seen in images from lunar orbit. The feelings are imagined." },
    ],
    funFacts: [
      { front: "What stayed on the Moon besides the stage?", back: "A laser retroreflector, a seismometer, a flag, a plaque, a silicon disc of messages, an Apollo 1 patch and medals for cosmonauts Gagarin and Komarov." },
      { front: "Is the experiment left behind still working?", back: "The retroreflector needs no power. Observatories on Earth still bounce laser pulses off it to measure the Earth–Moon distance." },
      { front: "Where did the ascent stage go?", back: "It was released into lunar orbit and is believed to have later crashed on the Moon. Its exact location is unknown." },
    ],
    references: [
      { label: "Apollo 11 mission overview", url: "https://www.nasa.gov/mission/apollo-11/", source: "NASA" },
      nssdc("1969-059C", "Apollo 11 Lunar Module (LM-5) — spacecraft record"),
      { label: "Lunar Reconnaissance Orbiter mission", url: "https://science.nasa.gov/mission/lro/", source: "NASA Science" },
    ],
  },
  {
    id: "surveyor-3",
    destination: "moon",
    name: "Surveyor 3",
    officialName: "Surveyor 3 (Surveyor C) — Soft-landing lunar probe",
    years: "1967",
    yearStart: 1967,
    tagline: "The scout that was visited by astronauts.",
    image: IMG.surveyor,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/AS12-48-7133/AS12-48-7133~large.jpg",
        alt: "Surveyor 3 on the Moon with the Apollo 12 Lunar Module in the background",
        caption: "Surveyor 3, photographed by the Apollo 12 astronauts during their visit.",
        credit: "NASA",
        source: "https://images.nasa.gov/details/AS12-48-7133",
      },
    ],
    journeyPoem: {
      title: "The Moon's First Scout",
      lines: [
        "I bounced beneath the silent sky,",
        "Then raised my camera, looked up high.",
        "I pressed the soil, I dug below,",
        "And sent Earth clues it needed to know.",
        "When Apollo came, I was not alone,",
        "A piece of my journey travelled home.",
      ],
    },
    model: "surveyor",
    status: "surface",
    statusNote: "Still on the Moon in Oceanus Procellarum",
    stats: [
      { label: "Launched", value: "17 Apr 1967" },
      { label: "Landed", value: "20 Apr 1967" },
      { label: "Images", value: "6,000+" },
      { label: "Visited by", value: "Apollo 12 (1969)" },
    ],
    facts: {
      mission:
        "Part of NASA’s Surveyor programme: robotic landers that tested soft landings and surveyed the Moon’s surface ahead of the Apollo crews.",
      launchDate: "17 April 1967, on an Atlas-Centaur rocket from Cape Kennedy, Florida.",
      purpose:
        "To land softly, send back TV pictures, and use a small scoop arm to test how strong and loose the lunar soil was so that engineers could be sure Apollo landers would not sink.",
      background:
        "Before people could land on the Moon, NASA needed proof that a spacecraft could land gently and that the surface would hold it. Surveyors answered both questions.",
      journey:
        "Surveyor 3 reached the Moon on 20 April 1967. Its radar failed to shut down the landing engines at the planned moment, so it touched down and bounced twice before settling on the inner slope of a small crater in Oceanus Procellarum.",
      majorEvents: [
        "The soft landing succeeded despite two bounces.",
        "A scoop on a robotic arm dug trenches to test the strength of the soil.",
        "On 24 April 1967 the camera photographed Earth passing in front of the Sun, a solar eclipse seen from the Moon.",
        "Operations ended in early May 1967 as lunar night approached.",
        "On 20 November 1969 Apollo 12 astronauts Pete Conrad and Alan Bean walked to the probe and removed parts of it.",
      ],
      discoveries: [
        "The soil is firm enough to carry a lander, although it is soft and powdery on top.",
        "Trenching showed how the soil’s strength changes with depth.",
        "More than 6,000 images documented the crater and the lunar horizon.",
      ],
      achievements: [
        "Proved that a soft landing on the Moon was possible and that the surface could support Apollo.",
        "The first spacecraft to be visited by humans on another world.",
        "Returned parts gave scientists a look at how materials age after over two years on the Moon.",
      ],
      challenges: [
        "A radar problem caused the double bounce.",
        "Lunar night (about two Earth weeks of cold and dark) could not be survived by its electronics.",
      ],
      finalStatus:
        "Inactive. Operations ended in early May 1967, and later attempts to revive it were unsuccessful. Apollo 12 astronauts removed its TV camera, scoop, and some tubing, which were returned to Earth. The rest remains on the Moon.",
      currentLocation:
        "Inside “Surveyor crater”, Oceanus Procellarum (Ocean of Storms), Moon — about 3.0° S, 23.4° W, roughly 180 m from the Apollo 12 landing site.",
      significance:
        "Surveyor 3 became a natural laboratory. The camera brought home by Apollo 12 is now in the collection of the Smithsonian National Air and Space Museum, and the mission showed that robots and humans can work together to explore.",
    },
    timeline: [
      { date: "17 Apr 1967", title: "Launch", text: "Surveyor 3 leaves Cape Kennedy on an Atlas-Centaur rocket." },
      { date: "20 Apr 1967", title: "Bounce, bounce, landed", text: "The landing engines keep firing too long. The probe hops twice and settles on a crater slope." },
      { date: "Apr 1967", title: "Digging in", text: "The scoop arm digs trenches, and the camera sends back thousands of images." },
      { date: "24 Apr 1967", title: "An eclipse from the Moon", text: "The camera photographs the Earth blocking the Sun." },
      { date: "May 1967", title: "Lights out", text: "Sunset approaches, the lunar night begins, and the probe does not recover." },
      { date: "19 Nov 1969", title: "A neighbour arrives", text: "Apollo 12 lands near the crater with a pinpoint landing." },
      { date: "20 Nov 1969", title: "Visitors", text: "Conrad and Bean walk to Surveyor 3 and cut away its camera, scoop and tubing to bring home." },
    ],
    narration: [
      { title: "One small robot, one big question", text: "Before people could walk on the Moon, someone had to test the ground. What if it was too soft to hold a lander? I was sent ahead to find out. My name is Surveyor 3, and this little scoop could help open the way for astronauts.", basis: "Surveyor missions tested lunar landing conditions and soil strength before Apollo missions." },
      { title: "Can the Moon hold us?", text: "Before astronauts could land, someone had to test the Moon's ground. That someone is me, Surveyor 3. I have a camera, a digging arm, and a big question: is this soil safe?", basis: "Surveyor spacecraft tested soft landings and soil strength before Apollo missions." },
      { title: "Bounce, bounce, stop!", text: "I am coming down, but my engines keep pushing. Boing! I bounce, then bounce again, and slide to a stop on a crater slope. That was not the plan, but I am ready to explore.", basis: "Documented: Surveyor 3 bounced twice during landing." },
      { title: "A little digging", text: "I stretch out my scoop and dig into the Moon's soil. My camera takes picture after picture. Back on Earth, people study them to learn what the ground is like.", basis: "Documented: Surveyor 3 used its surface sampler to dig trenches and sent more than 6,000 images." },
      { title: "The Sun goes down", text: "The sunlight fades, and the long lunar night begins. It gets too cold for me to keep working, so my messages stop. My pictures and soil tests have already helped answer an important question.", basis: "Surveyor 3 stopped working in early May 1967 as lunar night began. The storytelling is imagined." },
      { title: "A surprise visit", text: "Two years later, astronauts Conrad and Bean land nearby! They walk over, collect some of my parts, and take them back to Earth. I helped prepare the way, and now I get to travel home in pieces.", basis: "Documented: Apollo 12 visited Surveyor 3 on 20 November 1969 and returned parts to Earth." },
    ],
    funFacts: [
      { front: "How close did Apollo 12 land?", back: "About 180 m (600 ft) from Surveyor 3. It was a precision landing meant to test whether astronauts could pinpoint a site." },
      { front: "What happened to the camera?", back: "It was brought back to Earth in 1969 and is part of the Smithsonian National Air and Space Museum collection." },
      { front: "A solar eclipse from the Moon", back: "On 24 April 1967 Surveyor 3 photographed Earth passing in front of the Sun, seen from the lunar surface." },
    ],
    references: [
      nssdc("1967-035A", "Surveyor 3 — spacecraft record"),
      { label: "Surveyor 3 mission page", url: "https://science.nasa.gov/mission/surveyor-3/", source: "NASA Science" },
      { label: "Apollo 12 mission overview", url: "https://www.nasa.gov/mission/apollo-12/", source: "NASA" },
    ],
  },

  /* ───────────────────────── VENUS ───────────────────────── */
  {
    id: "pioneer-venus-large-probe",
    destination: "venus",
    name: "Pioneer Venus Large Probe",
    officialName: "Pioneer Venus Multiprobe — Large Probe (Pioneer Venus 2)",
    years: "1978",
    yearStart: 1978,
    tagline: "A fifty-minute fall through Venus’s clouds.",
    image: IMG.venusLarge,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/ARC-1977-AC77-0376-8/ARC-1977-AC77-0376-8~large.jpg",
        alt: "Engineers inspecting the Pioneer Venus multiprobe assembly before launch",
        caption: "Engineers inspect the Pioneer Venus multiprobe assembly before launch; the large probe was one of its atmospheric explorers.",
        credit: "NASA Ames Research Center",
        source: "https://images.nasa.gov/details/ARC-1977-AC77-0376-8",
      },
    ],
    journeyPoem: {
      title: "Through Venus's Veil",
      lines: [
        "Gold clouds closed around my flight,",
        "I read the air, a spark of light.",
        "Through heat and thunder, down I came,",
        "Each little number spoke my name.",
        "My signal faded, but not my part,",
        "I left a map inside Earth's heart.",
      ],
    },
    model: "venus-large",
    status: "surface",
    statusNote: "Impacted Venus’s surface; silent since impact",
    stats: [
      { label: "Launched", value: "8 Aug 1978" },
      { label: "Entry", value: "9 Dec 1978" },
      { label: "Mass", value: "about 316 kg" },
      { label: "Fall time", value: "≈ 55 min" },
    ],
    facts: {
      mission:
        "Pioneer Venus 2 (the Multiprobe) carried one Large Probe and three Small Probes. All were released from a carrier spacecraft (the “bus”) and sent into Venus’s atmosphere at different locations.",
      launchDate: "8 August 1978, aboard an Atlas-Centaur rocket from Cape Canaveral.",
      purpose:
        "To measure the composition, structure, clouds, winds and heat balance of Venus’s atmosphere all the way down to the surface.",
      background:
        "Pioneer Venus was a two-part programme in 1978: an Orbiter (Pioneer Venus 1) and the Multiprobe (Pioneer Venus 2). The probes were cone-shaped and were not designed to survive impact on the surface.",
      journey:
        "The bus released the Large Probe on 16 November 1978, about 11.1 million km from Venus. It entered the atmosphere on 9 December at about 11.6 km/s on the day side near the equator, was slowed by drag and a parachute, and reached the surface about 55 minutes later.",
      majorEvents: [
        "16 Nov 1978: release of the Large Probe from the bus.",
        "20 Nov 1978: release of the three Small Probes.",
        "9 Dec 1978: the Large Probe enters the atmosphere first.",
        "The parachute was released partway down so the probe would fall faster.",
        "The probe hit the surface at about 32 km/h (20 mph) at 4.4° N, 304° E, and transmissions ended at impact, as expected.",
      ],
      discoveries: [
        "Direct measurements of the temperature, pressure and chemistry of the atmosphere from high above the clouds to the surface.",
        "The atmosphere is overwhelmingly carbon dioxide.",
        "The cloud layers contain sulfuric-acid particles in distinct layers.",
        "Venus’s atmosphere has far more primordial argon than Earth’s, a clue to how the planets formed.",
      ],
      achievements: [
        "Built a detailed picture of the structure of the Venusian atmosphere.",
        "Mission data helped build the case for the runaway greenhouse effect on Venus.",
        "Four probes and the bus gave data at five locations at once.",
      ],
      challenges: [
        "Peak deceleration during entry was extreme.",
        "Temperatures near 460 °C and pressures about 90 times Earth’s at the surface.",
        "Instrument malfunctions affected some measurements across the probes.",
      ],
      finalStatus:
        "Silent since impact. NASA reports that transmissions ceased at impact as expected. Its condition on the surface is unknown, since no imaging of the spot exists.",
      currentLocation:
        "Surface of Venus, near the equator — impact point 4.4° N, 304° E.",
      significance:
        "Along with the orbiter, the Large Probe gave the first wide look at the deep atmosphere of Venus, and shaped how we think about climate change on terrestrial planets.",
    },
    timeline: [
      { date: "8 Aug 1978", title: "Launch", text: "Pioneer Venus 2 lifts off from Cape Canaveral on an Atlas-Centaur." },
      { date: "16 Nov 1978", title: "Separation", text: "The bus releases the Large Probe 11.1 million km from Venus." },
      { date: "20 Nov 1978", title: "Three siblings", text: "Three Small Probes (North, Day and Night) are released." },
      { date: "9 Dec 1978", title: "Entry", text: "The Large Probe hits the atmosphere at roughly 11.6 km/s, first of the five spacecraft to arrive." },
      { date: "9 Dec 1978", title: "Under the parachute", text: "The parachute slows the fall through the clouds and is later released." },
      { date: "9 Dec 1978", title: "Impact", text: "At about 19:40 UT it reaches the ground at about 32 km/h. Transmissions end." },
    ],
    narration: [
      { title: "A one-way trip into the clouds", text: "From space, Venus looks calm and bright. But what waits under those clouds? I am a probe built to dive into its thick air, measure what I find, and send the clues home before the heat wins.", basis: "The Pioneer Venus Large Probe carried instruments to study Venus's atmosphere during its descent." },
      { title: "A plunge into Venus", text: "Below me is Venus, wrapped in thick clouds. I begin my fall through the atmosphere at incredible speed. My instruments wake up: every bit of information matters.", basis: "Documented: the Large Probe entered Venus's atmosphere at about 11.6 km/s and slowed sharply." },
      { title: "Clouds all around", text: "A parachute opens, and my fall slows. I pass through layers of clouds, measuring the air and sending my readings to the spacecraft above me. What is hiding under these clouds?", basis: "Documented: the probe used a parachute and carried instruments to study the atmosphere and clouds." },
      { title: "The parachute lets go", text: "Now the parachute is gone, and I fall faster. Venus grows hotter and hotter. I keep sending my readings for as long as I can.", basis: "Documented: the parachute was released during descent. The storytelling is imagined." },
      { title: "Touchdown", text: "Thump! I reach the ground and keep sending a signal for a short time. Then my message ends. I was not built to live on Venus, but I made it all the way down.", basis: "Documented: the probe struck the surface at about 32 km/h, and its transmission ended at impact." },
      { title: "A puzzle solved", text: "My journey is over, but my readings are still helping people understand Venus. The clouds looked beautiful from far away. Now we know how hot and harsh the world beneath them can be.", basis: "The probe's data contributed to the study of Venus's atmosphere. The storytelling is imagined." },
    ],
    funFacts: [
      { front: "How many probes went in?", back: "Four probes (one large, three small) plus the bus entered the atmosphere on the same day: 9 December 1978." },
      { front: "Was it meant to survive?", back: "No. NASA notes the probes were not expected to survive impact. Only the Day Probe unexpectedly kept transmitting." },
      { front: "How big is it?", back: "About 1.5 m (5 ft) across with a mass of about 316 kg, with a pressure vessel inside a conical aeroshell." },
    ],
    references: [
      { label: "Pioneer Venus 2 (Multiprobe)", url: "https://science.nasa.gov/mission/pioneer-venus-2/", source: "NASA Science" },
      { label: "40 Years Ago, Pioneers Encounter Venus", url: "https://www.nasa.gov/history/40-years-ago-pioneers-encounter-venus/", source: "NASA History" },
      nssdc("1978-078A", "Pioneer Venus Multiprobe — spacecraft record"),
    ],
  },
  {
    id: "pioneer-venus-day-probe",
    destination: "venus",
    name: "Pioneer Venus Day Probe",
    officialName: "Pioneer Venus Multiprobe — Small Probe “Day” (Pioneer Venus 2)",
    years: "1978",
    yearStart: 1978,
    tagline: "The little probe that kept talking from the surface of Venus.",
    image: IMG.venusDay,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/ARC-1977-AC77-0376-8/ARC-1977-AC77-0376-8~large.jpg",
        alt: "Engineers inspecting the Pioneer Venus multiprobe assembly before launch",
        caption: "Engineers inspect the Pioneer Venus multiprobe assembly before launch; the Day Probe was one of its small atmospheric explorers.",
        credit: "NASA Ames Research Center",
        source: "https://images.nasa.gov/details/ARC-1977-AC77-0376-8",
      },
    ],
    journeyPoem: {
      title: "The Day Probe's Long Hello",
      lines: [
        "I fell through clouds no eyes could see,",
        "With one small voice inside of me.",
        "The ground came near; I touched below,",
        "And sent one more hello, hello.",
        "The heat grew strong, my power grew small,",
        "But Earth heard me through it all.",
      ],
    },
    model: "venus-day",
    status: "surface",
    statusNote: "Resting on Venus’s surface; silent since 9 Dec 1978",
    stats: [
      { label: "Launched", value: "8 Aug 1978" },
      { label: "Landed", value: "9 Dec 1978" },
      { label: "Surface signal", value: "67 min 37 s" },
      { label: "Surface temp.", value: "≈ 460 °C" },
    ],
    facts: {
      mission:
        "One of three identical Small Probes of Pioneer Venus 2, named for the planned entry locations: North, Day and Night. The Day Probe went to the sunlit hemisphere.",
      launchDate: "8 August 1978 (with the Multiprobe); released from the bus on 20 November 1978.",
      purpose:
        "To measure the atmosphere on the day side, including the temperature, pressure, and the cloud particles and heat flow that drive Venus’s weather.",
      background:
        "The Small Probes were identical in design, about 0.8 m across and roughly 90 kg, with a pressure vessel inside an aeroshell. They were designed to work during the descent only.",
      journey:
        "Released four days after the Large Probe, the Day Probe entered the atmosphere on 9 December 1978, descended in about 53–56 minutes, and landed in the south, at about 32° S, 318° E.",
      majorEvents: [
        "It descended without a parachute, braked by atmospheric drag.",
        "It landed hard, in a place with soft dust that likely cushioned the impact.",
        "The probe kept transmitting after landing for 67 minutes and 37 seconds.",
        "Its nephelometer showed that dust raised by the impact took several minutes to settle.",
        "It stopped when its battery and the heat inside overcame it.",
      ],
      discoveries: [
        "Data on the structure of the atmosphere and the cloud layers on the day side.",
        "Evidence from the surface landing that the dust cloud took minutes to clear.",
        "Heat-flow data that helped explain Venus’s greenhouse effect.",
      ],
      achievements: [
        "NASA says the Day Probe is the only NASA spacecraft to return data from the surface of Venus.",
        "It survived a hard landing that it was not designed for.",
      ],
      challenges: [
        "A landing at several times the speed a typical lander can tolerate.",
        "About 460 °C and 90 times Earth’s pressure.",
        "Instrument failures during the descent.",
      ],
      finalStatus:
        "Silent. Its battery ran out and temperatures inside rose, ending transmissions after 67 minutes and 37 seconds on the surface. It was not designed to survive landing.",
      currentLocation:
        "Surface of Venus, southern hemisphere, about 31–32° S, 317–318° E (the Dione Regio region).",
      significance:
        "An unplanned bonus mission. Its surface signal, though brief, was a remarkable accident of engineering. Venus’s surface has since defeated all landers within about two hours, and no US spacecraft has landed there since.",
    },
    timeline: [
      { date: "8 Aug 1978", title: "Launch", text: "The Multiprobe, carrying four probes, is launched toward Venus." },
      { date: "20 Nov 1978", title: "Release", text: "The three Small Probes separate from the bus." },
      { date: "9 Dec 1978", title: "Entry", text: "The Day Probe plunges into the atmosphere on the sunlit side." },
      { date: "9 Dec 1978", title: "Touchdown", text: "It lands in soft dust and, to everyone’s surprise, keeps transmitting." },
      { date: "9 Dec 1978", title: "Last words", text: "After 67 minutes 37 seconds on the surface, the signal stops." },
    ],
    narration: [
      { title: "The little probe that would not quit", text: "Venus is a world of crushing air and fierce heat. I am small, and I am not expected to survive for long. But I have one chance to send back a message from a place no human can visit. Will anyone hear me?", basis: "The Day Probe was designed to study Venus's atmosphere and unexpectedly continued transmitting after impact." },
      { title: "The little probe with a big job", text: "I am the Day Probe, one of three small explorers headed for Venus. I am about to fall through clouds no one has ever explored this way. Ready, instruments? Let's find out what is down there!", basis: "The Day Probe was one of three small probes, named Day, North, and Night." },
      { title: "Down through the clouds", text: "I fall without a parachute. Around me are thick clouds, and below me is a hidden surface. My instruments measure the air and send their readings as fast as they can.", basis: "The Small Probes descended for about 53–56 minutes and sent data during the fall." },
      { title: "A dusty landing", text: "I hit the ground, and dust puffs up around me. I am still working! I send a signal back through the clouds, even though no one expected me to keep going.", basis: "Documented: the impact raised dust detected by an instrument; the Day Probe continued transmitting after landing." },
      { title: "One more message", text: "Minute after minute, I send readings from the surface. I have been talking for more than an hour on a planet where machines do not last long. What a big adventure for a little probe!", basis: "The Day Probe transmitted from Venus's surface for 67 minutes and 37 seconds." },
      { title: "A record on Venus", text: "At last, my battery runs out and my signal ends. I stay on Venus, but my readings travel all the way to Earth and help people learn about this hot planet.", basis: "The probe's battery was exhausted, and it remains on the surface of Venus." },
    ],
    funFacts: [
      { front: "Surprise survivor", back: "NASA says the probes were not expected to survive impact. Of the three small probes, Day kept sending for more than an hour." },
      { front: "Why is this special?", back: "NASA says it remains the only NASA spacecraft to return data from the surface of Venus. Soviet Venera landers lasted longer and sent pictures." },
      { front: "How hot was it?", back: "The probe’s temperature sensor stopped about 12 km up, but the surface was around 460 °C." },
    ],
    references: [
      { label: "Pioneer Venus 2 (Multiprobe)", url: "https://science.nasa.gov/mission/pioneer-venus-2/", source: "NASA Science" },
      { label: "40 Years Ago, Pioneers Encounter Venus", url: "https://www.nasa.gov/history/40-years-ago-pioneers-encounter-venus/", source: "NASA History" },
      nssdc("1978-078D", "Pioneer Venus Day Probe — spacecraft record"),
    ],
  },

  /* ───────────────────────── MARS ───────────────────────── */
  {
    id: "sojourner-rover",
    destination: "mars",
    name: "Sojourner",
    officialName: "Sojourner — Mars Pathfinder Microrover",
    years: "1997",
    yearStart: 1997,
    tagline: "The first wheels to roll across Mars.",
    image: IMG.sojourner,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/PIA01551/PIA01551~orig.jpg",
        alt: "The Sojourner rover deployed on the surface of Mars",
        caption: "Sojourner rolls across the Martian surface during its Pathfinder mission.",
        credit: "NASA/JPL",
        source: "https://images.nasa.gov/details/PIA01551",
      },
    ],
    journeyPoem: {
      title: "Little Wheels on Mars",
      lines: [
        "A tiny rover, brave and bright,",
        "Rolled down a ramp into rusty light.",
        "A rock, a track, a brand-new view,",
        "Each little step taught something new.",
        "I showed the way across the sand,",
        "For bigger wheels to roam the land.",
      ],
    },
    model: "sojourner",
    status: "surface",
    statusNote: "Still on Mars beside the Pathfinder lander",
    stats: [
      { label: "Launched", value: "4 Dec 1996" },
      { label: "Landed", value: "4 Jul 1997" },
      { label: "Mass", value: "about 10.5 kg" },
      { label: "Lasted", value: "83 sols (plan: 7)" },
    ],
    facts: {
      mission:
        "Mars Pathfinder: a low-cost mission to demonstrate cheap landing technology and deliver a small rover, Sojourner, to the surface of Mars.",
      launchDate: "4 December 1996, on a Delta II rocket from Cape Canaveral.",
      purpose:
        "To prove that a small rover could drive on Mars, examine rocks and soil with its alpha-proton X-ray spectrometer, and send back images.",
      background:
        "Mars Pathfinder was an early “faster, better, cheaper” NASA/JPL mission. The rover was named after abolitionist Sojourner Truth through a student contest won by 12-year-old Valerie Ambroise.",
      journey:
        "After a seven-month cruise, Pathfinder entered the atmosphere on 4 July 1997 and landed with parachute, rockets and bouncing airbags in Ares Vallis, an ancient flood channel in Chryse Planitia. Sojourner rolled down a ramp two days later.",
      majorEvents: [
        "Airbag landing on 4 July 1997, bouncing across the surface.",
        "Sojourner drove onto Mars on 6 July.",
        "It analysed rocks nicknamed Barnacle Bill, Yogi and Scooby-Doo.",
        "It worked for 83 sols, almost twelve times longer than planned.",
        "The last data transmission from the Pathfinder lander came on 27 September 1997.",
      ],
      discoveries: [
        "Some rocks resembled andesite, hinting that Mars’s crust is more varied than expected.",
        "Rounded pebbles at the site suggested a long-ago flood of liquid water.",
        "Weather data, dust devils and the soil’s magnetic properties.",
      ],
      achievements: [
        "The first wheeled rover ever to operate on Mars.",
        "Pathfinder returned more than 16,500 lander images and 550 rover images, plus 15 chemical analyses of rocks and soil.",
        "Paved the way for later rovers: Spirit, Opportunity, Curiosity and Perseverance.",
      ],
      challenges: [
        "Controlled from Earth with a multi-minute signal delay, so the rover had to avoid hazards by itself.",
        "Temperature swings and battery limits.",
        "A very small rover, only 65 cm long, with a top speed of about 1 cm per second.",
      ],
      finalStatus:
        "Silent. The Pathfinder lander’s last transmission was on 27 September 1997, and the rover lost contact with it. Repeated attempts continued until March 1998.",
      currentLocation:
        "Ares Vallis, Chryse Planitia, Mars (about 19° N, 33° W), within tens of metres of the Carl Sagan Memorial Station, the Pathfinder lander.",
      significance:
        "Sojourner showed that rovers were a practical way to explore, and it was the first of a line of rovers that now includes Perseverance. A tiny rover began the era of exploring Mars on wheels.",
    },
    timeline: [
      { date: "4 Dec 1996", title: "Launch", text: "Mars Pathfinder and Sojourner leave Cape Canaveral on a Delta II rocket." },
      { date: "4 Jul 1997", title: "Airbag landing", text: "Pathfinder bounces to a stop in Ares Vallis." },
      { date: "6 Jul 1997", title: "First wheel-tracks", text: "Sojourner rolls down the ramp and onto the Martian soil." },
      { date: "Jul 1997", title: "Rock stars", text: "The rover tests rocks nicknamed Barnacle Bill and Yogi with its X-ray spectrometer." },
      { date: "Sep 1997", title: "Past the plan", text: "After 83 sols (the plan was 7), contact with the lander ends. The last Pathfinder transmission arrives on 27 September." },
      { date: "Mar 1998", title: "Closing the book", text: "Attempts to contact Pathfinder end." },
    ],
    narration: [
      { title: "A rover smaller than a microwave", text: "Imagine exploring a whole new planet in a machine you could almost carry in your arms. That is me, Sojourner. Mars is full of rocks, dust, and questions. My first roll off the ramp will begin a new way to explore.", basis: "Sojourner was about 65 cm long and became the first rover to operate on Mars." },
      { title: "A tiny rover rolls out", text: "I am no bigger than a microwave, and Mars is waiting! My six wheels roll down the lander's ramp. At last, I can explore the red planet one little drive at a time.", basis: "Sojourner was about 65 cm long, weighed about 10.5 kg, and drove off its lander's ramp on 6 July 1997." },
      { title: "Hello, rocks!", text: "Look at those rocks! The team gives them fun names like Barnacle Bill and Yogi. I touch them with my science tool and send clues about what they are made of back to Earth.", basis: "Sojourner's Alpha Proton X-ray Spectrometer studied rocks including Barnacle Bill and Yogi." },
      { title: "A team on Mars", text: "I do not travel far from my lander. It helps me send messages home, and I help it explore the ground nearby. Together, we learn about a place people have only seen from far away.", basis: "Sojourner communicated through its lander and operated within about 12 metres of it." },
      { title: "More days to explore", text: "My planned mission is just seven Martian days. But I keep rolling and working for 83! Each new day brings another rock, another picture, and another discovery.", basis: "Sojourner was planned for 7 sols and operated for 83 sols." },
      { title: "The first little rover", text: "One day, the messages from my lander stop. I stay on Mars, beside the place where my adventure began. I was small, but I helped show that a rover could explore another world.", basis: "The last Pathfinder transmission arrived on 27 September 1997; Sojourner remains at the site. The storytelling is imagined." },
    ],
    funFacts: [
      { front: "Who named it?", back: "Valerie Ambroise, a 12-year-old from Connecticut, won a NASA contest by proposing Sojourner Truth." },
      { front: "How fast did it go?", back: "At about 1 cm per second, it travelled around 100 m over its entire life." },
      { front: "The lander’s new name", back: "After Carl Sagan’s death in 1996, the lander was renamed the Carl Sagan Memorial Station." },
    ],
    references: [
      { label: "Mars Pathfinder mission", url: "https://science.nasa.gov/mission/mars-pathfinder/", source: "NASA Science" },
      nssdc("1996-068A", "Mars Pathfinder & Sojourner — spacecraft record"),
    ],
  },
  {
    id: "opportunity-rover",
    destination: "mars",
    name: "Opportunity",
    officialName: "Mars Exploration Rover B (MER-B) “Opportunity”",
    years: "2003",
    yearStart: 2003,
    tagline: "A 90-day mission that lasted nearly fifteen years.",
    image: IMG.opportunity,
    realPhotos: [
      {
        src: "https://images-assets.nasa.gov/image/PIA17941/PIA17941~medium.jpg",
        alt: "Opportunity rover and its tracks on Mars, seen from orbit",
        caption: "Opportunity and its tracks are visible from orbit on Murray Ridge.",
        credit: "NASA/JPL-Caltech/University of Arizona",
        source: "https://images.nasa.gov/details/PIA17941",
      },
    ],
    journeyPoem: {
      title: "Opportunity Keeps Going",
      lines: [
        "Ninety days was all they planned,",
        "But I kept rolling through the red sand.",
        "Past rocks and dunes, through sunlit skies,",
        "I searched for where old waters lie.",
        "The dust grew thick; my path grew still,",
        "Yet hope can travel farther than a wheel.",
      ],
    },
    model: "opportunity",
    status: "surface",
    statusNote: "Still on Mars in Perseverance Valley",
    stats: [
      { label: "Launched", value: "7 Jul 2003" },
      { label: "Landed", value: "25 Jan 2004" },
      { label: "Distance", value: "45.16 km" },
      { label: "Sols", value: "5,111" },
    ],
    facts: {
      mission:
        "Part of NASA’s Mars Exploration Rover mission, with its twin Spirit, to search for evidence of past water on Mars.",
      launchDate: "7 July 2003, on a Delta II Heavy rocket from Cape Canaveral.",
      purpose:
        "To study rocks and soil for signs that liquid water once existed on Mars, and whether the environment could have supported life.",
      background:
        "A pair of identical, golf-cart-sized rovers (about 185 kg each), each with solar panels, a mast camera, a robotic arm and tools to grind into rocks. The primary mission was planned to last 90 sols.",
      journey:
        "Opportunity landed at Meridiani Planum on 25 January 2004 (UTC), bouncing on airbags into the small Eagle crater. It later explored Endurance and Victoria craters and, from 2011, the rim of the huge Endeavour crater.",
      majorEvents: [
        "Landed inside Eagle crater, almost a “hole in one”.",
        "January 2005: found Heat Shield Rock, the first meteorite identified on another planet.",
        "Spring 2005: stuck in a sand ripple (Purgatory Dune) for several weeks before driving out.",
        "2006–2008: explored Victoria crater.",
        "August 2011: reached Endeavour crater.",
        "June 2018: a global dust storm blocked sunlight, and the last message was received on 10 June 2018.",
      ],
      discoveries: [
        "Tiny hematite “blueberries” and sulfate-rich rocks showing that salty, acidic water once soaked Meridiani Planum.",
        "Clay minerals on the Endeavour rim, a sign of a gentler, more neutral water environment in the ancient past.",
        "The first meteorite found on Mars.",
      ],
      achievements: [
        "Designed for 90 sols and operated for 5,111 sols, over 14 years.",
        "Drove 45.16 km (28.06 mi), more than a marathon, the longest distance driven on another world.",
        "Provided strong evidence that ancient Mars had wet, habitable environments.",
      ],
      challenges: [
        "Getting stuck in a sand trap.",
        "Aging hardware: stuck wheel joint, arm joint issues, and flash memory troubles.",
        "A planet-encircling dust storm in 2018 cut sunlight to its solar panels.",
      ],
      finalStatus:
        "Inactive. NASA lost contact in June 2018. After more than 1,000 attempts to reach it, the mission was declared complete on 13 February 2019.",
      currentLocation:
        "Perseverance Valley, on the western rim of Endeavour crater, Meridiani Planum, Mars.",
      significance:
        "Opportunity transformed our view of Mars as a world that once had liquid water, and it showed how a tough robot could outlast its mission by a factor of 50.",
    },
    timeline: [
      { date: "7 Jul 2003", title: "Launch", text: "Opportunity (MER-B) leaves Earth on a Delta II Heavy rocket." },
      { date: "25 Jan 2004", title: "Landing", text: "Airbags bounce the rover into Eagle crater on Meridiani Planum." },
      { date: "Jan 2005", title: "Heat Shield Rock", text: "The rover identifies the first meteorite found on another planet." },
      { date: "Apr–Jun 2005", title: "Stuck in the dune", text: "Wheels dig into Purgatory Dune, and engineers spend weeks freeing the rover." },
      { date: "Sep 2006", title: "Victoria crater", text: "Opportunity reaches the rim of a crater around 800 m wide." },
      { date: "Aug 2011", title: "Endeavour", text: "After a long drive, it arrives at the rim of a crater 22 km wide." },
      { date: "Jun 2018", title: "The great dust storm", text: "Skies darken. The last communication arrives on 10 June 2018." },
      { date: "13 Feb 2019", title: "Mission complete", text: "NASA declares the mission over after attempts to wake the rover fail." },
    ],
    narration: [
      { title: "The rover that kept going", text: "I was built for just 90 days on Mars. But what if a small rover could keep exploring for years? I am Opportunity, rolling into a dusty world with one bright question: did water ever flow here?", basis: "Opportunity's planned mission was 90 sols; it operated for more than 14 Earth years and investigated evidence of past water." },
      { title: "Bounce into adventure!", text: "I am falling toward Mars inside a big airbag. Boing! I bounce across the ground and come to rest in a small crater. My name is Opportunity, and this is only the beginning.", basis: "Opportunity landed inside Eagle crater in its airbag on 25 January 2004." },
      { title: "A clue from long ago", text: "I find tiny round rocks that look like blueberries. They are made of minerals that can form when water is around. Could this dry red world once have been wet? My pictures will help Earth find out.", basis: "Opportunity found hematite spherules and sulfate-rich rocks that point to past water." },
      { title: "Wheels in the sand", text: "Oh no! My wheels are stuck in a soft dune. I cannot move, so the team on Earth carefully plans each command. At last, I am free to roll again.", basis: "Opportunity became trapped at Purgatory Dune in 2005; engineers worked for weeks to free it." },
      { title: "A rover-sized marathon", text: "I keep travelling from crater to crater. My wheels roll more than 45 kilometres across Mars! That is farther than a marathon, even though I move very slowly.", basis: "Opportunity travelled 45.16 km and passed marathon distance in 2015." },
      { title: "A dusty sky", text: "A giant dust storm covers the sky, and sunlight can no longer reach my panels well. Earth sends messages, hoping I will answer. My last message came from Perseverance Valley. My long adventure is remembered.", basis: "Opportunity's last contact was on 10 June 2018; NASA declared the mission complete on 13 February 2019." },
    ],
    funFacts: [
      { front: "“My battery is low and it’s getting dark”", back: "This famous line was a poetic paraphrase by a reporter. What the rover actually sent was data showing low power and an extremely dusty sky." },
      { front: "How long did it last?", back: "5,111 sols. That is about 14 years and 138 Earth days, against a plan for 90 sols." },
      { front: "The first meteorite", back: "In January 2005 Opportunity identified the Heat Shield Rock as an iron-nickel meteorite, the first found on another planet." },
    ],
    references: [
      { label: "Mars Exploration Rovers: Spirit and Opportunity", url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/", source: "NASA Science" },
      nssdc("2003-032A", "Mars Exploration Rover B (Opportunity) — spacecraft record"),
    ],
  },
];
