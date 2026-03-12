'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function FiltersBar({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/rent?${params.toString()}`)
    },
    [searchParams, router],
  )

  return (
    <div className="flex gap-4 flex-wrap mb-6">
      <select
        defaultValue={searchParams.get('bedrooms') ?? ''}
        onChange={(e) => updateFilter('bedrooms', e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Todos los dormitorios</option>
        <option value="1">1 dormitorio</option>
        <option value="2">2 dormitorios</option>
        <option value="3">3 dormitorios</option>
        <option value="4">4+ dormitorios</option>
      </select>

      <select
        defaultValue={searchParams.get('maxPrice') ?? ''}
        onChange={(e) => updateFilter('maxPrice', e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Cualquier precio</option>
        <option value="500">Hasta $500</option>
        <option value="1000">Hasta $1000</option>
        <option value="2000">Hasta $2000</option>
      </select>
    </div>
  )
}
