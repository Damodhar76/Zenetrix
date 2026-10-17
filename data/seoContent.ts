import type { Faq } from './faqs'

// Long-form, keyword-rich copy for the home and videos pages. No prices, ratings or unverifiable claims (Blueprint 13).
export const homeSeo: { h: string; p: string[] }[] = [
  {
    h: 'Automatic gate and door company in Hyderabad',
    p: [
      'Zenitrix Technologies supplies, installs, repairs and services automatic gates, automatic doors, boom barriers, speed gates, garage doors, rolling shutters, sectional doors, high-speed doors and dock equipment across Hyderabad and Secunderabad. Whether you own a villa in Jubilee Hills, manage an apartment community in Gachibowli, run a warehouse near Medchal or look after an IT park in Madhapur, one team surveys the site, recommends the right hardware, installs it and keeps it running.',
      'Most customers contact us for one of three reasons: they want to automate a manual gate or shutter, they are building a new entrance and want it done properly the first time, or an existing gate or door has stopped working and the original installer is not responding. We handle all three, including repair of systems installed by other companies.',
    ],
  },
  {
    h: 'Sliding gate and swing gate automation for villas and communities',
    p: [
      'Sliding gate automation suits compounds where the gate can roll sideways along a wall, and is the usual choice for villas, farm houses and factories with wide vehicle entries. Swing gate automation suits entrances where leaves open inwards or outwards on hinges, and works well on narrower driveways and decorative gates. The right motor depends on gate weight, width, how many times a day it runs, and whether it faces wind. A short site visit settles this before any quote is given.',
      'Both gate types can be fitted with remote controls, keypads, RFID cards, mobile app control, intercom integration, photo-cell safety sensors, warning lamps and battery backup so the gate keeps working during a power cut. Our gate automation pages explain each option in plain language so you can compare before you call.',
    ],
  },
  {
    h: 'Boom barriers, speed gates and RFID access control',
    p: [
      'Boom barriers manage vehicle entry at apartment gates, offices, hospitals, parking lots and industrial campuses. Straight-arm, folding-arm and telescopic arm barriers cover different lane widths and headroom limits. For pedestrian entry, flap barriers and glass speed gates with RFID or QR readers reduce tailgating in office lobbies and make entry smooth for staff and visitors.',
      'UHF long-range RFID readers let resident and staff vehicles pass without stopping, while visitor vehicles are handled by the security desk. Access control can be linked to attendance, visitor management and CCTV where the site needs it.',
    ],
  },
  {
    h: 'Automatic doors, glass doors, garage doors, shutters and sectional doors',
    p: [
      'Automatic sliding glass doors suit hotels, hospitals, showrooms, banks and offices where hands-free entry matters. Sensors detect approaching visitors, open the leaves smoothly and close them again to save air-conditioning. Rolling shutters remain the most economical security option for shops, godowns and workshops, and can be motorised so they open at the press of a button. Garage doors provide a clean, secure vehicle entrance for villas and private parking areas, while sectional doors are suited to larger residential, commercial and industrial openings where controlled movement, durability and a professional finish matter.',
      'For logistics and manufacturing, high-speed doors keep traffic moving and reduce dust and temperature loss, while dock levellers and dock shelters make truck loading faster and safer. Each product page lists the types available, typical uses and the questions to ask before buying.',
    ],
  },
  {
    h: 'Repair, AMC and spare parts across Hyderabad',
    p: [
      'A gate that is stuck, a motor that hums but does not move, a remote that has stopped responding or a shutter that jams halfway are common calls for us. Send a photo or short video on WhatsApp and we can usually suggest the likely fault before a technician visits. Annual maintenance contracts (AMC) cover scheduled servicing, lubrication, alignment checks, sensor testing and priority response so breakdowns stay rare and equipment lasts longer.',
      'We also supply spare parts such as remotes, receivers, control boards, limit switches, safety sensors, racks, rollers and batteries for popular brands.',
    ],
  },
  {
    h: 'How to choose the right automation',
    p: [
      'Start with the opening: its width, the available side space or headroom, the weight of the gate or door and how many vehicles or people pass each day. Then decide how it should be controlled: remote, keypad, RFID, mobile app or integration with intercom and security systems. Finally, think about safety and power: sensors, emergency manual release and battery backup. Our Which Automation? tool and Cost Estimator page walk through these questions, and our team confirms the answer at a free site visit.',
    ],
  },
]

export const videoFaqs: Faq[] = [
  { q: 'Are these videos of real Zenitrix installations?', a: 'The clips on this page are sample footage that shows how each type of automatic gate, door, barrier or shutter behaves. Real project photos and videos are added to our projects pages with the owner\'s permission.' },
  { q: 'How does an automatic sliding gate know when to open and close?', a: 'The gate controller receives a command from a remote, keypad, RFID reader, mobile app or intercom and drives the motor. Photo-cell sensors stop and reverse the gate if a person or vehicle is in its path, and it can close automatically after a set time.' },
  { q: 'What makes a boom barrier different from a gate?', a: 'A boom barrier uses a lifting arm to control vehicles in a lane. It is faster than a gate, suits busy entries such as apartments, offices and parking, and is paired with RFID or ticketing systems for access control.' },
  { q: 'Why do offices use speed gates in the lobby?', a: 'Speed gates let authorised staff pass quickly with a card or QR code while blocking tailgaters. They are quieter and more elegant than turnstiles and look good in glass and marble lobbies.' },
  { q: 'Do automatic sliding glass doors work during a power cut?', a: 'Systems with battery backup or manual release keep the door usable. We confirm the right fail-safe option for each site.' },
  { q: 'Can a rolling shutter be motorised later?', a: 'In most cases yes. A motor and controller can be fitted to an existing shutter after checking the drum, guides and spring balance.' },
  { q: 'How do I get a quote for a gate or door shown in these videos?', a: 'Call or WhatsApp +91 85006 32002 or use the contact form. We arrange a free site visit in Hyderabad, check measurements and share a written quote.' },
]

export const videosSeo: { h: string; p: string }[] = [
  { h: 'What you will see in these videos', p: 'Each clip shows one product doing its everyday job: a motorised sliding gate letting an SUV into a villa, a boom barrier lifting at a gated community entry, RFID speed gates in a corporate lobby, an automatic glass door opening for a visitor, a sectional garage door rising and a rolling shutter opening a shop front. Watching the movement helps you judge speed, noise and how much space each system needs.' },
  { h: 'How to use video when choosing automation', p: 'Notice how much clearance the gate needs when it opens, whether a sensor is visible, and how quickly the system reacts. Compare that with your own entrance, then browse the product page for the matching hardware, specifications and typical uses in Hyderabad.' },
  { h: 'Want the same at your property?', p: 'Zenitrix supplies and installs all the products shown here across Hyderabad and Secunderabad, with repair and AMC after installation. Book a free site visit and we will recommend the right system for your gate, door or shutter.' },
]
