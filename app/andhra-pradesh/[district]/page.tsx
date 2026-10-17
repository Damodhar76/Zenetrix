import { andhraDistricts, getAndhraDistrict } from '@/data/districts'
import { DistrictView, districtMetadata } from '@/components/regions/Region'

export const dynamicParams = false
export const generateStaticParams = () => andhraDistricts.map(d => ({ district: d.slug }))
type Props = { params: Promise<{ district: string }> }
export async function generateMetadata({ params }: Props) { return districtMetadata('andhra-pradesh', getAndhraDistrict((await params).district)) }
export default async function District({ params }: Props) { return <DistrictView state="andhra-pradesh" d={getAndhraDistrict((await params).district)} /> }
