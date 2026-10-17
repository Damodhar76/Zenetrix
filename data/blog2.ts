import type { Post } from './blog'

// Second batch of evergreen guides (Blueprint 10.2). General explanations only: no prices, ratings, specs or certification claims.
// Client should review each post for technical accuracy before publishing (Blueprint 15).
const D = '2026-10-02'
export const morePosts: Post[] = [
  {
    slug: 'what-affects-gate-automation-cost', title: 'What Affects the Cost of Gate Automation?', updated: D, read: '4 min',
    description: 'The factors that change the price of automating a gate: size, weight, usage, controls, safety devices and site works.',
    sections: [
      { h: 'Size and weight', p: ['A wider or heavier gate needs a stronger operator and sturdier hardware. Two gates of the same width can still need different motors if one is solid steel and the other is light aluminium.'] },
      { h: 'How often it is used', p: ['A home gate opens a few times a day. A community entrance may open hundreds of times. Operators are built for different duty levels, so heavy use usually means a more robust unit.'] },
      { h: 'Controls and safety', p: ['Remotes, a phone app, RFID cards, keypads and camera-based access each need compatible controllers. Safety devices such as photocells and safety edges are part of a proper job and are worth including.'] },
      { h: 'Site works', p: ['Civil work, new foundations, electrical cabling and gate fabrication change the scope. A site visit shows what is needed, so the quote is one clear number rather than a guess.'] },
    ],
    links: [{ name: 'Cost factors tool', href: '/cost-estimator/' }, { name: 'Gate installation', href: '/services/automatic-gate-installation/' }],
  },
  {
    slug: 'how-boom-barriers-work', title: 'How Boom Barriers Work', updated: D, read: '3 min',
    description: 'A simple explanation of boom barrier parts, how the arm lifts, and how access control and loops fit in.',
    sections: [
      { h: 'The main parts', p: ['A boom barrier has a housing with a motor and gearbox, a pivoting arm, a controller and safety devices. The motor turns the arm up and down through a balance mechanism so the movement is smooth.'] },
      { h: 'Who triggers it', p: ['The barrier can be triggered by a guard, a remote, a card or tag reader, a ticket machine or a camera. Vehicle loops in the road tell the controller that a car is under the arm.'] },
      { h: 'Arm styles', p: ['Straight arms suit standard lanes. Folding and telescopic arms help where height or width is limited. Fence-style arms keep the opening closed to pedestrians as well.'] },
    ],
    links: [{ name: 'Boom barriers', href: '/products/boom-barriers/' }, { name: 'Access control', href: '/services/access-control/' }],
  },
  {
    slug: 'rolling-shutter-maintenance-tips', title: 'Rolling Shutter Maintenance Tips', updated: D, read: '3 min',
    description: 'Simple care steps that help a rolling shutter run smoothly and last longer, and when to call a technician.',
    sections: [
      { h: 'Keep the guides clean', p: ['Dust and grit in the side guides make the shutter noisy and slow. Wipe the guides regularly and remove anything stuck in the track.'] },
      { h: 'Watch for early signs', p: ['Scraping sounds, uneven travel, a slat that sticks out or a motor that strains are early warnings. Stop using the shutter if it moves unevenly and ask for an inspection.'] },
      { h: 'Leave springs and motors to a technician', p: ['Springs and drives are under load. Do not adjust them yourself. A planned service visit is safer and often cheaper than a breakdown during business hours.'] },
    ],
    links: [{ name: 'Rolling shutters', href: '/products/rolling-shutters/' }, { name: 'AMC plans', href: '/services/amc/' }],
  },
  {
    slug: 'choosing-a-sectional-garage-door', title: 'Choosing a Sectional Garage Door', updated: D, read: '4 min',
    description: 'How to choose a sectional garage door: panel style, finish, glass, insulation, safety and opening space.',
    sections: [
      { h: 'Panel style and finish', p: ['Solid panels give privacy and a clean look. Wooden-finish panels suit warm designs. Full-vision glass lets in light and shows off a modern home.'] },
      { h: 'Space and headroom', p: ['A sectional door lifts along tracks, so check the headroom above the opening and the space on each side. A site visit confirms what fits.'] },
      { h: 'Safety and daily use', p: ['Look for safety features that stop the door if something is in the way and a manual release for power cuts. Ask how the door will be serviced.'] },
    ],
    links: [{ name: 'Sectional doors', href: '/products/sectional-doors/' }, { name: 'Compare shutters and sectional doors', href: '/compare/rolling-shutter-vs-sectional-door/' }],
  },
  {
    slug: 'automatic-gate-not-opening-what-to-check', title: 'Automatic Gate Not Opening: What to Check', updated: D, read: '3 min',
    description: 'A safe first checklist when an automatic gate will not open, and when to call a technician.',
    sections: [
      { h: 'Quick safe checks', p: ['Check that the gate has power and that the remote battery is fine. Look for an object blocking the track or the beam of the photocells. Wipe the photocell lenses.'] },
      { h: 'Use the manual release', p: ['If the gate must be opened now, use the manual release described in your handover instructions, then close and lock the release after use.'] },
      { h: 'When to call', p: ['If the motor hums but the gate does not move, the gate moves unevenly or the controller shows a fault, stop and call a technician. Do not open the operator housing yourself.'] },
    ],
    links: [{ name: 'Repair and servicing', href: '/services/automatic-gate-repair/' }, { name: 'Safety devices', href: '/services/safety-devices/' }],
  },
  {
    slug: 'prepare-your-site-for-gate-automation', title: 'How to Prepare Your Site for Gate Automation', updated: D, read: '3 min',
    description: 'What to check before an installation visit: gate condition, space, power, access and decisions to make.',
    sections: [
      { h: 'The gate itself', p: ['A gate that is bent, rubbing or hard to push by hand needs repair before automation. Automating a stiff gate wears out the operator early.'] },
      { h: 'Space and power', p: ['Sliding gates need clear space along the fence for the leaf to travel. Operators need a power point nearby, and long cable runs may need extra work.'] },
      { h: 'Decide how you want to use it', p: ['Think about who uses the gate, whether you want a phone app or cards, and whether you need a pedestrian opening. Sharing this early gives a better quote.'] },
    ],
    links: [{ name: 'Convert a manual gate', href: '/services/convert-manual-gate-to-automatic/' }, { name: 'Sliding gates', href: '/products/gate-automation/sliding-gate-automation/' }],
  },
  {
    slug: 'access-control-options-for-gates', title: 'Access Control Options for Gates and Barriers', updated: D, read: '4 min',
    description: 'Remote, keypad, RFID, phone app and camera-based access: what each does and where each fits.',
    sections: [
      { h: 'Remotes and keypads', p: ['Remotes are simple for homes. Keypads suit visitors and staff who share a code, though codes should be changed from time to time.'] },
      { h: 'Cards, tags and apps', p: ['RFID cards and tags suit communities and offices because access can be added or removed per person. Phone apps add remote control and shared access where the controller supports them.'] },
      { h: 'Cameras and number plates', p: ['Camera-based systems read number plates for vehicle entry at busy sites. They need good placement and lighting and are chosen for larger projects.'] },
    ],
    links: [{ name: 'Access control', href: '/services/access-control/' }, { name: 'Smart control', href: '/services/smart-control/' }],
  },
  {
    slug: 'how-automatic-glass-door-sensors-work', title: 'How Automatic Glass Door Sensors Work', updated: D, read: '3 min',
    description: 'Motion sensors, presence sensors and safety beams on automatic sliding doors, explained simply.',
    sections: [
      { h: 'Detecting people', p: ['A sensor above the door detects movement as someone approaches and tells the controller to open. Settings control how wide the detection zone is and how long the door stays open.'] },
      { h: 'Staying safe', p: ['Presence sensors and safety beams stop the door from closing on a person or an object. They are checked regularly as part of servicing.'] },
      { h: 'Power cuts and emergencies', p: ['Doors should open by hand or by battery in a power cut. Ask how this works for your building and keep exit routes clear.'] },
    ],
    links: [{ name: 'Sliding glass doors', href: '/products/automatic-doors/sliding-glass-doors/' }, { name: 'Safety devices', href: '/services/safety-devices/' }],
  },
  {
    slug: 'when-to-use-high-speed-doors', title: 'When to Use High-Speed Doors', updated: D, read: '3 min',
    description: 'Where high-speed doors help: busy openings, temperature control, cleanliness and traffic flow.',
    sections: [
      { h: 'Busy openings', p: ['Forklifts and trucks pass through some doors all day. A fast door shortens waiting time and keeps work moving.'] },
      { h: 'Keeping the inside inside', p: ['Opening and closing quickly reduces the time an opening stays open, which helps with dust, draughts and temperature control.'] },
      { h: 'Built for the job', p: ['High-speed doors are made for frequent cycles. Choose the curtain, speed and safety devices to suit the traffic and the building.'] },
    ],
    links: [{ name: 'High-speed doors', href: '/products/high-speed-doors-dock/' }, { name: 'Factories', href: '/industries/factories/' }],
  },
  {
    slug: 'dock-shelters-vs-dock-seals', title: 'Dock Shelters vs Dock Seals', updated: D, read: '3 min',
    description: 'How dock shelters and dock seals close the gap between a truck and a loading bay, and how to choose.',
    sections: [
      { h: 'What they do', p: ['Both close the gap around the back of a truck at a loading door. This helps keep weather, dust and pests out and protects goods.'] },
      { h: 'Seals', p: ['Seals press against the truck body and suit trucks of similar size that back in consistently.'] },
      { h: 'Shelters', p: ['Shelters make a flexible frame around the truck and suit a mix of vehicle sizes. Retractable and inflatable types are options for different docks.'] },
    ],
    links: [{ name: 'Dock shelters', href: '/products/high-speed-doors-dock/dock-shelters/' }, { name: 'Dock seals', href: '/products/high-speed-doors-dock/dock-seals/' }],
  },
  {
    slug: 'gate-automation-for-apartment-communities', title: 'Gate Automation for Apartment Communities', updated: D, read: '4 min',
    description: 'What residents associations should consider: traffic, access control, safety, power backup and service.',
    sections: [
      { h: 'Traffic and queues', p: ['Morning and evening peaks decide how fast the gate or barrier should be and whether you need separate lanes for entry and exit.'] },
      { h: 'Access for residents and visitors', p: ['Cards, tags, remotes and visitor approval all affect the controller. Plan how to add and remove residents quickly.'] },
      { h: 'Safety and backup', p: ['Safety devices protect people and children. Power backup keeps the entry working during outages. Agree on a service plan so faults are fixed quickly.'] },
    ],
    links: [{ name: 'Apartments and gated communities', href: '/industries/apartments-and-gated-communities/' }, { name: 'Boom barriers', href: '/products/boom-barriers/' }],
  },
  {
    slug: 'swing-gate-operator-types-explained', title: 'Swing Gate Operator Types Explained', updated: D, read: '3 min',
    description: 'Articulated arm, linear arm and underground operators for swing gates: how they differ in plain language.',
    sections: [
      { h: 'Arm operators', p: ['Articulated and linear arms are fixed to the pillar and the gate leaf. They are common for retrofits and are easy to reach for service.'] },
      { h: 'Underground operators', p: ['Underground units are hidden in the ground, which keeps the gate looking clean. They need proper drainage and careful installation.'] },
      { h: 'Choosing one', p: ['Gate weight, leaf width, pillar space and how the gate opens decide the choice. A site visit confirms what works.'] },
    ],
    links: [{ name: 'Swing gates', href: '/products/gate-automation/swing-gate-automation/' }, { name: 'Sliding vs swing gates', href: '/compare/sliding-vs-swing-gates/' }],
  },
  {
    slug: 'fire-rated-rolling-shutters-explained', title: 'Fire-Rated Rolling Shutters Explained', updated: D, read: '3 min',
    description: 'What a fire-rated rolling shutter is meant to do, and what to ask for before you buy one.',
    sections: [
      { h: 'What it is for', p: ['A fire-rated shutter closes an opening to slow the spread of fire between spaces for a stated time. The rating applies to a tested construction, not just the shutter name.'] },
      { h: 'What to ask for', p: ['Ask for the rating, the test standard and the certificate for the exact model. Check that it suits the opening size and building rules.'] },
      { h: 'Installation and upkeep', p: ['A fire-rated shutter must be installed as tested and checked regularly so it closes properly when needed.'] },
    ],
    links: [{ name: 'Fire-rated rolling shutters', href: '/products/rolling-shutters/fire-rated-double-wall-galvalume-rolling-shutter/' }, { name: 'Certifications', href: '/about/' }],
  },
  {
    slug: 'automatic-gate-safety-for-children-and-pets', title: 'Automatic Gate Safety for Children and Pets', updated: D, read: '3 min',
    description: 'Simple rules and safety devices that keep children and pets safe around automatic gates.',
    sections: [
      { h: 'Safety devices come first', p: ['Photocells and safety edges stop or reverse the gate if something is in the way. A warning lamp shows when the gate is about to move.'] },
      { h: 'Everyday rules', p: ['Do not let children play near the gate or use remotes as toys. Keep the track clear and make sure everyone knows where the manual release is.'] },
      { h: 'Check regularly', p: ['Test the safety devices on a schedule and after any repair. Plan servicing so safety does not depend on luck.'] },
    ],
    links: [{ name: 'Safety devices', href: '/services/safety-devices/' }, { name: 'AMC plans', href: '/services/amc/' }],
  },
]
