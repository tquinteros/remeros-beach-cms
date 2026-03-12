import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FiltersBar } from '@/components/FilterBar'
import { Suspense } from 'react'

interface SearchParams {
  bedrooms?: string
  maxPrice?: string
}

export default async function RentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> // en Next.js 15 es Promise
}) {
  const { bedrooms, maxPrice } = await searchParams
  const payload = await getPayload({ config })

  // Construir el where dinámicamente según filtros activos
  const where: Record<string, unknown> = {}

  if (bedrooms) {
    where['bedrooms'] = { equals: Number(bedrooms) }
  }

  if (maxPrice) {
    where['price'] = { less_than_or_equal: Number(maxPrice) }
  }

  const condos = await payload.find({
    collection: 'condominiums',
    where: Object.keys(where).length > 0 ? (where as Where) : undefined,
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Condominios en alquiler</h1>

      {/* FiltersBar necesita Suspense por useSearchParams */}
      <Suspense fallback={<div>Cargando filtros...</div>}>
        <FiltersBar minPrice={0} maxPrice={5000} />
      </Suspense>

      {condos.totalDocs === 0 ? (
        <p className="text-muted-foreground">No se encontraron condominios con esos filtros.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {condos.docs.map((condo) => (
            <Card key={condo.id}>
              <CardHeader>
                <CardTitle>{condo.name}</CardTitle>
                <CardDescription>${condo.price}</CardDescription>
                <CardContent>
                  <p>{condo.bedrooms} dormitorios</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
