import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { getPayload } from 'payload'
import config from '@/payload.config'

import type { Condominium, Media, Page } from '@/payload-types'

/**
 * Extraemos el tipo del block directamente
 * del schema generado por Payload
 */
type CarouselBlockProps = Extract<Page['layout'][number], { blockType: 'carousel' }>

/**
 * Item manual del carousel
 */
type ManualCarouselItem = {
  image?: {
    url?: string
  }
  title?: string
  link?: string
}

/**
 * Union de items posibles
 */
type CarouselItemType = Condominium | ManualCarouselItem

/**
 * Type guard para detectar condominiums
 */
function isCondominium(item: CarouselItemType): item is Condominium {
  return 'price' in item
}

export async function CarouselBlock(block: CarouselBlockProps) {
  const payload = await getPayload({ config })

  let items: CarouselItemType[] = []

  /**
   * Fuente: condominiums
   */
  if (block.source === 'condominiums') {
    const ids =
      block.selectedCondominiums?.map((c) =>
        typeof c === 'object' && c !== null
          ? 'id' in c
            ? c.id
            : (c as { value?: string }).value
          : c,
      ) ?? []

    if (ids.length > 0) {
      const condos = await payload.find({
        collection: 'condominiums',
        where: {
          id: {
            in: ids as string[],
          },
        },
      })

      items = condos.docs
    }
  }

  /**
   * Fuente: manual
   */
  if (block.source === 'manual') {
    items = (block.items ?? []) as ManualCarouselItem[]
  }

  return (
    <section className="py-16">
      {block.title && <h2 className="text-3xl font-bold mb-6">{block.title}</h2>}

      <Carousel
        opts={{
          align: 'start',
          loop: Boolean(block.autoplay),
        }}
      >
        <CarouselContent>
          {items.map((item, i) => {
            const image = isCondominium(item) ? (item.images?.[0] as Media)?.url : item.image?.url

            const title = isCondominium(item) ? item.name : item.title

            return (
              <CarouselItem key={i} className={`basis-1/${block.itemsPerView ?? 3}`}>
                <div className="p-4 border rounded-xl">
                  {image && (
                    <img
                      src={image}
                      alt={title ?? ''}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  )}

                  {title && <h3 className="mt-3 font-semibold">{title}</h3>}
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
