import { districts, getDistrict } from '@/data/districts'
import { DistrictView, districtMetadata } from '@/components/regions/Region'

export const dynamicParams = false
export const generateStaticParams = () => districts.map(d => ({ district: d.slug }))
type Props = { params: Promise<{ district: string }> }
export async function generateMetadata({ params }: Props) { return districtMetadata('telangana', getDistrict((await params).district)) }
export default async function District({ params }: Props) { return <DistrictView state="telangana" d={getDistrict((await params).district)} /> }
