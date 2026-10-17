// Company-approved commitments and AMC plans (Blueprint 8.3, 15). Leave EMPTY until the client approves the wording.
// When filled: /services/amc/ shows the plan table and every service page shows the commitments block.
export type AmcPlan = { name: string; visits: string; response: string; coverage: string }
export const amcPlans: AmcPlan[] = []
export const commitments: string[] = [] // e.g. 'Breakdown calls answered within X hours' (only if the client can substantiate it)
