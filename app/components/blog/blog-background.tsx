type BlogBackgroundProps = {
  children: React.ReactNode
  sidebar?: React.ReactNode
  variant?: 'listing' | 'article'
}

export function BlogBackground({ children, sidebar, variant = 'listing' }: BlogBackgroundProps) {
  return (
    <div className="relative isolate min-h-[50vh] bg-secondary-50 dark:bg-[#0c1222]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,var(--color-secondary-200),transparent_70%)] opacity-70 dark:bg-[radial-gradient(ellipse_at_top,var(--color-secondary-900),transparent_70%)] dark:opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-secondary-100)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-secondary-100)_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-40 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] dark:opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 -z-10 size-96 rounded-full bg-secondary-300/30 blur-3xl dark:bg-secondary-700/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 size-80 rounded-full bg-primary-200/20 blur-3xl dark:bg-primary-900/15"
      />

      <div
        className={
          variant === 'article'
            ? 'relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16'
            : 'relative'
        }
      >
        {variant === 'article' ? (
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
            <div className="w-full min-w-0 max-w-3xl">
              <div className="rounded-2xl border border-secondary-200/80 bg-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-10 dark:border-white/10 dark:bg-gray-900/80">
                {children}
              </div>
            </div>
            {sidebar && (
              <div className="w-full shrink-0 lg:sticky lg:top-20 lg:w-72">
                {sidebar}
              </div>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
