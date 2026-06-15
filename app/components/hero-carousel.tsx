import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export function HeroCarousel() {
  return (
    <Carousel className="w-full" plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>
      <CarouselContent>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Your dedicated team for custom software
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                From MVP to production in three months
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Scale engineering without the hiring gamble
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Technology partnerships that grow with your business
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Ship products that reach real users
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                One team, fully committed — not a rotating bench
            </h1>
          </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
