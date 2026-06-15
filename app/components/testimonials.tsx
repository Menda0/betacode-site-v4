"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import type { Testimonial } from '@/lib/ventures-content';

function TestimonialCard({ item }: { item: Testimonial }) {
    return (
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20 dark:bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] dark:opacity-10" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center dark:bg-gray-900 dark:shadow-indigo-500/5 dark:ring-white/5" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {item.companyLogo && (
            <Image
              src={item.companyLogo}
              alt=""
              width={160}
              height={40}
              className="mx-auto h-12 w-auto"
            />
          )}
          <figure className="mt-10">
            <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9 dark:text-white">
              <p>
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-10">
              {item.avatar && (
                <Image
                  src={item.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="mx-auto size-10 rounded-full"
                />
              )}
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900 dark:fill-white">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="text-gray-600 dark:text-gray-400">{item.role}</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    )
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <Carousel className="w-full bg-white dark:bg-gray-900" plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>
      <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={`${item.name}-${index}`}>
              <TestimonialCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {items.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
  )
}
