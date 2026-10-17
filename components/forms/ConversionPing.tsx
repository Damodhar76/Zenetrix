'use client'
import { useEffect } from 'react'
export function ConversionPing() {
  useEffect(() => { ;(window as any).gtag?.('event', 'generate_lead') }, [])
  return null
}
