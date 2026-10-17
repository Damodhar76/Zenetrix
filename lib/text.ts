// Lowercases a name for use mid-sentence but keeps acronyms (GI, PVC, UHF, RFID, AMC...) in capitals.
export const lc = (s: string): string =>
  s.split(' ').map(w => (/^[A-Z0-9]{2,}[,.)]?$/.test(w) ? w : w.toLowerCase())).join(' ')
