'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export function HeroCarousel() {
  const t = useTranslations('hero')
  const slides = t.raw('slides') as string[]

  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide}>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
              {slide}
            </h1>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
