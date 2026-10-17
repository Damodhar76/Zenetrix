import type { Faq } from './faqs'

// Long-form SEO copy for each service page: meta tags, intro, H2/H3 sections, FAQs. General explanations only:
// no prices, ratings, response-time promises or certificate numbers (Blueprint 9 / 13).
export type ServiceSeo = {
  title: string; description: string; keywords: string[]
  intro: string[]
  sections: { h: string; items: { h: string; p: string }[] }[]
  faqs: Faq[]
}

export const serviceSeo: Record<string, ServiceSeo> = {
  'automatic-gate-installation': {
    title: 'Automatic Gate Installation in Hyderabad',
    description: 'Automatic gate and door installation in Hyderabad: site survey, sliding and swing gates, boom barriers, doors and shutters. Free site visit, written quote.',
    keywords: ['automatic gate installation Hyderabad', 'sliding gate installation Hyderabad', 'swing gate automation Hyderabad', 'automatic door installation Hyderabad', 'gate automation company Hyderabad'],
    intro: [
      'Zenitrix Technologies supplies and installs automatic gates, automatic doors, boom barriers, rolling shutters, sectional doors and dock equipment for homes, communities, offices and factories across Hyderabad and Secunderabad. Every job starts with a free site visit, so the product, motor size and safety devices are chosen for your opening and not guessed from a brochure.',
      'A good installation is more than a motor on a gate. The gate must be straight and balanced, the power and earthing must be right, the safety sensors must be set, and the owner must know how to use the manual release. Our team handles each of these steps and hands the system over with training.',
    ],
    sections: [{
      h: 'How an automatic gate installation works',
      items: [
        { h: 'Site survey and measurement', p: 'We check gate weight, width, ground level, side space for a sliding gate, hinge posts for a swing gate, the power point and the traffic through the day. This decides the operator type and the accessories.' },
        { h: 'Product selection and written quote', p: 'You receive a written quote that names the product, the controller, the safety devices and what civil work is needed. Nothing is added later without telling you.' },
        { h: 'Civil and electrical preparation', p: 'Foundation plates, rack tracks, cable ducts and a dedicated supply are prepared. Doing this properly is what keeps a gate smooth for years.' },
        { h: 'Installation, safety setting and testing', p: 'The operator and controller are fitted, limit positions and force are set, photocells and safety edges are tested, and the gate is run through repeated cycles before handover.' },
        { h: 'Training and handover', p: 'We show every user how to use remotes, keypads, the phone app and the manual release, and explain what to do during a power cut.' },
      ],
    }, {
      h: 'What we install',
      items: [
        { h: 'Sliding and swing gates', p: 'Motorised sliding gates suit wide compounds, while swing gates keep a traditional look on villa entrances. Both can use remotes, keypads, RFID and a mobile app.' },
        { h: 'Automatic doors, boom barriers and shutters', p: 'Sensor-driven glass doors, boom barriers with access control, rolling shutters, sectional garage doors and high-speed industrial doors are available as separate product families.' },
        { h: 'Dock levellers and shelters', p: 'For warehouses and factories we supply dock equipment that makes truck loading safer and faster.' },
      ],
    }],
    faqs: [
      { q: 'How long does an automatic gate installation take?', a: 'A typical gate is installed in one to three days once the site is ready. Civil preparation, gate repair or special accessories can add time, and we confirm the schedule in your quote.' },
      { q: 'Do I need to change my existing gate?', a: 'Often not. If the gate is straight, balanced and moves freely, it can usually be automated. We check this during the site visit.' },
      { q: 'Will the gate work during a power cut?', a: 'Yes, every operator has a manual release, and battery backup can be added so the gate keeps running for a limited number of cycles.' },
      { q: 'Which safety devices are fitted?', a: 'Photocells, safety edges and a warning lamp are the usual set. We recommend them for every gate that vehicles or people pass through.' },
      { q: 'Do you install for apartments and companies?', a: 'Yes. We handle villas, gated communities, offices, hospitals, hotels, warehouses and factories, and can supply the documents a committee or purchase team asks for.' },
    ],
  },
  'automatic-gate-repair': {
    title: 'Automatic Gate and Door Repair in Hyderabad',
    description: 'Automatic gate, door, barrier and shutter repair in Hyderabad for any brand. Motors, controllers, remotes, tracks and sensors. Call or WhatsApp Zenitrix.',
    keywords: ['automatic gate repair Hyderabad', 'sliding gate motor repair Hyderabad', 'gate remote not working', 'automatic door repair Hyderabad', 'boom barrier repair Hyderabad'],
    intro: [
      'When a gate stops halfway, a motor hums but does not move, or the remote stops working, you need a technician who can diagnose the fault quickly. Zenitrix repairs automatic gates, doors, boom barriers and shutters from any brand, including systems installed by other companies that no longer respond.',
      'We look for the cause, not only the symptom. A gate that keeps tripping may have a worn track, a weak capacitor, a mis-set force limit or a misaligned sensor, and fixing only one of these brings the fault back.',
    ],
    sections: [{
      h: 'Common faults we repair',
      items: [
        { h: 'Gate not opening or closing', p: 'Causes include a failed controller, a dead capacitor, a burnt motor, a jammed track or a tripped safety device. We test each in order and fix the real cause.' },
        { h: 'Remote or keypad not working', p: 'Weak batteries, lost codes, a faulty receiver or a damaged antenna are the usual reasons. We reprogram or replace remotes and keypads.' },
        { h: 'Gate stops or reverses by itself', p: 'This is normally the safety system doing its job: dirty photocells, a loose safety edge or incorrect force settings. We clean, realign and re-tune them.' },
        { h: 'Noise, shaking and uneven movement', p: 'Worn rollers, a dry rack, loose pinions or a bent gate leaf cause rough movement. Lubrication and alignment usually restore smooth operation.' },
        { h: 'Doors, barriers and shutters', p: 'Sliding door sensors and belts, boom barrier springs and arms, and shutter motors and guides are all repaired.' },
      ],
    }],
    faqs: [
      { q: 'Can you repair a gate that another company installed?', a: 'Yes. We repair systems from any brand, subject to parts being available. If a part is discontinued we suggest a compatible replacement.' },
      { q: 'My gate remote stopped working. What should I check first?', a: 'Replace the remote battery and check whether other remotes work. If none do, the receiver or controller may be at fault and needs a technician.' },
      { q: 'Is it safe to push my gate by hand when it fails?', a: 'Use the manual release key as shown in the manual, and switch off the power first. Do not force a gate that is still connected to the motor.' },
      { q: 'Should I repair or replace my old gate motor?', a: 'If the gate and track are sound and parts are available, repair is usually reasonable. If the motor is undersized or the controller is obsolete, replacement can be the better choice, and we explain both options.' },
      { q: 'Can an AMC reduce breakdowns?', a: 'Yes. Scheduled servicing finds worn parts, dirty sensors and loose fittings before they stop the gate. See our AMC page for how it works.' },
    ],
  },
  amc: {
    title: 'Gate and Door AMC in Hyderabad',
    description: 'Annual Maintenance Contract for automatic gates, doors, boom barriers and shutters in Hyderabad. Scheduled servicing, safety checks and priority support.',
    keywords: ['gate AMC Hyderabad', 'automatic door AMC Hyderabad', 'boom barrier maintenance Hyderabad', 'annual maintenance contract gates', 'automatic gate servicing Hyderabad'],
    intro: [
      'An Annual Maintenance Contract keeps your automatic gates, doors and barriers safe, quiet and reliable. Instead of waiting for a breakdown, a technician visits on a schedule, inspects each part, tests the safety devices and fixes small problems before they become big ones.',
      'Zenitrix offers AMC for systems we install and for systems from other brands. Visit frequency, parts cover and response terms are set per site and confirmed in writing after a free site visit.',
    ],
    sections: [{
      h: 'What a maintenance visit covers',
      items: [
        { h: 'Mechanical checks', p: 'Rollers, tracks, racks, hinges, springs, belts and guides are cleaned, lubricated and adjusted.' },
        { h: 'Electrical and control checks', p: 'Controllers, motors, capacitors, limit switches, batteries and wiring are inspected and tested.' },
        { h: 'Safety device testing', p: 'Photocells, safety edges, loops, emergency stops and warning lamps are tested because these protect people and vehicles.' },
        { h: 'Settings and remotes', p: 'Force, speed and stop positions are checked, and remote and card lists are cleaned up.' },
        { h: 'Service report', p: 'You receive a record of what was checked and what needs attention, which also helps with audits and insurance.' },
      ],
    }, {
      h: 'Who benefits most from an AMC',
      items: [
        { h: 'Gated communities and apartments', p: 'Gates run hundreds of cycles a day, so regular servicing prevents queues and safety incidents.' },
        { h: 'Offices, hospitals and hotels', p: 'Automatic doors and barriers at busy entries must work every time, and a planned service keeps them that way.' },
        { h: 'Factories and warehouses', p: 'Shutters, high-speed doors and dock equipment work in dust and heavy traffic and need regular care.' },
      ],
    }],
    faqs: [
      { q: 'What is included in a gate AMC?', a: 'Scheduled inspection, lubrication, safety device testing, settings checks and a service report. Parts and breakdown cover are agreed in the contract.' },
      { q: 'How often are AMC visits done?', a: 'It depends on usage. A busy community gate may need more frequent visits than a villa gate, and we propose a schedule after the site visit.' },
      { q: 'Can I take an AMC for gates installed by another company?', a: 'Yes. We inspect the system first and then confirm what the AMC covers.' },
      { q: 'Does AMC include spare parts?', a: 'Plans can be labour-only or include selected parts. The contract states clearly what is covered.' },
      { q: 'Is AMC worth it for a single villa gate?', a: 'A light yearly service is often enough to keep a villa gate reliable and safe, and it extends the life of the motor.' },
    ],
  },
  'convert-manual-gate-to-automatic': {
    title: 'Convert Manual Gate to Automatic in Hyderabad',
    description: 'Convert your manual sliding or swing gate to automatic in Hyderabad. Gate survey, operator, remote and safety sensors. Free site visit by Zenitrix.',
    keywords: ['convert manual gate to automatic Hyderabad', 'retrofit gate automation', 'automate existing gate Hyderabad', 'manual to automatic sliding gate', 'gate motor installation existing gate'],
    intro: [
      'Most manual sliding and swing gates can be made automatic without replacing the gate. A motor, a controller, a set of safety devices and some preparation work turn the gate into one that opens from the car, a phone or a card.',
      'The key question is whether the existing gate is fit to be motorised. A heavy, bent or sticking gate will wear out any motor, so we check it first and recommend repairs where needed.',
    ],
    sections: [{
      h: 'What we check before converting a gate',
      items: [
        { h: 'Weight, balance and movement', p: 'The gate should move freely by hand. If you need force to push it, the track, rollers or hinges need work before a motor is fitted.' },
        { h: 'Space and structure', p: 'A sliding gate needs clear space beside the opening, and a swing gate needs strong posts and room for the leaves to open.' },
        { h: 'Power and cabling', p: 'We plan a safe supply, earthing and cable route to the operator and the safety devices.' },
        { h: 'Users and access', p: 'We count how many people use the gate and choose remotes, keypads, RFID or a phone app to suit.' },
      ],
    }, {
      h: 'Benefits of retrofitting',
      items: [
        { h: 'Convenience and safety', p: 'You open the gate from inside the car, which is safer at night and in the rain.' },
        { h: 'Security', p: 'An automatic gate closes behind you, so it is not left open by mistake.' },
        { h: 'Cost control', p: 'Reusing a sound gate avoids the cost of a new one. We explain the options in the written quote.' },
      ],
    }],
    faqs: [
      { q: 'Can any manual gate be automated?', a: 'Most can, if the gate is straight, balanced and in good condition. We check this during the site visit and tell you if repairs are needed first.' },
      { q: 'Will automation damage my old gate?', a: 'No, if the gate is sound and the operator is fitted correctly. A poorly maintained gate should be repaired first.' },
      { q: 'Can I still open the gate by hand?', a: 'Yes. Every operator has a manual release for power cuts or emergencies.' },
      { q: 'How long does the conversion take?', a: 'Often one to two days once preparation is done. We confirm timing in the quote.' },
      { q: 'Can I add a mobile app later?', a: 'In many cases yes, if the controller supports a Wi-Fi or GSM module. Tell us the controller you have or plan to buy.' },
    ],
  },
  'smart-control': {
    title: 'Smart Gate Control: Mobile App and Smartwatch',
    description: 'Smart control for gates, doors and barriers in Hyderabad: mobile app, smartwatch, remote and voice assistants. Open from anywhere. Ask Zenitrix.',
    keywords: ['smart gate control Hyderabad', 'mobile app gate opener', 'smartwatch gate control', 'gate automation app', 'voice control gate opener'],
    intro: [
      'Smart control lets you open and close gates, doors and barriers from a phone, a smartwatch, a remote or a voice assistant. Guests, delivery staff and family can be given access without sharing a key, and you can see who entered and when.',
      'Final options depend on the controller supplied, so we match the smart features to the gate and the way you use it.',
    ],
    sections: [{
      h: 'Smart control options',
      items: [
        { h: 'Mobile app', p: 'Open the gate from anywhere through Wi-Fi, GSM or Bluetooth controllers, with user and schedule management.' },
        { h: 'Smartwatch', p: 'Where the app supports it, a watch button opens the gate without taking out your phone.' },
        { h: 'Voice assistants', p: 'Compatible controllers can be linked to common voice assistants for hands-free commands.' },
        { h: 'Remotes, keypads and RFID', p: 'Traditional controls remain available as a backup to the app.' },
      ],
    }, {
      h: 'Things to plan for',
      items: [
        { h: 'Connectivity', p: 'A stable Wi-Fi or mobile signal at the gate matters for remote control.' },
        { h: 'Security of access', p: 'Use strong passwords and remove access for people who no longer need it.' },
        { h: 'Backup', p: 'Keep a remote or manual release available for power or network failure.' },
      ],
    }],
    faqs: [
      { q: 'Can I open my gate from anywhere with my phone?', a: 'Yes, if the controller has a Wi-Fi or GSM module and the gate has a stable connection.' },
      { q: 'Does smartwatch control work with every gate?', a: 'No. It depends on the app and controller. We confirm support before you buy.' },
      { q: 'Can I give guests temporary access?', a: 'Many apps let you add users and set time limits. Features vary by controller.' },
      { q: 'Will the gate work if the internet is down?', a: 'Yes. Remotes, keypads and the manual release continue to work.' },
      { q: 'Can I add smart control to an existing gate?', a: 'Often yes, if the controller can accept a smart module or can be upgraded.' },
    ],
  },
  'access-control': {
    title: 'Gate Access Control Systems in Hyderabad',
    description: 'Access control for gates, doors and barriers in Hyderabad: RFID cards, UHF tags, ANPR cameras, keypads and biometrics. Free site visit from Zenitrix.',
    keywords: ['gate access control system Hyderabad', 'RFID access control Hyderabad', 'UHF RFID boom barrier', 'ANPR gate Hyderabad', 'biometric door access Hyderabad'],
    intro: [
      'Access control decides who can open a gate, door or barrier and keeps a record of entries. It suits gated communities, offices, factories, hospitals and parking areas where many users share an entry.',
      'Zenitrix integrates RFID cards, long-range UHF tags, ANPR cameras, keypads, intercoms and biometric readers with gates, boom barriers and speed gates.',
    ],
    sections: [{
      h: 'Access control options',
      items: [
        { h: 'RFID cards and tags', p: 'A card, tag or sticker is read at the entry. Long-range UHF tags let vehicles enter without stopping.' },
        { h: 'ANPR cameras', p: 'Cameras read number plates and open the barrier for authorised vehicles.' },
        { h: 'Keypads and intercoms', p: 'Codes and intercom links suit small sites and visitor entries.' },
        { h: 'Biometric readers', p: 'Fingerprint or face readers suit staff doors where cards could be shared.' },
        { h: 'Entry logs and user management', p: 'Add or remove users and review entry records when needed.' },
      ],
    }],
    faqs: [
      { q: 'What is the best access control for a gated community?', a: 'UHF RFID tags for residents and a visitor process at the gate are common. The right mix depends on traffic and the committee rules.' },
      { q: 'Can access control work with my existing gate?', a: 'Often yes, if the controller accepts a standard access input. Share the make and model for a check.' },
      { q: 'How does ANPR work?', a: 'A camera reads the number plate and compares it with an authorised list before opening the barrier.' },
      { q: 'Are biometric readers reliable outdoors?', a: 'They are better suited to covered entries. Outdoor use needs a suitable weather rating.' },
      { q: 'Can I see who entered and when?', a: 'Yes, systems that keep logs let you review entries.' },
    ],
  },
  'safety-devices': {
    title: 'Gate Safety Devices: Photocells, Loops, Edges',
    description: 'Gate and barrier safety devices in Hyderabad: photocells, safety edges, loop detectors and warning lamps. Install or upgrade with Zenitrix Technologies.',
    keywords: ['gate safety sensors Hyderabad', 'photocell sensor automatic gate', 'safety edge gate', 'loop detector gate', 'automatic gate safety devices'],
    intro: [
      'Safety devices protect people, children, pets and vehicles around automatic gates and doors. A gate without them can cause serious injuries, so they should be part of every installation, including older gates that were fitted without them.',
      'Zenitrix installs, tests and upgrades photocells, safety edges, loop detectors, warning lamps and emergency stops on gates, barriers and doors.',
    ],
    sections: [{
      h: 'Safety devices we fit',
      items: [
        { h: 'Photocells', p: 'An invisible beam across the opening stops or reverses the gate if something blocks it.' },
        { h: 'Safety edges', p: 'A soft edge on the gate leaf senses contact and stops the movement.' },
        { h: 'Loop detectors', p: 'A loop in the ground detects a vehicle and keeps the gate or barrier from closing on it.' },
        { h: 'Warning lamps and signs', p: 'A flashing lamp and clear signs warn that the gate is about to move.' },
        { h: 'Emergency stop and manual release', p: 'Allow quick shut-off and hand operation in an emergency.' },
      ],
    }],
    faqs: [
      { q: 'Are photocells necessary on a sliding gate?', a: 'They are strongly recommended, along with safety edges, so the gate stops when something is in its path.' },
      { q: 'Why does my gate keep reversing?', a: 'Dirty or misaligned photocells and loose edges are common causes. A technician can clean and realign them.' },
      { q: 'Can I add safety devices to an old gate?', a: 'Usually yes, if the controller has inputs for them. We check this on site.' },
      { q: 'How often should safety devices be tested?', a: 'Regularly, and always during servicing. An AMC schedules this.' },
      { q: 'Do loop detectors suit all gates?', a: 'They suit vehicle gates and barriers where a loop can be cut into the ground.' },
    ],
  },
  'spare-parts': {
    title: 'Gate Motor Spare Parts in Hyderabad',
    description: 'Spare parts for automatic gates, doors and barriers in Hyderabad: motors, controllers, remotes, racks, rollers and sensors. Ask Zenitrix for the right part.',
    keywords: ['gate motor spare parts Hyderabad', 'sliding gate controller replacement', 'gate remote control replacement', 'boom barrier spare parts', 'gate rack and pinion Hyderabad'],
    intro: [
      'Finding the right part for an automatic gate or door is hard when the model is old or the original installer is not available. Zenitrix supplies and fits motors, controllers, remotes, racks, pinions, rollers, sensors and other parts for gates, doors, barriers and shutters.',
      'Send us a photo of the part or the nameplate and we will confirm a match or suggest a compatible replacement.',
    ],
    sections: [{
      h: 'Parts we supply',
      items: [
        { h: 'Motors and controllers', p: 'Operators and control boards for sliding and swing gates, doors and barriers.' },
        { h: 'Remotes, receivers and keypads', p: 'Replacement and additional remotes, receivers and codes.' },
        { h: 'Racks, pinions, rollers and tracks', p: 'Mechanical parts that wear with daily use and should be replaced before they damage the motor.' },
        { h: 'Sensors and safety devices', p: 'Photocells, edges and loops to replace failed units.' },
      ],
    }],
    faqs: [
      { q: 'Can you find parts for an old gate motor?', a: 'Often yes. If the original part is discontinued, we suggest a compatible replacement.' },
      { q: 'How do I identify the part I need?', a: 'Send a photo of the part or the nameplate on WhatsApp, along with the gate type and brand.' },
      { q: 'Do you fit the parts as well?', a: 'Yes, a technician can fit and test them, so the gate works safely.' },
      { q: 'Can I buy remotes for my existing gate?', a: 'Yes, if they are compatible with your receiver. We confirm compatibility first.' },
      { q: 'Do replaced parts come with a warranty?', a: 'Warranty terms are given in your written quote.' },
    ],
  },
}
