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
                Empowering Your Business with Innovative Software Solutions
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Building software takes your business to the next level
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Developing MVPs that put your ideas to the test
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Helping you hire the best people for your company
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Providing technical support and maintenance for your software
            </h1>
          </CarouselItem>
          <CarouselItem>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                Helping you understand your technology needs
            </h1>
          </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
