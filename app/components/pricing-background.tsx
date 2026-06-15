type PricingBackgroundProps = {
  children: React.ReactNode
}

export function PricingBackground({ children }: PricingBackgroundProps) {
  return (
    <div className="relative isolate min-h-[50vh] bg-orange-50 dark:bg-[#0c1222]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,theme(colors.orange.200),transparent_70%)] opacity-70 dark:bg-[radial-gradient(ellipse_at_top,theme(colors.orange.900),transparent_70%)] dark:opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,theme(colors.orange.100)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.orange.100)_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-40 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] dark:opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 -z-10 size-96 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-700/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-900/15"
      />

      <div className="relative">{children}</div>
    </div>
  )
}
