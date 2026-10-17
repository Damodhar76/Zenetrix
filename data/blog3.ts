import type { Post } from './blog'

// Third batch of evergreen guides (Blueprint 10.2, completes the 40-post launch set). General explanations only:
// no prices, ratings, specs or certification claims. Client should review each post for technical accuracy (Blueprint 15).
const D = '2026-10-02'
export const lastPosts: Post[] = [
  {
    slug: 'gate-operator-motor-types-explained', title: 'Gate Operator Motor Types Explained', updated: D, read: '4 min',
    description: 'AC and DC gate operators, hydraulic and electromechanical drives, and what each type means for noise, backup and daily use.',
    sections: [
      { h: 'Electromechanical and hydraulic drives', p: ['Most modern gate operators are electromechanical: a motor turns gears that move the gate through a pinion and rack, an arm or a chain. Hydraulic drives push the gate with oil pressure and are less common on new residential jobs.', 'The drive type affects noise, maintenance and how smoothly the gate starts and stops.'] },
      { h: 'AC and DC motors', p: ['AC operators run directly from mains power. DC operators use a low-voltage motor, which makes battery backup and soft starts easier to add. Many installers choose DC where power cuts are common.', 'Neither type is better in every case. The right choice depends on gate weight, how often the gate is used and the backup you need.'] },
      { h: 'Questions to ask your installer', p: ['Ask about the duty cycle, which is how many openings the operator is built to handle per hour or per day. Ask how the gate is released by hand during a power cut and whether spare parts are easy to get.'] },
    ],
    links: [{ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/' }, { name: 'Spare parts and motors', href: '/services/spare-parts/' }],
  },
  {
    slug: 'villa-gate-automation-checklist', title: 'Villa Gate Automation Checklist for Hyderabad Homes', updated: D, read: '4 min',
    description: 'A practical checklist for villa owners: gate type, space, power, safety and control choices to settle before you automate.',
    sections: [
      { h: 'Look at the gate first', p: ['Check that the gate is straight, light enough for its size and moves freely by hand. A gate that sticks or sags needs repair before any motor is fitted.', 'Note whether you have clear space beside the gate for a sliding design or room for the leaves to swing.'] },
      { h: 'Plan power and cables', p: ['The operator needs a power point near the gate and conduit for cables to the photocells and keypad. Decide the position of the control box so it is protected from rain and easy to reach.'] },
      { h: 'Choose control and safety', p: ['Decide who needs remotes, whether you want phone control and whether visitors will use an intercom or keypad. Insist on photocells and a safety edge, especially if children or pets use the driveway.'] },
      { h: 'Think about service', p: ['Ask who will service the gate after installation and how to reach them. A simple annual check keeps small problems from becoming breakdowns.'] },
    ],
    links: [{ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/' }, { name: 'Swing gate automation', href: '/products/gate-automation/swing-gate-automation/' }, { name: 'Villas', href: '/industries/villas/' }],
  },
  {
    slug: 'choosing-a-boom-barrier-for-parking-entry', title: 'Choosing a Boom Barrier for a Parking Entry', updated: D, read: '4 min',
    description: 'How lane width, headroom, traffic and access control decide which boom barrier suits a parking entry.',
    sections: [
      { h: 'Start with the lane', p: ['Measure the clear lane width and the headroom. A straight boom suits a normal lane. Folding or telescopic booms help where the ceiling is low or the arm would hit an obstruction.'] },
      { h: 'Think about traffic', p: ['A quiet residential entry has very different needs from an office parking lot at shift change. Busy entries need a barrier built for frequent cycles and a fast opening time.'] },
      { h: 'Add the right control', p: ['A barrier alone only lifts and lowers. Add RFID, ANPR, tickets or a keypad to decide who may enter, and loop detectors and photocells so the boom never lowers onto a vehicle.'] },
    ],
    links: [{ name: 'Boom barriers', href: '/products/boom-barriers/' }, { name: 'Folding boom barrier', href: '/products/boom-barriers/folding-boom-barrier/' }, { name: 'Access control', href: '/services/access-control/' }],
  },
  {
    slug: 'rfid-anpr-keypad-access-control-compared', title: 'RFID, ANPR and Keypad Access Control Compared', updated: D, read: '4 min',
    description: 'A plain comparison of RFID cards and tags, ANPR cameras and keypads for gates and barriers, with where each one fits.',
    sections: [
      { h: 'RFID cards and tags', p: ['RFID readers open the gate when a registered card or tag is presented. They are quick, cheap to add users to and common in gated communities and offices. Lost cards can be switched off in the controller.'] },
      { h: 'ANPR cameras', p: ['ANPR reads number plates and opens the barrier for registered vehicles, so drivers do not need a tag. Accuracy depends on camera position, lighting and plate condition, so site planning matters.'] },
      { h: 'Keypads and phones', p: ['Keypads suit small sites and visitors but codes can be shared. Phone apps and remotes give flexible control. Many sites combine two methods, such as RFID for residents and a keypad or intercom for guests.'] },
    ],
    links: [{ name: 'Access control', href: '/services/access-control/' }, { name: 'Smart control', href: '/services/smart-control/' }, { name: 'Boom barriers', href: '/products/boom-barriers/' }],
  },
  {
    slug: 'gate-remote-not-working-troubleshooting', title: 'Gate Remote Not Working? Simple Checks Before You Call', updated: D, read: '3 min',
    description: 'Quick, safe checks when a gate remote stops working: battery, range, interference and when to call for service.',
    sections: [
      { h: 'Check the easy things first', p: ['Replace the remote battery and try again. Stand close to the gate and press the button. If one remote works and another does not, the problem is the remote and not the gate.'] },
      { h: 'Look at the gate side', p: ['See whether the controller shows power. A tripped switch or a loose antenna can shorten range. Metal objects or new equipment nearby can also reduce range.'] },
      { h: 'When to call', p: ['If no remote works, the gate moves oddly, or you hear a motor humming without movement, stop and ask a technician. Do not open the control box or bypass safety devices yourself.'] },
    ],
    links: [{ name: 'Repair and servicing', href: '/services/automatic-gate-repair/' }, { name: 'Spare parts and motors', href: '/services/spare-parts/' }, { name: 'Gate not opening checks', href: '/blog/automatic-gate-not-opening-what-to-check/' }],
  },
  {
    slug: 'sliding-vs-swing-door-operators-explained', title: 'Sliding vs Swing Door Operators Explained', updated: D, read: '4 min',
    description: 'How automatic sliding and swing door operators differ in space, traffic, safety and where each one is used.',
    sections: [
      { h: 'Sliding door operators', p: ['A sliding operator moves one or more leaves sideways along a track. It needs wall or glass space beside the opening but nothing in front, which suits busy entrances, shops and offices.'] },
      { h: 'Swing door operators', p: ['A swing operator opens a hinged door with an arm or a built-in drive. It suits existing hinged doors, narrow openings and places where a sliding track is not possible, but it needs clear space for the door to swing.'] },
      { h: 'Safety and comfort', p: ['Both types use sensors to stop or reverse when someone is in the way. Swing doors need extra care near the swing path so people are not struck.'] },
    ],
    links: [{ name: 'Sliding glass doors', href: '/products/automatic-doors/sliding-glass-doors/' }, { name: 'Glass swing door automation', href: '/products/automatic-doors/glass-swing-door-automation/' }, { name: 'Compare sliding and swing doors', href: '/compare/sliding-vs-swing-automatic-doors/' }],
  },
  {
    slug: 'wind-resistant-rolling-shutters-explained', title: 'Wind-Resistant Rolling Shutters Explained', updated: D, read: '3 min',
    description: 'What makes a rolling shutter wind-resistant, where it matters and what to ask for before you buy.',
    sections: [
      { h: 'Why wind matters', p: ['Large shutters act like sails in strong wind. A standard shutter can bend or jump out of its guides if the design is not built for the expected load.'] },
      { h: 'What changes in a wind-resistant design', p: ['Stronger slats, deeper guides and extra restraints help the curtain stay in place. The details vary by maker, so ask how the shutter is designed and tested rather than relying on a label.'] },
      { h: 'What to ask for', p: ['Give the opening size and the exposure of your site. Ask for the wind load the shutter is built for and for the datasheet or certificate that supports it.'] },
    ],
    links: [{ name: 'Wind-resistance rolling shutter', href: '/products/rolling-shutters/wind-resistance-rolling-shutter/' }, { name: 'Rolling shutters', href: '/products/rolling-shutters/' }, { name: 'Certifications', href: '/about/' }],
  },
  {
    slug: 'loading-dock-planning-guide', title: 'Loading Dock Planning Guide: Levellers, Shelters and Seals', updated: D, read: '5 min',
    description: 'How to plan a loading dock: truck heights, dock levellers, shelters, seals and the doors around them.',
    sections: [
      { h: 'Start with your trucks', p: ['List the truck and trailer types that will visit and their bed heights. The dock height and leveller range need to cover them so forklifts can cross smoothly.'] },
      { h: 'Level the gap', p: ['A dock leveller bridges the gap between the truck bed and the dock floor. Hydraulic and mechanical types exist, and the right one depends on load and how often the dock is used.'] },
      { h: 'Close the gap around the truck', p: ['Shelters and seals reduce dust, rain and air loss around a docked truck. Seals press against the truck, shelters form a looser frame, and inflatable or retractable types suit different trucks and climates.'] },
      { h: 'Do not forget the door', p: ['A fast door on the dock opening limits air movement between loads. Plan the door, leveller and shelter together so they fit and work as one system.'] },
    ],
    links: [{ name: 'Dock leveller', href: '/products/high-speed-doors-dock/dock-leveller/' }, { name: 'Dock shelters', href: '/products/high-speed-doors-dock/dock-shelters/' }, { name: 'Dock seals', href: '/products/high-speed-doors-dock/dock-seals/' }],
  },
  {
    slug: 'cold-storage-door-guide', title: 'Doors for Cold Storage: What to Look For', updated: D, read: '4 min',
    description: 'What cold stores need from doors: speed, sealing, insulation and safe operation around forklifts and people.',
    sections: [
      { h: 'Why speed and sealing matter', p: ['Every minute a door stays open lets warm air in and makes the cooling system work harder. Fast opening and closing, and good seals, help hold temperature.'] },
      { h: 'Insulation and condensation', p: ['Insulated door leaves limit heat transfer. Cold stores also need to manage condensation and ice around frames and floors, so ask how the door and its seals are designed for low temperatures.'] },
      { h: 'Safety', p: ['Forklift traffic needs reliable safety sensors and clear signals. Make sure people inside can always get out, and plan regular checks of seals, sensors and heaters where fitted.'] },
    ],
    links: [{ name: 'High-speed doors', href: '/products/high-speed-doors-dock/' }, { name: 'Cold storage', href: '/industries/cold-storage/' }, { name: 'AMC plans', href: '/services/amc/' }],
  },
  {
    slug: 'sectional-door-panel-and-insulation-options', title: 'Sectional Door Panels and Insulation Options', updated: D, read: '4 min',
    description: 'Steel, wooden-finish, glass and polycarbonate sectional door panels, and how insulation changes comfort and noise.',
    sections: [
      { h: 'Panel choices', p: ['Sectional doors can use solid steel panels, wooden-finish panels, glass panels or polycarbonate panels. Solid panels give privacy and strength, while glass and polycarbonate bring in daylight.'] },
      { h: 'Insulation', p: ['Insulated panels reduce heat and noise, which helps garages next to living space and workshops that need comfort. Insulation thickness and seals both affect performance, so ask for the details of the model you are quoted.'] },
      { h: 'Look and upkeep', p: ['Choose a finish that suits the house or building and ask how it handles sun and rain. Regular cleaning and a yearly check of rollers, tracks and springs keep the door quiet and safe.'] },
    ],
    links: [{ name: 'Sectional doors', href: '/products/sectional-doors/' }, { name: 'Wooden-finish sectional doors', href: '/products/sectional-doors/wooden-finish-sectional-doors/' }, { name: 'Choosing a sectional garage door', href: '/blog/choosing-a-sectional-garage-door/' }],
  },
  {
    slug: 'garage-door-safety-and-balance-checks', title: 'Garage Door Safety and Balance Checks', updated: D, read: '3 min',
    description: 'Safe checks an owner can do on a sectional garage door, and why springs and cables should only be handled by a technician.',
    sections: [
      { h: 'A simple balance check', p: ['With the door closed and the opener released, lift the door by hand. A balanced door lifts smoothly and stays put when stopped halfway. A door that feels heavy or drops needs attention.'] },
      { h: 'Check the safety features', p: ['Test that the door reverses when it meets an obstacle and that photocells stop it when the beam is blocked. Look for frayed cables, loose hardware and noisy rollers.'] },
      { h: 'Leave springs to a technician', p: ['Springs and cables hold a lot of energy and can cause serious injury. Do not adjust or replace them yourself. Call a trained technician if anything looks worn.'] },
    ],
    links: [{ name: 'Garage sectional doors', href: '/products/sectional-doors/garage-sectional-doors/' }, { name: 'Safety devices', href: '/services/safety-devices/' }, { name: 'Repair and servicing', href: '/services/automatic-gate-repair/' }],
  },
  {
    slug: 'power-backup-options-for-automatic-gates', title: 'Power Backup Options for Automatic Gates', updated: D, read: '4 min',
    description: 'Manual release, battery backup, UPS and solar options so your gate keeps working through a power cut.',
    sections: [
      { h: 'Manual release', p: ['Every automatic gate should have a way to open it by hand. Make sure everyone in the household or community knows where the release is and how to use it.'] },
      { h: 'Battery backup and UPS', p: ['Some operators work with a battery so they can run for a limited number of cycles during a cut. A UPS can power the controller and operator. Battery size decides how many openings you get, and batteries need replacing over time.'] },
      { h: 'Solar options', p: ['Solar panels can charge the battery of a low-duty operator at sites without a reliable supply. They need good sun and a battery sized for your use. Ask for a calculation based on your gate and traffic.'] },
    ],
    links: [{ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/' }, { name: 'What happens in a power cut', href: '/faq/' }, { name: 'AMC plans', href: '/services/amc/' }],
  },
  {
    slug: 'amc-or-pay-per-visit-repair', title: 'AMC or Pay-Per-Visit Repair: Which Is Right for You?', updated: D, read: '4 min',
    description: 'How to decide between an annual maintenance contract and paying for each repair visit, based on use and risk.',
    sections: [
      { h: 'What an AMC gives you', p: ['An AMC sets a schedule of preventive visits and often a defined response for breakdowns. It suits sites where an entry failure causes real disruption, such as communities, offices and busy docks.'] },
      { h: 'When pay-per-visit works', p: ['A lightly used gate at a private home may do well with an annual check and repair only when needed. The risk is that small faults go unseen until they cause a stop.'] },
      { h: 'Questions to ask', p: ['Ask what each visit covers, how fast the team responds, whether parts are included and what is excluded. Compare plans on these points and not on price alone.'] },
    ],
    links: [{ name: 'AMC plans', href: '/services/amc/' }, { name: 'Repair and servicing', href: '/services/automatic-gate-repair/' }, { name: 'What is an AMC?', href: '/blog/what-is-an-amc-for-automatic-doors-and-gates/' }],
  },
  {
    slug: 'what-to-expect-on-installation-day', title: 'What to Expect on Gate Installation Day', updated: D, read: '4 min',
    description: 'A walk-through of installation day for automatic gates and doors: preparation, fitting, testing and handover.',
    sections: [
      { h: 'Before the team arrives', p: ['Clear the area around the gate, keep access for the team and make sure power is available. Park vehicles where the gate will not be blocked.'] },
      { h: 'During installation', p: ['The team fits the operator, rack or arms, controller and safety devices, sets the travel limits and runs cables. Some civil work such as a base plate may be needed first.'] },
      { h: 'Testing and handover', p: ['The team tests every remote and safety device, checks the manual release and shows you how to operate the system. Ask for written contact details for service and confirm what is covered.'] },
    ],
    links: [{ name: 'Installation service', href: '/services/automatic-gate-installation/' }, { name: 'Prepare your site', href: '/blog/prepare-your-site-for-gate-automation/' }, { name: 'Safety devices', href: '/services/safety-devices/' }],
  },
  {
    slug: 'monsoon-care-for-gates-doors-and-shutters', title: 'Monsoon Care for Gates, Doors and Shutters in Hyderabad', updated: D, read: '4 min',
    description: 'Simple monsoon checks for automatic gates, doors and rolling shutters: water, rust, drainage and electrical safety.',
    sections: [
      { h: 'Keep water away from electrics', p: ['Check that control boxes are closed and sealed, and that cable entries are tight. If water gets into a control box, switch the supply off and call a technician.'] },
      { h: 'Tracks, guides and hinges', p: ['Clear leaves and silt from gate tracks, door tracks and shutter guides so wheels and curtains run freely. Look for rust on hinges, racks and fasteners and treat or replace worn parts.'] },
      { h: 'Drainage and wet floors', p: ['Make sure water drains away from gate tracks and dock areas so it does not pool. Wet floors near doors and docks are a slip risk, so keep mats and drains in good order.'] },
    ],
    links: [{ name: 'Maintenance checklist', href: '/blog/automatic-gate-maintenance-checklist/' }, { name: 'Rolling shutter maintenance', href: '/blog/rolling-shutter-maintenance-tips/' }, { name: 'AMC plans', href: '/services/amc/' }],
  },
]
