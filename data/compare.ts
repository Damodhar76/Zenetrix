// Qualitative comparisons only: no invented numbers, prices or ratings.
export type Compare = {
  slug: string; title: string; description: string; a: string; b: string
  intro: string; rows: [string, string, string][]; verdict: string
  links: { name: string; href: string }[]
}

export const comparisons: Compare[] = [
  {
    slug: 'sliding-vs-swing-gates', title: 'Sliding vs Swing Gate Automation', a: 'Sliding gate', b: 'Swing gate',
    description: 'Compare sliding and swing automatic gates on space, safety, maintenance and appearance before you choose.',
    intro: 'Both gate types can be automated well. The right choice depends mainly on the space you have and how the gate is used.',
    rows: [['Space needed', 'Clear side space about the gate width', 'Clear arc space in front of or behind the gate'], ['Best for', 'Wide or heavy gates, busy entries', 'Traditional look, narrower entries with room to open'], ['Safety focus', 'Closing edge and track area', 'Swing arc and hinge side'], ['Upkeep', 'Track, wheels, rack', 'Hinges, arms, joints'], ['Wind', 'Less affected by wind', 'Large leaves catch wind']],
    verdict: 'Pick sliding when side space allows. Pick swing when design or space points that way. A site visit settles it.',
    links: [{ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/' }, { name: 'Swing gate automation', href: '/products/gate-automation/swing-gate-automation/' }],
  },
  {
    slug: 'boom-barrier-types', title: 'Boom Barrier Types Compared', a: 'Straight / Telescopic', b: 'Folding / Fence',
    description: 'Straight, telescopic, folding and fence boom barriers compared by lane width, height and use.',
    intro: 'Boom barrier type depends on lane width, overhead height and whether you need extra deterrence.',
    rows: [['Lane width', 'Straight for standard lanes, telescopic for wide lanes', 'Folding works where height is limited'], ['Headroom', 'Needs vertical clearance for straight arms', 'Folding arms fit low ceilings'], ['Deterrence', 'Basic vehicle control', 'Fence style discourages walking under the arm'], ['Wind', 'Light arms catch little wind', 'Fence and advertising arms catch more wind']],
    verdict: 'Match arm style to lane width and headroom, then pick speed and access control for your traffic.',
    links: [{ name: 'Boom barriers', href: '/products/boom-barriers/' }, { name: 'Telescopic boom barrier', href: '/products/boom-barriers/telescopic-boom-barrier/' }],
  },
  {
    slug: 'rolling-shutter-vs-sectional-door', title: 'Rolling Shutter vs Sectional Door', a: 'Rolling shutter', b: 'Sectional door',
    description: 'Rolling shutters and sectional doors compared on space, insulation, noise, looks and common uses.',
    intro: 'Both close large openings. They differ in how they store, how they look and how well they insulate.',
    rows: [['Storage', 'Coils into a drum above the opening', 'Panels rest overhead on tracks'], ['Space', 'Needs headroom for the drum', 'Needs headroom and side room'], ['Insulation', 'Limited unless built for it', 'Better with insulated panels'], ['Noise', 'Louder in operation', 'Quieter in operation'], ['Look', 'Utility look', 'Neater, more design options'], ['Common use', 'Shops, godowns, service bays', 'Garages, showrooms, loading bays']],
    verdict: 'Choose rolling shutters for compact, economical closing. Choose sectional doors for insulation, quiet and appearance.',
    links: [{ name: 'Rolling shutters', href: '/products/rolling-shutters/' }, { name: 'Sectional doors', href: '/products/sectional-doors/' }],
  },
  {
    slug: 'aluminium-vs-gi-rolling-shutter', title: 'Aluminium vs GI Rolling Shutter', a: 'Aluminium', b: 'GI (galvanised iron)',
    description: 'Aluminium and GI rolling shutters compared by weight, corrosion, strength and typical use.',
    intro: 'The slat material changes weight, rust resistance and strength. Always confirm gauge and finish from the datasheet.',
    rows: [['Weight', 'Lighter', 'Heavier'], ['Corrosion', 'Does not rust', 'Depends on galvanising quality'], ['Strength', 'Depends on profile and thickness', 'Generally strong for security'], ['Typical use', 'Shopfronts, showrooms', 'Godowns, workshops, shops']],
    verdict: 'Both can work. The right pick depends on the security need, the opening size and the finish you want.',
    links: [{ name: 'Aluminium rolling shutter', href: '/products/rolling-shutters/aluminium-rolling-shutter/' }, { name: 'GI rolling shutter', href: '/products/rolling-shutters/gi-rolling-shutter/' }],
  },
  {
    slug: 'dock-shelter-vs-dock-seal', title: 'Dock Shelter vs Dock Seal', a: 'Dock shelter', b: 'Dock seal',
    description: 'Dock shelters and dock seals compared by truck variety, sealing and upkeep.',
    intro: 'Both wrap the rear of a docked truck to keep weather and dust out of the building.',
    rows: [['Design', 'Frame with side and head curtains', 'Foam pads that compress against the truck'], ['Truck variety', 'Copes with varied sizes', 'Best with consistent truck sizes'], ['Sealing', 'Good, depends on curtain fit', 'Tight when trucks back in squarely'], ['Upkeep', 'Curtains wear and need replacing', 'Foam and cover wear over time']],
    verdict: 'Shelters suit mixed fleets. Seals suit regular trucks and a focus on sealing. Inflatable and retractable options extend the choice.',
    links: [{ name: 'Dock shelters', href: '/products/high-speed-doors-dock/dock-shelters/' }, { name: 'Dock seals', href: '/products/high-speed-doors-dock/dock-seals/' }],
  },
  {
    slug: 'sliding-vs-swing-automatic-doors', title: 'Sliding vs Swing Automatic Doors', a: 'Sliding door', b: 'Swing door',
    description: 'Compare automatic sliding and swing doors on space, traffic, accessibility and where each is used.',
    intro: 'Both can give touch-free entry. The right type depends on the opening, the traffic and the space beside and in front of the door.',
    rows: [['Space needed', 'Wall or glass space beside the opening', 'Clear arc in front of or behind the door'], ['Best for', 'Busy entrances, shops, offices, hospitals', 'Existing hinged doors, narrow openings'], ['Traffic', 'Handles two-way flow well', 'Better for lighter or one-way flow'], ['Safety focus', 'Closing edge and track area', 'Swing path and hinge side'], ['Upkeep', 'Track, rollers, sensors', 'Arm, hinges, sensors']],
    verdict: 'Choose sliding for busy, wide entrances. Choose swing when you already have a hinged door or no room for a track. A site visit settles it.',
    links: [{ name: 'Sliding glass doors', href: '/products/automatic-doors/sliding-glass-doors/' }, { name: 'Glass swing door automation', href: '/products/automatic-doors/glass-swing-door-automation/' }],
  },
  {
    slug: 'sliding-vs-telescopic-gates', title: 'Sliding vs Telescopic Gates', a: 'Sliding gate', b: 'Telescopic gate',
    description: 'Compare standard sliding gates and telescopic sliding gates on side space, width and how they move.',
    intro: 'A telescopic gate folds its sections behind each other as it opens, so it needs far less side space than a single-leaf sliding gate of the same width.',
    rows: [['Side space needed', 'About the gate width', 'A fraction of the gate width'], ['Best for', 'Sites with clear space beside the opening', 'Wide openings with limited side space'], ['Complexity', 'Simpler, one moving leaf', 'More parts, more alignment'], ['Upkeep', 'Track, wheels, rack', 'Track, wheels, rack and section alignment'], ['Look', 'Single clean leaf', 'Sections stack when open']],
    verdict: 'Use a standard sliding gate when space allows. Consider telescopic when the opening is wide and side space is tight.',
    links: [{ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/' }, { name: 'Telescopic gate automation', href: '/products/gate-automation/telescopic-gate-automation/' }],
  },
  {
    slug: 'sectional-vs-high-speed-doors', title: 'Sectional Doors vs High-Speed Doors', a: 'Sectional door', b: 'High-speed door',
    description: 'Compare sectional doors and high-speed doors on speed, insulation, traffic and where each one fits.',
    intro: 'Both are overhead-style industrial and commercial doors. They solve different problems: insulation and security versus speed and traffic flow.',
    rows: [['Main strength', 'Insulation, security, appearance', 'Fast opening and closing'], ['Best for', 'Garages, warehouses, workshops', 'Busy openings, temperature control, dust control'], ['Traffic', 'Occasional to regular', 'Frequent, many cycles per hour'], ['Construction', 'Rigid panels on tracks', 'Flexible curtain on a fast drive'], ['Upkeep', 'Springs, rollers, tracks, seals', 'Curtain, sensors, drive']],
    verdict: 'Pick sectional doors where strength and insulation matter most. Pick high-speed doors where openings are frequent and air or dust movement must be limited.',
    links: [{ name: 'Industrial sectional doors', href: '/products/sectional-doors/industrial-sectional-doors/' }, { name: 'High-speed doors', href: '/products/high-speed-doors-dock/' }],
  },
]
export const getCompare = (slug: string) => comparisons.find(c => c.slug === slug)
