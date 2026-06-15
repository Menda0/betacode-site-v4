import Image from 'next/image'

type CoachidLogoProps = {
  className?: string
  width?: number
  height?: number
}

export function CoachidLogo({ className = 'h-10 w-auto', width = 140, height = 48 }: CoachidLogoProps) {
  return (
    <Image
      src="/images/clients/coachid.png"
      alt="Coach ID"
      width={width}
      height={height}
      className={`brightness-0 dark:brightness-100 ${className}`}
    />
  )
}
