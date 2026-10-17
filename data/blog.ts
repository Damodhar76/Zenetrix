// Launch set of evergreen guides (Blueprint 10.2). General explanations only: no prices, ratings, specs or certification claims.
// Client should review each post for technical accuracy before publishing (Blueprint 15).
export type Post = {
  slug: string; title: string; description: string; updated: string; read: string
  sections: { h: string; p: string[] }[]
  links: { name: string; href: string }[]
}

import { morePosts } from './blog2'
import { lastPosts } from './blog3'
import { hydPosts } from './blog4'

const basePosts: Post[] = [
  {
    slug: 'how-automatic-sliding-gates-work', title: 'How Automatic Sliding Gates Work', updated: '2026-10-01', read: '4 min',
    description: 'A plain-language guide to sliding gate operators, racks, controllers and safety sensors, and what to check before you automate a gate.',
    sections: [
      { h: 'The main parts', p: ['An automatic sliding gate has four core parts: an operator (motor), a rack or chain along the gate, a control board and safety devices. The motor turns a pinion gear that meshes with the rack fixed to the gate, pushing the gate along its track or cantilever frame.', 'The control board receives commands from remotes, keypads, cards or a phone app, then starts and stops the motor. Limit switches or encoders tell it where the gate is.'] },
      { h: 'Safety devices', p: ['Photocells send an invisible beam across the opening and stop or reverse the gate if the beam is broken. Safety edges on the gate leaf do the same on contact. A flashing lamp warns people that the gate is about to move.'] },
      { h: 'What power cuts do', p: ['Most operators have a manual release so the gate can be pushed by hand. Some systems add a battery backup so the gate keeps working for a limited number of cycles. Ask which option suits your site.'] },
      { h: 'Before you automate', p: ['A gate that is heavy, bent or sticks on its track will wear out any motor. A good installer checks weight, alignment, ground level and side space first and fixes the gate if needed.'] },
    ],
    links: [{ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/' }, { name: 'Convert a manual gate', href: '/services/convert-manual-gate-to-automatic/' }],
  },
  {
    slug: 'sliding-vs-swing-gate-automation', title: 'Sliding vs Swing Gate Automation: Which Should You Choose?', updated: '2026-10-01', read: '4 min',
    description: 'Compare sliding and swing automatic gates on space, safety, security, maintenance and look so you can pick the right one.',
    sections: [
      { h: 'Space decides most cases', p: ['A sliding gate needs clear space beside the opening roughly equal to the gate width. A swing gate needs clear space in front of or behind the opening for the leaves to open. Measure what you actually have before choosing.'] },
      { h: 'Safety and security', p: ['Both types need photocells and safety edges. A sliding gate moves along the boundary, so the hazard zone is mainly at the closing edge. A swing gate sweeps an arc, which needs more care where people or vehicles pass.'] },
      { h: 'Maintenance', p: ['Sliding gates depend on tracks, wheels and racks that need to be kept clean and aligned. Swing gates depend on hinges and arm joints that need lubrication and checking for wear.'] },
      { h: 'Our rule of thumb', p: ['Choose sliding where side space is available and the gate is wide or heavy. Choose swing where the design calls for it and there is room to open. A site survey gives the final answer.'] },
    ],
    links: [{ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/' }, { name: 'Swing gate automation', href: '/products/gate-automation/swing-gate-automation/' }, { name: 'Compare gates', href: '/compare/sliding-vs-swing-gates/' }],
  },
  {
    slug: 'boom-barrier-types-explained', title: 'Boom Barrier Types Explained', updated: '2026-10-01', read: '4 min',
    description: 'Straight, folding, telescopic, fence and advertising boom barriers explained, with tips on lane width, speed and access control.',
    sections: [
      { h: 'Straight arm', p: ['The standard barrier has one straight arm that rises vertically. It is the simplest option for normal lanes with enough height above the barrier.'] },
      { h: 'Folding arm', p: ['A folding arm bends in the middle when raised so it fits under low ceilings, such as basement parking.'] },
      { h: 'Telescopic arm', p: ['Telescopic arms extend in sections to cover wide lanes while keeping the housing small. They suit wide entries where one long arm would sag.'] },
      { h: 'Fence and advertising arms', p: ['Fence-style arms deter people from walking under the arm. Advertising arms carry a message but catch more wind, so the plinth and structure need to be designed for it.'] },
      { h: 'Choosing', p: ['Start with lane width, available height, vehicles per hour and the access method (RFID, ANPR, ticket or manual). Then pick opening speed and arm style to match.'] },
    ],
    links: [{ name: 'Boom barriers', href: '/products/boom-barriers/' }, { name: 'Compare barrier types', href: '/compare/boom-barrier-types/' }],
  },
  {
    slug: 'rolling-shutter-vs-sectional-door', title: 'Rolling Shutter vs Sectional Door', updated: '2026-10-01', read: '3 min',
    description: 'How rolling shutters and sectional doors differ in space, insulation, noise, looks and use, and which suits your property.',
    sections: [
      { h: 'How each one moves', p: ['A rolling shutter coils into a drum above the opening. A sectional door has hinged panels that travel along tracks and rest overhead under the ceiling.'] },
      { h: 'Where each fits', p: ['Rolling shutters are compact and economical, so they are common for shops, godowns and service bays. Sectional doors offer better insulation, a neater look and quieter running, which suits garages, showrooms and industrial bays.'] },
      { h: 'What to check', p: ['Rolling shutters need headroom for the drum, and sectional doors need headroom and side room for tracks. Consider insulation, noise, security level and how often the door is used.'] },
    ],
    links: [{ name: 'Rolling shutters', href: '/products/rolling-shutters/' }, { name: 'Sectional doors', href: '/products/sectional-doors/' }, { name: 'Compare', href: '/compare/rolling-shutter-vs-sectional-door/' }],
  },
  {
    slug: 'what-is-a-dock-leveller', title: 'What Is a Dock Leveller and Why Do You Need One?', updated: '2026-10-01', read: '3 min',
    description: 'Dock levellers bridge the gap between truck and warehouse floor. Learn how they work and when to add shelters and seals.',
    sections: [
      { h: 'The problem it solves', p: ['Truck beds sit at different heights, and the warehouse floor does not move. A dock leveller is a hinged ramp that bridges the gap so forklifts and pallets can roll across safely.'] },
      { h: 'Shelters and seals', p: ['A dock shelter or seal wraps around the rear of the truck so rain, dust and warm air stay out. Seals compress against the truck, while shelters use frames and curtains. Inflatable and retractable versions suit different bays.'] },
      { h: 'Planning a bay', p: ['Collect the dock height, the types of trucks, loads per day and forklift traffic. These decide leveller capacity, lip length and the style of shelter.'] },
    ],
    links: [{ name: 'Dock leveller', href: '/products/high-speed-doors-dock/dock-leveller/' }, { name: 'Dock shelters', href: '/products/high-speed-doors-dock/dock-shelters/' }],
  },
  {
    slug: 'gate-safety-sensors-guide', title: 'Gate Safety Sensors: Photocells, Loops and Safety Edges', updated: '2026-10-01', read: '3 min',
    description: 'Why every automatic gate needs safety devices, and how photocells, loop detectors and safety edges protect people and vehicles.',
    sections: [
      { h: 'Photocells', p: ['A transmitter and receiver face each other across the opening. If something blocks the beam while the gate closes, the gate stops or reverses.'] },
      { h: 'Loop detectors', p: ['A wire loop buried in the ground senses a vehicle’s metal. It keeps a barrier or gate open while a vehicle is in the lane.'] },
      { h: 'Safety edges', p: ['A soft strip on the moving edge triggers a stop on contact. It is a second layer of protection if a photocell fails or is missed.'] },
      { h: 'Test regularly', p: ['Walk a test object through the beam and press on the edge every month. If the gate does not stop or reverse, switch to manual release and call a technician.'] },
    ],
    links: [{ name: 'Safety devices service', href: '/services/safety-devices/' }, { name: 'AMC', href: '/services/amc/' }],
  },
  {
    slug: 'automatic-gate-maintenance-checklist', title: 'Automatic Gate Maintenance Checklist', updated: '2026-10-01', read: '3 min',
    description: 'A simple monthly and yearly checklist for keeping automatic gates safe and reliable, and when to call a technician.',
    sections: [
      { h: 'Monthly checks', p: ['Watch the gate through a full cycle for jerks or noise. Clean photocell lenses. Test the manual release. Check that the gate stops or reverses when the beam is blocked.'] },
      { h: 'Every few months', p: ['Clean and lightly lubricate tracks, hinges and rollers as the maker recommends. Check bolts, rack fixings and cable entries. Replace weak remote batteries.'] },
      { h: 'Yearly service', p: ['Have a technician inspect the operator, control board, wiring, battery backup and safety devices, and set the force and speed correctly.'] },
      { h: 'Call a technician when', p: ['The gate runs unevenly, trips often, ignores the remote, or fails the safety test. Do not keep using a gate that fails its safety checks.'] },
    ],
    links: [{ name: 'AMC plans', href: '/services/amc/' }, { name: 'Repair and servicing', href: '/services/automatic-gate-repair/' }],
  },
  {
    slug: 'convert-manual-gate-to-automatic-guide', title: 'Can I Convert My Manual Gate to Automatic?', updated: '2026-10-01', read: '3 min',
    description: 'What decides whether a manual sliding or swing gate can be automated, and what a site survey looks at.',
    sections: [
      { h: 'Usually yes', p: ['Most sliding and swing gates can be automated if they are straight, move freely and are strong enough to carry the load of an operator.'] },
      { h: 'What we check', p: ['Weight and width, track or hinge condition, ground level, post strength, space for the motor, power point and safety needs.'] },
      { h: 'Common fixes', p: ['A heavy or sticking gate may need new rollers or a new track. Weak posts may need strengthening. Fixing these first makes the automation last longer.'] },
    ],
    links: [{ name: 'Retrofit service', href: '/services/convert-manual-gate-to-automatic/' }, { name: 'Free site visit', href: '/contact/' }],
  },
  {
    slug: 'smart-gate-control-phone-smartwatch', title: 'Controlling Gates from a Phone or Smartwatch', updated: '2026-10-01', read: '3 min',
    description: 'How mobile and smartwatch gate control works, what hardware it needs and what to ask before you buy.',
    sections: [
      { h: 'How it works', p: ['A smart controller connects to the gate board and to the internet through Wi-Fi or a SIM, or to your phone directly through Bluetooth. An app sends the open or close command.'] },
      { h: 'Smartwatch', p: ['Some apps show buttons on a paired smartwatch so you can open a gate from your wrist. Support depends on the controller and the app.'] },
      { h: 'Questions to ask', p: ['Which apps and phones are supported, how internet outages are handled, how guest access works and whether a physical remote still works as backup.'] },
    ],
    links: [{ name: 'Smart control', href: '/services/smart-control/' }, { name: 'Access control', href: '/services/access-control/' }],
  },
  {
    slug: 'what-is-an-amc-for-automatic-doors-and-gates', title: 'What Is an AMC for Automatic Doors and Gates?', updated: '2026-10-01', read: '3 min',
    description: 'An Annual Maintenance Contract explained: what it usually covers, why it prevents breakdowns and what to ask for.',
    sections: [
      { h: 'The idea', p: ['An AMC is a yearly agreement for scheduled servicing of your automation. A technician visits at set intervals to inspect, adjust and test the system.'] },
      { h: 'What it can include', p: ['Inspection, lubrication, safety tests, settings checks and a service report. Some contracts also include priority support or parts. Check exactly what is covered.'] },
      { h: 'Why it pays', p: ['Small issues such as a misaligned photocell or dry roller are cheap to fix early and costly when ignored. Regular service also keeps safety devices working.'] },
    ],
    links: [{ name: 'AMC', href: '/services/amc/' }, { name: 'Repair', href: '/services/automatic-gate-repair/' }],
  },
  {
    slug: 'choosing-automatic-sliding-doors-for-business', title: 'Choosing Automatic Sliding Doors for a Business Entrance', updated: '2026-10-01', read: '4 min',
    description: 'What to consider when picking automatic sliding doors: traffic, sensors, glass, safety, emergency opening and upkeep.',
    sections: [
      { h: 'Traffic and sensors', p: ['Busy entrances need sensors that detect approach early and hold the door open long enough. Quiet entrances can use a push button or a smaller opening.'] },
      { h: 'Glass, PVC or wood', p: ['Glass gives a bright, open look. PVC is easy to clean. Wood suits premium interiors. Leaf weight decides which operator is suitable.'] },
      { h: 'Safety and emergency', p: ['Safety sensors stop the door if a person is in the path. Make sure there is a manual or emergency opening that suits fire and exit rules for the building.'] },
      { h: 'Upkeep', p: ['Keep the track clean, check sensors and plan regular service to avoid doors stuck open or closed during business hours.'] },
    ],
    links: [{ name: 'Sliding glass doors', href: '/products/automatic-doors/sliding-glass-doors/' }, { name: 'Automatic doors', href: '/products/automatic-doors/' }],
  },
]
export const posts: Post[] = [...basePosts, ...morePosts, ...lastPosts, ...hydPosts]
export const getPost = (slug: string) => posts.find(p => p.slug === slug)
