import type { Faq } from './faqs'

// Product-family FAQs (Blueprint 12.3: 6 to 10 product-specific questions). General, widely true answers only.
// Company-specific facts (prices, warranty, certificates, response times) are NOT stated here.
export const categoryFaqs: Record<string, Faq[]> = {
  'garage-doors': [
    { q: 'What type of garage door is right for a villa?', a: 'The choice depends on the opening size, headroom, desired finish, insulation needs and daily usage. A site survey helps select the most suitable panel and operating arrangement.' },
    { q: 'Can a garage door be automated?', a: 'Yes. Many overhead garage door systems can be operated with an electric opener, remote control and safety sensors, subject to the door design and operator compatibility.' },
    { q: 'Do garage doors need ceiling space?', a: 'Most overhead systems need headroom for tracks and the opener. Low-headroom arrangements may be possible when the existing structure is tight.' },
    { q: 'Can garage doors include glass or a wood-look finish?', a: 'Yes. Full-vision glazing and wood-look finishes are common design options. The correct selection depends on privacy, security, daylight and exterior design requirements.' },
  ],
  'rfid-access-control': [
    { q: 'How does UHF RFID let cars enter without stopping?', a: 'A passive tag on the vehicle is read from a distance by the reader. If the tag is authorised, the controller lifts the barrier, so the driver need not stop or swipe a card.' },
    { q: 'Which reader do I need for my lane?', a: 'Choose by the read distance you need and the number of tags in range. A short-range reader suits a single lane, while a longer-range reader suits wide or busy entries. A site visit confirms it.' },
    { q: 'What does the UHF RFID controller and software do?', a: 'It receives the tag ID from the reader, checks it against the authorised vehicle list and opens the barrier only for valid tags. It also keeps a log of every entry and exit, so you can see who came in, when and through which gate.' },
    { q: 'Can the reader work with my existing boom barrier?', a: 'Often yes, if the barrier controller accepts a standard access input. Share the barrier make and model so compatibility can be checked.' },
    { q: 'Where is the windscreen sticker fixed, and what if the car has tinted glass?', a: 'The sticker is normally fixed on the inside of the windscreen in a clear area. Heat-reflective or metallic-tinted glass can reduce the read distance, so a test tag is checked on the vehicle before a full batch is issued.' },
    { q: 'What happens when a resident sells a car or loses a tag?', a: 'The tag is blocked in the software so it no longer opens the gate, and a new tag is registered for the new vehicle. This is much safer than a remote or card that can be passed on.' },
    { q: 'Can visitors and delivery vehicles be handled too?', a: 'Yes. Visitors can be given a temporary tag with a validity period, or the guard can open the barrier manually while the entry is still recorded, depending on how the system is set up.' },
    { q: 'Is the reader suitable for outdoor use?', a: 'Both readers are designed for outdoor entries. Confirm the weather rating on the datasheet for your site.' },
    { q: 'Does it still work during a power cut?', a: 'The barrier and controller can be put on a UPS or battery backup, and every barrier has a manual release. Ask for a backup arrangement when you request the quote.' },
  ],
  'gate-automation': [
    { q: 'How do I know if my gate can be automated?', a: 'The gate must be sound, reasonably light for its size and move freely by hand. A site survey checks weight, alignment, ground level and space, and any repair needed first.' },
    { q: 'What safety devices should an automatic gate have?', a: 'Photocells across the opening, a safety edge on the moving leaf, a warning lamp and a manual release are the basics. Pedestrian and vehicle paths should be considered separately.' },
    { q: 'How many remotes can one gate controller learn?', a: 'It depends on the controller model. Ask for the memory capacity of the controller you are quoted, especially for communities with many users.' },
    { q: 'How often should an automatic gate be serviced?', a: 'Gates used daily benefit from a scheduled check of the motor, rack or arms, limit settings and safety devices. Frequency depends on use and site conditions.' },
  ],
  'automatic-doors': [
    { q: 'How does an automatic door know someone is there?', a: 'A sensor above the door detects motion or presence and signals the operator. Some doors also use push buttons, access cards or remote triggers.' },
    { q: 'Can an automatic door still be opened during a power cut?', a: 'Many operators have a manual release or battery option so the door can be opened by hand or kept working briefly. Confirm what the chosen model offers.' },
    { q: 'Are automatic doors suitable for air-conditioned spaces?', a: 'Yes. Good sealing, correct sensor settings and sensible opening width reduce air loss. Airlock arrangements can help at busy entrances.' },
    { q: 'Can my existing door be automated?', a: 'Sometimes. The frame, weight and type of door decide whether it can be retrofitted or whether a new automatic door is the better route.' },
  ],
  'boom-barriers': [
    { q: 'How do I choose the length of a boom barrier?', a: 'Measure the clear lane width and add a safe allowance. Very wide lanes or low ceilings may call for telescopic or folding arms.' },
    { q: 'Can a boom barrier work with RFID or ANPR?', a: 'Yes, boom barriers commonly connect to RFID readers, ANPR cameras, tickets or keypads. Compatibility depends on the controller and reader supplied.' },
    { q: 'What stops a boom from hitting a vehicle?', a: 'Loop detectors under the lane and photocells keep the boom up while a vehicle is present. These devices are part of a proper installation.' },
    { q: 'Do boom barriers need a foundation?', a: 'The housing is normally fixed to a concrete base with anchor bolts, and conduit is laid for power and signal cables. Your site survey will confirm the details.' },
  ],
  'sectional-doors': [
    { q: 'How is a sectional door different from a rolling shutter?', a: 'Sectional doors lift in panels along tracks and rest under the ceiling. They are quieter, better insulated and more decorative than a coiling rolling shutter.' },
    { q: 'Do sectional doors need headroom?', a: 'Yes. Tracks and springs need space above the opening. Low-headroom track layouts exist, so tell us your clearances.' },
    { q: 'Can I get a sectional door with natural light?', a: 'Glass, polycarbonate and vision panels let in light while keeping the door closed. Privacy and security needs decide which suits you.' },
    { q: 'Is it safe to adjust garage door springs myself?', a: 'No. Springs hold a lot of energy and can cause serious injury. Leave spring and cable work to a trained technician.' },
  ],
  'rolling-shutters': [
    { q: 'What materials are used for rolling shutters?', a: 'Common choices are galvanised iron, aluminium, galvalume steel and polycarbonate. Strength, weight, look and light transmission differ, so match the material to the use.' },
    { q: 'Can a rolling shutter be motorised?', a: 'Yes. Manual, chain or motor operation is possible, and larger shutters usually suit a motor with a manual override.' },
    { q: 'How do I keep a rolling shutter working smoothly?', a: 'Keep the guides clean, lubricate moving parts as advised, and do not force a stuck shutter. Regular inspection catches wear early.' },
    { q: 'Do rolling shutters resist wind?', a: 'Standard shutters differ from wind-resistant designs. If your site is exposed, ask for a design built for the expected wind load.' },
  ],
  'high-speed-doors-dock': [
    { q: 'Why use a high-speed door?', a: 'Fast opening and closing keep temperature, dust and air movement under control and speed up traffic between spaces.' },
    { q: 'What does a dock leveller do?', a: 'It bridges the gap between a truck bed and the dock floor so forklifts and pallets can cross safely, even when truck heights vary.' },
    { q: 'What is the difference between a dock shelter and a dock seal?', a: 'A dock seal presses against the truck for a tight fit. A shelter forms a looser frame around it. The right choice depends on trucks, climate and goods.' },
    { q: 'Do high-speed doors have safety sensors?', a: 'Yes. Safety sensors or edges stop or reverse the door when something is in the way. Check the type offered for your traffic.' },
  ],
}
