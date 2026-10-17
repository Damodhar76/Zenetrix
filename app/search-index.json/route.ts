import { searchIndex } from '@/data/search'
export const dynamic = 'force-static'
export function GET() { return Response.json(searchIndex()) }
