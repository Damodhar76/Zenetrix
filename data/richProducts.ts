import type { Faq } from './faqs'

// Extended, product-specific content shown on the product page (in addition to the family copy).
// General, widely true statements only. Exact figures come from data/specs.ts (client datasheets).
export type RichProduct = {
  headline: string
  intro: string
  features: string[]
  steps: { h: string; p: string }[]
  uses: { h: string; p: string }[]
  works: string[]            // integrates with
  tips: string[]             // site and installation tips
  faqs: Faq[]
  keywords: string[]
}

export const richProducts: Record<string, RichProduct> = {
  'rfid-access-control/uhf-rfid-controller': {
    headline: 'UHF RFID controller and management software for gates and parking',
    intro: 'The controller is the brain of a UHF RFID access system. Readers only report which tag they see. The controller and its software decide what happens next: open the barrier, keep it closed, raise an alert and write the event to the log. This is what turns a long-range reader into a complete parking and gate management system.',
    features: [
      'Hands-free vehicle entry: authorised tags open the gate or boom barrier automatically, with no card swipe and no stopping',
      'Central user and vehicle database with name, flat or department, vehicle number and tag ID',
      'Issue, block, replace and expire tags from one screen, so a lost tag or sold car is shut out at once',
      'Validity periods and time-of-day rules, for example staff only in office hours or visitors for one day',
      'Entry and exit log with date, time, gate and tag, searchable and exportable for audits and complaints',
      'Whitelist and blacklist handling, with unknown or blocked tags kept out and recorded',
      'Multi-gate and multi-lane control from one software, useful for campuses with several entries',
      'Password-protected software login with operator levels, so guards and admins see only what they need',
      'Relay and standard access outputs to boom barriers, sliding and swing gate operators and turnstiles (confirm for the supplied model)',
      'Report export to spreadsheet for security, facility and billing teams',
    ],
    steps: [
      { h: 'Tag is read', p: 'The long-range reader at the lane picks up the passive tag on the windscreen as the vehicle approaches and sends its unique ID to the controller.' },
      { h: 'Software checks the tag', p: 'The controller looks up the ID: is it registered, active, inside its validity period and allowed at this gate and time?' },
      { h: 'Barrier opens or stays closed', p: 'A valid tag triggers the relay that lifts the boom or opens the gate. An invalid tag keeps it closed and can raise an alert for the guard.' },
      { h: 'Event is recorded', p: 'Every pass and every refused attempt is stored with date, time and gate, giving security a clear audit trail.' },
    ],
    uses: [
      { h: 'Apartments and gated communities', p: 'Resident and tenant vehicles enter freely, visitors get temporary tags, and the committee can see who came in and when without relying on a paper register.' },
      { h: 'IT parks and corporate campuses', p: 'Employee, contractor and fleet vehicles are separated by tag group, with access rules by gate and shift.' },
      { h: 'Factories and warehouses', p: 'Staff, transporters and regular delivery vehicles are identified at the gate, which shortens queues at shift change.' },
      { h: 'Hospitals, schools and institutions', p: 'Doctors, staff, buses and ambulances get quick entry while unknown vehicles are routed to the guard.' },
      { h: 'Malls, hotels and paid parking', p: 'Season-pass and member vehicles pass without stopping, which keeps the main lane moving at peak hours.' },
    ],
    works: ['UHF RFID long-range readers AZUHFR105A and AZUHFR115', 'Long range UHF RFID stickers and tags', 'Boom barriers (folding, telescopic, arm-out, fence and advertising)', 'Sliding and swing gate operators', 'Flap barriers and speed gates', 'Existing barrier controllers that accept a standard access input'],
    tips: [
      'Decide the number of gates, lanes and users before choosing, so the software and controller are sized correctly',
      'Place the PC or controller in a dry, ventilated guard room with a UPS, and keep the network cable run short and protected',
      'Keep a manual release and a guard override on every barrier so traffic is never stuck during a fault',
      'Register tags in batches by block, department or vehicle type so reports are easy to read later',
      'Back up the database regularly and keep one copy outside the guard room PC',
      'Ask for a short operator training for guards and an admin session for the committee or facility team',
    ],
    faqs: [
      { q: 'What is a UHF RFID controller?', a: 'It is the control unit and software that receives tag IDs from the long-range reader, decides whether the vehicle is allowed in, and signals the boom barrier or gate to open. It also stores the entry and exit records.' },
      { q: 'Is the reader enough, or do I also need the controller and software?', a: 'The reader only reads the tag. For a proper system with a user list, blocking of lost tags, validity periods and reports, you need the controller and software. For a very small gate, a simple reader-to-barrier connection may be enough.' },
      { q: 'Can one controller manage more than one gate?', a: 'Yes, systems can be arranged to manage several entries and exits from one software, depending on the controller and licence supplied. Tell us the number of gates and lanes for the quote.' },
      { q: 'Can I see who entered and when?', a: 'Yes. Each pass is logged with date, time, gate and tag, and the log can be searched and exported for audits, complaints or billing.' },
      { q: 'How do I block a lost tag or an old resident?', a: 'The tag is disabled in the software, so it no longer opens any gate. A new tag is then issued to the new vehicle or resident.' },
      { q: 'Will it work with the boom barrier or gate I already have?', a: 'Often yes, if the existing operator accepts a standard dry-contact or access input. Share the make and model and we check compatibility on the site visit.' },
      { q: 'Does it need internet?', a: 'Gate control normally runs on the local controller and PC, so entry does not depend on internet. Internet is only needed if you want remote viewing or cloud backup.' },
      { q: 'Who supports the software after installation?', a: 'Zenitrix provides installation, training and service. Ask about an AMC that covers readers, controller, barrier and software together.' },
    ],
    keywords: [
      'UHF RFID controller', 'UHF RFID controller Hyderabad', 'RFID parking controller software', 'RFID parking management software Hyderabad', 'RFID access controller for boom barrier',
      'vehicle access control software India', 'RFID gate control system Hyderabad', 'RFID based vehicle entry system for apartments', 'automatic vehicle identification system Hyderabad',
      'long range RFID parking system Hyderabad', 'RFID parking system for gated community', 'RFID controller with software India', 'vehicle entry exit log software', 'parking access management system Hyderabad',
    ],
  },

  'rfid-access-control/long-range-uhf-rfid-stickers-and-tags': {
    headline: 'Long range UHF RFID stickers and tags for vehicle access',
    intro: 'Each vehicle carries a small passive tag with a unique ID. When the car approaches the lane, the long-range reader picks up the tag and the controller opens the barrier for authorised vehicles. There is no battery to replace and no card to swipe.',
    features: [
      'Passive UHF tags with no battery, so there is nothing to charge or replace',
      'Reads at a distance as the vehicle approaches, so cars pass without stopping',
      'AZ UHFS7017A windscreen sticker for cars, jeeps and light vehicles',
      'AZ UHFT315 hard tag for metal or plastic surfaces such as trucks, buses, two-wheelers and equipment',
      '512 bits tag memory',
      'Unique ID per tag, so every vehicle is individually registered, blocked or expired in the software',
      'Parking gate and vehicle access printing available on the sticker face (confirm artwork and quantity when ordering)',
      'Suitable for bulk issue to apartments, offices, campuses, factories and fleets',
    ],
    steps: [
      { h: 'Choose the tag type', p: 'Use the windscreen sticker for cars and light vehicles, and the hard tag where a sticker will not hold or will not read, such as metal surfaces.' },
      { h: 'Fix it in the right place', p: 'Clean the inside of the glass, fix the sticker in a clear, untinted part of the windscreen near the rear-view mirror, and press out air bubbles.' },
      { h: 'Register the tag', p: 'Enter the tag ID against the owner, flat or department and vehicle number in the controller software.' },
      { h: 'Test at the lane', p: 'Drive the vehicle through the lane at normal speed and confirm the barrier opens at the right point.' },
    ],
    uses: [
      { h: 'Residents and tenants', p: 'One or two tags per flat or villa, linked to the vehicle number, with easy replacement when a vehicle changes.' },
      { h: 'Employees and contractors', p: 'Separate tag groups for staff, contractors and housekeeping, with different access times.' },
      { h: 'Fleet and company vehicles', p: 'Hard tags on buses, trucks and service vehicles so entry and exit times are recorded automatically.' },
      { h: 'Visitors and temporary users', p: 'Short-validity tags for visitors, vendors or event parking, switched off automatically when they expire.' },
    ],
    works: ['UHF RFID long-range readers AZUHFR105A and AZUHFR115', 'UHF RFID controller and software', 'Boom barriers and gate operators', 'Speed gates and flap barriers'],
    tips: [
      'Test one tag on each type of windscreen before ordering a full batch, especially for heat-reflective or metallic-tinted glass',
      'Keep a few spare tags per block so new vehicles can be added quickly',
      'Do not stack two tags close together on the same glass, as they can interfere',
      'Record the tag ID with the vehicle number at the time of issue to avoid a manual data entry backlog later',
      'Use hard tags, not stickers, on metal bodies and two-wheeler number-plate areas',
    ],
    faqs: [
      { q: 'How far can the sticker be read from?', a: 'The read distance depends on the reader, its antenna, the tag position and the glass. Range is confirmed on the site with a test tag. The reader page lists the range for each reader model.' },
      { q: 'Does the tag need a battery?', a: 'No. It is a passive UHF tag powered by the reader signal, so it has no battery to replace.' },
      { q: 'Can the sticker be moved to another car?', a: 'Stickers are meant to be fixed once. For a new vehicle, block the old tag in the software and issue a new one.' },
      { q: 'Which tag is used on a truck or bike?', a: 'Use the AZ UHFT315 hard tag on metal or plastic surfaces where a sticker will not work well. The right tag is confirmed on the site visit.' },
      { q: 'Can I order tags in bulk for an apartment community?', a: 'Yes. Share the number of flats and expected vehicles and we quote the tags together with the readers and controller.' },
      { q: 'Does tinted glass stop the sticker working?', a: 'Normal tinted film is usually fine, but heat-reflective or metallic coatings can weaken the signal. Test on the actual vehicle first.' },
    ],
    keywords: [
      'long range UHF RFID stickers', 'UHF RFID windshield sticker', 'RFID vehicle sticker Hyderabad', 'RFID sticker for car parking', 'UHF RFID tag for vehicles India', 'UHF RFID hard tag',
      'RFID windscreen tag for gated community', 'parking RFID sticker bulk', 'passive UHF RFID tag Hyderabad', 'UHF RFID tags supplier Hyderabad', 'AZ UHFS7017A', 'AZ UHFT315', 'RFID parking gate sticker',
    ],
  },

  'rfid-access-control/uhf-rfid-long-range-reader-azuhfr105a': {
    headline: 'UHF RFID long range reader AZUHFR105A for single-lane entries',
    intro: 'The AZUHFR105A is a compact, waterproof UHF reader for entries where a medium read distance is enough. It reads passive vehicle tags as the car approaches, so authorised vehicles pass without stopping.',
    features: ['Reading range of about 5 m', 'Reads 50+ tags at once', 'Fast data reading with tag wake-up recognition', 'Compact 180 x 180 mm body for easy pole or wall mounting', 'Waterproof build for outdoor gates', 'Works with UHF RFID stickers, hard tags and the UHF RFID controller'],
    steps: [
      { h: 'Survey the lane', p: 'Lane width, mounting height and distance from the barrier are measured.' },
      { h: 'Mount and connect', p: 'The reader is fixed on a pole or wall and wired to the controller or barrier input.' },
      { h: 'Tune the range', p: 'Power and angle are adjusted so the right vehicle is read at the right point and neighbouring lanes are not.' },
      { h: 'Register and test', p: 'Tags are registered and the lane is tested with real vehicles.' },
    ],
    uses: [
      { h: 'Apartment and villa community gates', p: 'A single entry lane where residents should pass without stopping.' },
      { h: 'Offices and small campuses', p: 'Staff parking entries with moderate traffic.' },
      { h: 'Small parking lots', p: 'Basement and compound parking with one or two lanes.' },
    ],
    works: ['UHF RFID stickers and tags', 'UHF RFID controller and software', 'Boom barriers and gate operators'],
    tips: ['Choose AZUHFR115 instead if the lane is wide or you want the barrier to open earlier at higher speed', 'Mount clear of metal sheets and signboards that reflect the signal', 'Keep the reader out of direct water spray and strong sunlight where possible'],
    faqs: [
      { q: 'Is AZUHFR105A enough for my gate?', a: 'For a single lane of normal width with vehicles approaching slowly, yes. For wide lanes, higher speeds or several lanes side by side, the AZUHFR115 is the safer choice.' },
      { q: 'How many tags can it read together?', a: 'It handles 50+ tags in its field at once, which suits normal gate traffic.' },
      { q: 'Does it work with an existing barrier?', a: 'Usually, if the barrier accepts a standard access input. We confirm on the site visit.' },
    ],
    keywords: ['AZUHFR105A', 'UHF RFID long range reader 5 metre', '5 m RFID reader for gate', 'RFID reader for apartment gate Hyderabad', 'waterproof UHF RFID reader India', 'RFID reader for boom barrier Hyderabad'],
  },

  'rfid-access-control/uhf-rfid-long-range-reader-azuhfr115': {
    headline: 'UHF RFID long range reader AZUHFR115 for wide and busy entries',
    intro: 'The AZUHFR115 is a larger industrial UHF reader with a read distance of up to 15 m+. It suits wide entries, campuses, factories and busy parking where vehicles should be identified early and move through smoothly.',
    features: ['Reading range up to 15 m+', 'Reads 500+ tags at once', 'High-speed processing and advanced tag recognition', 'Multi-region frequency support', 'Industrial waterproof build, 255 x 255 mm', 'Works with UHF RFID stickers, hard tags and the UHF RFID controller'],
    steps: [
      { h: 'Survey the entry', p: 'Number of lanes, lane width, vehicle speed and mounting position are checked.' },
      { h: 'Mount and connect', p: 'The reader is fixed on a pole or gantry and connected to the controller and barrier.' },
      { h: 'Tune the zone', p: 'Because the range is long, power and angle are tuned so only the vehicle at the barrier opens it.' },
      { h: 'Register and test', p: 'Tags are registered and the lane is tested at peak-hour traffic.' },
    ],
    uses: [
      { h: 'Industrial and factory gates', p: 'Staff and transporter vehicles are recognised early, so queues do not build at shift change.' },
      { h: 'IT parks and large campuses', p: 'Wide multi-lane entries with a high number of tagged vehicles.' },
      { h: 'Large parking areas', p: 'Malls, hospitals and institutions that need fast, reliable vehicle identification.' },
    ],
    works: ['UHF RFID stickers and tags', 'UHF RFID controller and software', 'Boom barriers, telescopic barriers and gate operators'],
    tips: ['Use lane separation or reduced power when two lanes run side by side', 'Mount high enough to avoid being blocked by large trucks', 'Plan a controller with enough capacity for the number of lanes'],
    faqs: [
      { q: 'Why choose the AZUHFR115 over the AZUHFR105A?', a: 'It reads from a longer distance and handles many more tags at once, so it suits wide, multi-lane or high-traffic entries.' },
      { q: 'Can a long range cause the wrong car to open the gate?', a: 'It can if it is not tuned. The reader power, angle and controller timing are adjusted on site so only the vehicle at the barrier is accepted.' },
      { q: 'Is it suitable for trucks and industrial use?', a: 'Yes. It has an industrial waterproof build and works with hard tags that are made for metal and plastic surfaces.' },
    ],
    keywords: ['AZUHFR115', 'UHF RFID long range reader 15 metre', '15 m RFID reader India', 'industrial RFID reader Hyderabad', 'RFID reader for factory gate', 'long range RFID reader for parking Hyderabad', 'multi lane RFID reader'],
  },

  'gate-automation/trackless-bi-folding-gate-automation': {
    headline: 'Trackless bi-folding gate automation: mechanism and how it is automated',
    intro: 'A trackless bi-folding gate folds its leaves like a book as it opens, and it travels without a floor rail. This page explains the mechanism first and then how the automation drives it.',
    features: ['Folding leaves save side space', 'No floor track to clog or trip over', 'Soft start and soft stop drive', 'Photocells and safety edges for people and vehicles', 'Manual release for power cuts', 'Works with remote, app and RFID'],
    steps: [
      { h: 'Mechanism: hinged leaves', p: 'Each side of the gate is made of two or more leaves joined by hinges. As the gate opens the leaves fold against each other and stack to the side, so the gate needs far less side space than a sliding gate.' },
      { h: 'Mechanism: no floor track', p: 'The moving weight is carried by a top guide or support rollers and strong hinges rather than a rail on the ground, so there is no groove to fill with dust, stones or water.' },
      { h: 'Automation: drive unit', p: 'A motor and arm or linkage at the fold point pushes and pulls the leaves open and closed. The controller sets speed, soft start and soft stop so the folding is smooth.' },
      { h: 'Automation: safety and control', p: 'Photocells and safety edges stop or reverse the gate if a person or vehicle is in the way. Remote, keypad, app or RFID signals tell the controller when to open, and a manual release works in a power cut.' },
    ],
    uses: [
      { h: 'Villas and apartments', p: 'Wide driveways where a sliding gate has no room beside the opening.' },
      { h: 'Factories and yards', p: 'Heavy-use entrances on uneven or dusty ground.' },
      { h: 'Commercial compounds', p: 'Wide openings where a swing gate would block the road.' },
    ],
    works: ['Remote controls and wall keypads', 'Mobile app, smartwatch and voice control where the controller supports them', 'RFID, ANPR and intercom access control', 'Photocells, safety edges and flashing lamps', 'Battery backup for power cuts'],
    tips: ['Gate frame must be rigid and balanced before automation is fitted', 'Check the fold direction and the clear area where leaves stack', 'Fix the support points in solid structure', 'Plan cable routes before the gate is finished', 'Service hinges and rollers regularly'],
    faqs: [
      { q: 'How is a trackless bi-folding gate different from a sliding gate?', a: 'A sliding gate moves sideways in one piece and needs space equal to its width. A bi-folding gate folds into stacks, so it needs much less side space, and a trackless version carries its weight without a floor rail.' },
      { q: 'Can my existing folding gate be automated?', a: 'Often yes if the frame is rigid, balanced and in good condition. We confirm on a site visit.' },
    ],
    keywords: ['trackless bi folding gate mechanism', 'bi folding gate motor Hyderabad', 'folding gate opener without track', 'trackless folding gate for villa Hyderabad'],
  },

  'gate-automation/telescopic-gate-automation': {
    headline: 'Telescopic gate automation: mechanism and how it is automated',
    intro: 'A telescopic gate has several leaves that slide over one another and extend in sections, so a wide opening can be closed with little room beside the gate. This page explains the mechanism and the automation.',
    features: ['Needs much less side space than a single-leaf slider', 'Suits wide openings', 'Soft start and soft stop', 'Limit switches and obstruction detection', 'Manual release for power cuts', 'Works with remote, app, RFID and ANPR'],
    steps: [
      { h: 'Mechanism: stacked leaves', p: 'The gate is made of two or more leaves on parallel tracks or guides. When the gate opens, the leaves slide behind each other and stack into a short length beside the opening.' },
      { h: 'Mechanism: linked travel', p: 'The leaves are linked by chains, belts or rack drives so that they move together and in step. Good alignment of rails, rollers and guides decides how smooth the gate runs.' },
      { h: 'Automation: rack and pinion drive', p: 'A motor with a pinion drives a rack fixed to the gate. The linked leaves extend and retract together. Soft start and soft stop reduce shock on the leaves.' },
      { h: 'Automation: safety and control', p: 'Photocells and safety edges stop or reverse the gate on obstruction. Limit switches set the open and close points, and a manual release lets the gate be moved by hand in a power cut.' },
    ],
    uses: [
      { h: 'Industrial and commercial entrances', p: 'Wide vehicle gates where there is little wall space beside the opening.' },
      { h: 'Gated communities', p: 'Main entrances with heavy daily use.' },
      { h: 'Villas and farmhouses', p: 'Wide driveways with a short side wall.' },
    ],
    works: ['Remote controls and wall keypads', 'Mobile app, smartwatch and voice control where the controller supports them', 'RFID, ANPR and intercom access control', 'Photocells, safety edges and flashing lamps', 'Battery backup for power cuts'],
    tips: ['Measure the opening and the stacking length beside it', 'Keep tracks level and clean for smooth travel', 'Plan for regular alignment checks, as there are more moving parts', 'Size the motor for the combined leaf weight'],
    faqs: [
      { q: 'When should I choose a telescopic gate?', a: 'When the opening is wide but the wall beside it is short. A normal sliding gate needs side space about equal to its width, a telescopic gate needs about half or less.' },
      { q: 'Does it need more maintenance?', a: 'It has more moving parts than a single-leaf slider, so alignment and lubrication checks matter. An AMC covers this.' },
    ],
    keywords: ['telescopic gate mechanism', 'telescopic sliding gate motor Hyderabad', 'telescopic gate for wide opening', 'telescopic gate automation cost factors'],
  },

  'gate-automation/bi-folding-gate-automation': {
    headline: 'Bi-folding gate automation: mechanism and how it is automated',
    intro: 'A bi-folding gate is made of hinged panels that fold as the gate opens. This page explains how the panels move and how the motor automates them.',
    features: ['Panels fold, so the gate opens with a short swing', 'Suits entrances where swing gates block the driveway', 'Soft start and soft stop', 'Obstruction detection and safety edges', 'Manual release for power cuts', 'Works with remote, app and RFID'],
    steps: [
      { h: 'Mechanism: hinged panels', p: 'Each gate half has two panels joined by a hinge. The outer panel is fixed to the pillar by hinges and the inner panel folds back against it as the gate opens.' },
      { h: 'Mechanism: wheel or guide support', p: 'A small wheel or guide at the fold point carries part of the weight, so the hinges are not overloaded and the panels stay in line.' },
      { h: 'Automation: motor at the fold', p: 'A motor with an arm or linkage at the fold point pushes the panels to open and pulls them to close. The controller manages speed and soft stops.' },
      { h: 'Automation: safety and control', p: 'Photocells, safety edges and flashing lamps protect people and vehicles. Remote, keypad, app or RFID signals trigger the gate, and a manual release is fitted for power cuts.' },
    ],
    uses: [
      { h: 'Villas with short driveways', p: 'Where a swing gate would hit parked cars or a slider has no room.' },
      { h: 'Apartments and offices', p: 'Narrow entrances with limited space inside.' },
      { h: 'Commercial compounds', p: 'Entrances where the gate should clear a wide opening.' },
    ],
    works: ['Remote controls and wall keypads', 'Mobile app, smartwatch and voice control where the controller supports them', 'RFID, ANPR and intercom access control', 'Photocells, safety edges and flashing lamps', 'Battery backup for power cuts'],
    tips: ['Panel weight and hinge quality decide reliability', 'Check clear space where panels will fold', 'Use strong pillars or frames for hinge mounting', 'Keep hinges and wheels lubricated'],
    faqs: [
      { q: 'How is it different from a swing gate?', a: 'A swing gate opens as one big leaf and needs a large arc. A bi-folding gate folds in half, so the swing space needed is much smaller.' },
      { q: 'Can folding gates be automated later?', a: 'Usually yes if the panels are rigid and hinged well. A site visit confirms it.' },
    ],
    keywords: ['bi folding gate mechanism', 'bi folding gate motor Hyderabad', 'folding gate opener Hyderabad', 'bi fold gate automation cost Hyderabad'],
  },

  'gate-automation/cantilever-trackless-gate-automation': {
    headline: 'Cantilever trackless gate automation: mechanism and how it is automated',
    intro: 'A cantilever gate hangs from rollers on a rigid frame and moves clear of the ground, so there is no floor rail. This page explains the mechanism and the automation.',
    features: ['No floor track to clog with dust, stones or water', 'Clean driveway and easy for vehicles', 'Handles wide openings', 'Soft start and soft stop', 'Manual release for power cuts', 'Works with remote, app, RFID and ANPR'],
    steps: [
      { h: 'Mechanism: cantilever frame', p: 'The gate has a long rigid frame, called the cantilever, which extends behind the opening. The gate hangs from rollers fixed in support posts, so the load is carried above the ground.' },
      { h: 'Mechanism: support posts and rollers', p: 'Two or more roller carriages in fixed posts guide the gate as it slides. The counterbalance length behind the opening is what keeps the gate level.' },
      { h: 'Automation: rack and pinion drive', p: 'A motor with a pinion drives a rack along the gate frame and moves it sideways. Soft start and soft stop protect the gate and the rollers.' },
      { h: 'Automation: safety and control', p: 'Photocells and safety edges stop or reverse the gate on obstruction. Limit switches set the end points, and a manual release works in a power cut.' },
    ],
    uses: [
      { h: 'Villas and farmhouses', p: 'Uneven, sloping or dusty driveways where a track would collect debris.' },
      { h: 'Factories and yards', p: 'Heavy daily use with trucks.' },
      { h: 'Commercial compounds', p: 'Wide openings with clear space beside the gate.' },
    ],
    works: ['Remote controls and wall keypads', 'Mobile app, smartwatch and voice control where the controller supports them', 'RFID, ANPR and intercom access control', 'Photocells, safety edges and flashing lamps', 'Battery backup for power cuts'],
    tips: ['Needs clear side space for the full gate and counterbalance', 'Foundation for the support posts must be solid', 'Check the ground level so the gate hangs clear', 'Plan the rack and motor position before fabrication'],
    faqs: [
      { q: 'Why choose cantilever over a normal sliding gate?', a: 'A cantilever gate has no floor rail, so it does not get blocked by dust, stones or water, and it suits uneven ground.' },
      { q: 'Is more side space needed?', a: 'Yes. The gate and its counterbalance need clear length beside the opening, usually more than a standard sliding gate.' },
    ],
    keywords: ['cantilever gate mechanism', 'cantilever sliding gate motor Hyderabad', 'trackless sliding gate Hyderabad', 'cantilever gate for factory Hyderabad'],
  },

  'boom-barriers/automatic-bollards': {
    headline: 'Automatic bollards for Hyderabad: how they work',
    intro: 'Automatic bollards are posts set in the ground that rise to block vehicles and sink flush with the road to let them pass. They give strong vehicle control without a wide barrier arm or gate.',
    features: ['Posts sink flush with the road when open', 'Strong vehicle stopping where required', 'Stainless-steel finish with reflective bands', 'Works singly or in groups', 'Emergency manual lowering', 'Works with RFID, ANPR, remote and intercom'],
    steps: [
      { h: 'Mechanism: the post and the pit', p: 'The bollard sits in a concrete pit with drainage. An inner mechanism lifts the post up and lowers it back down below the road surface.' },
      { h: 'Mechanism: drive types', p: 'Hydraulic, electromechanical and semi-automatic types are used. The choice depends on speed, duty cycle and the impact protection required.' },
      { h: 'Automation: control', p: 'A controller takes signals from remotes, RFID, ANPR, intercom or a guard push button and raises or lowers the bollards, singly or as a group.' },
      { h: 'Automation: safety', p: 'Loop detectors and photocells stop the post from rising under a vehicle. Reflective bands and lights keep it visible, and an emergency lowering method works in a power cut.' },
    ],
    uses: [
      { h: 'Gated communities and apartments', p: 'Control of vehicle entry where a gate is not suitable.' },
      { h: 'IT parks, malls and hotels', p: 'Entrances and driveways with controlled access.' },
      { h: 'Government buildings and pedestrian zones', p: 'Protection from vehicles at sensitive areas.' },
    ],
    works: ['Remote controls and wall keypads', 'Mobile app, smartwatch and voice control where the controller supports them', 'RFID, ANPR and intercom access control', 'Photocells, safety edges and flashing lamps', 'Battery backup for power cuts'],
    tips: ['Survey underground utilities before digging the pit', 'Provide proper drainage in the pit', 'Choose the impact rating for the risk of the site', 'Plan power and signal cables to the control point'],
    faqs: [
      { q: 'How is a bollard different from a boom barrier?', a: 'A boom barrier uses a raising arm and is visible and easy to pass under when open. A bollard is a solid post that can stop a vehicle and leaves the road clear when lowered.' },
      { q: 'What does an automatic bollard need on site?', a: 'A pit with drainage, conduit for power and signal, and a control point. We confirm details on the site visit.' },
    ],
    keywords: ['automatic bollards Hyderabad', 'hydraulic bollard Hyderabad', 'rising bollards supplier India', 'retractable bollards for parking', 'stainless steel bollards Hyderabad'],
  },
}
