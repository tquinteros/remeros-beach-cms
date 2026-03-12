import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FiltersBar } from '@/components/FilterBar'
import { Suspense } from 'react'

interface SearchParams {
  bedrooms?: string
  maxPrice?: string
}

export default async function RentPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { bedrooms, maxPrice } = await searchParams
  const payload = await getPayload({ config })

  // Traer datos del global
  const pageData = await payload.findGlobal({
    slug: 'rent-page',
  })

  // Construir where dinámicamente
  const where: Record<string, unknown> = {}
  if (bedrooms) where['bedrooms'] = { equals: Number(bedrooms) }
  if (maxPrice) where['price'] = { less_than_or_equal: Number(maxPrice) }

  const condos = await payload.find({
    collection: 'condominiums',
    where: Object.keys(where).length > 0 ? (where as Where) : undefined,
  })

  return (
    <div>
      {/* Hero desde el Global */}
      {pageData.hero?.title && (
        <section
          className="relative py-20 px-4 text-center bg-cover bg-center"
          style={{
            backgroundImage: pageData.hero.backgroundImage
              ? `url(${(pageData.hero.backgroundImage as { url?: string })?.url})`
              : undefined,
          }}
        >
          <h1 className="text-4xl font-bold">{pageData.hero.title}</h1>
          {pageData.hero.subtitle && (
            <p className="mt-2 text-lg text-muted-foreground">{pageData.hero.subtitle}</p>
          )}
        </section>
      )}

      <div className="container mx-auto py-8">
        {/* Título de sección editable */}
        <h2 className="text-3xl font-bold mb-6">
          {pageData.sectionTitle ?? 'Condominios en alquiler'}
        </h2>

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

        {/* Contenido adicional al final */}
        {/* {pageData.bottomContent && (
          <div className="mt-12 prose">
            {JSON.stringify(pageData.bottomContent)}
          </div>
        )} */}
      </div>
    </div>
  )
}
